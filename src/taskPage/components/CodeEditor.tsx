import { FC, useState, useContext, MouseEvent, TouchEvent } from "react";
import { useHistory } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Select, { SingleValue } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faGear,
  faDownLeftAndUpRightToCenter,
  faUpRightAndDownLeftFromCenter,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import monacoThemes from "monaco-themes/themes/themelist";

import Button from "../../shared/components/FormElements/Button";
import ConfirmationModal from "../../shared/components/Modals/ConfirmationModal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Output from "./Output";

import "./CodeEditor.css";

import { AuthContext } from "../../shared/context/AuthContext";
import { customStyles } from "../components/SelectCustomStyles";
import { URL } from "../../config";
import { useSlider } from "../../shared/hooks/slideHook";
import { useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/httpHook";

const CodeEditor: FC<{
  theme: {
    label: string;
    value: string;
  };
  language: SingleValue<{ value: string; label: string }>;
  descriptionMode: boolean;
  changeDescriptionMode: (descMode: boolean) => void;
  handleThemeChange: (
    newValue: SingleValue<{
      label: string;
      value: string;
    }>
  ) => Promise<void>;
  handleEditorChange: (value: string | undefined) => void;
  code: string;
  showOutput: boolean;
}> = ({
  theme,
  language,
  descriptionMode,
  changeDescriptionMode,
  handleThemeChange,
  handleEditorChange,
  code,
  showOutput,
}) => {
  const navigation = document.querySelector(".main-header")! as HTMLElement;
  const toolbar = document.querySelector(".minimalize-editor")! as HTMLElement;
  let heightOffset = navigation?.offsetHeight + toolbar?.offsetHeight;
  const windowHeight = window.innerHeight;

  const { sendRequest, error, clearError } = useHttpClient();
  const { handleMove, handleTouchMove, startDragging, stopDragging, dragging } =
    useSlider();

  const [top, setTop] = useState(0);
  const [outputHeight, setOutpuHeight] = useState(0);
  const [editorHeight, setEditorHeight] = useState(0);

  const history = useHistory();
  const [openQuitModal, setOpenQuitModal] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [codeExecutionRes, setCodeExecutionRes] = useState("");

  const { token } = useContext(AuthContext);

  const quitHeader = "Czy na pewno chcesz wyjść?";
  const quitContent =
    "Czy na pewno chcesz wyjść? Spowoduje to nieodwracalne utracenie wszystkich zmian!";

  const settingHeader = "Ustawienia edytora";
  const settingsContent = (
    <div className="flex-column">
      <label className="form-spacing">Wybierz motyw:</label>
      <Select
        placeholder={`Wybierz motyw`}
        options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
          label: `${themeName}`,
          value: themeId,
        }))}
        value={theme}
        styles={customStyles("light")}
        onChange={handleThemeChange}
      />
    </div>
  );

  useEffect(() => {
    if (isNaN(heightOffset)) {
      heightOffset = 0;
    }

    setOutpuHeight(200);
    setEditorHeight(windowHeight - heightOffset - 200);
    setTop(windowHeight - heightOffset - 200);
  }, [setOutpuHeight, setEditorHeight, setTop, windowHeight, heightOffset]);

  const handleCodeCompile = async () => {
    setCodeExecutionRes("");
    const url = `${URL}/syntax/check`;
    const method = "POST";
    const body = JSON.stringify({
      language: language?.value.toUpperCase(),
      code: code,
    });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await sendRequest(url, method, body, headers);
    setCodeExecutionRes(response.data.feedbackMessage);
  };

  const checkSliderPosition = (clientY: number) => {
    let sliderPosiotion = clientY;
    sliderPosiotion = clientY < heightOffset ? heightOffset : clientY;
    sliderPosiotion = clientY > windowHeight ? windowHeight : sliderPosiotion;

    return sliderPosiotion;
  };

  const handleSliderMove = (e: MouseEvent | TouchEvent) => {
    if (!dragging) return;

    let positionY;
    let moveCoordinates;
    if (e.type === "mousemove") {
      moveCoordinates = handleMove(e as MouseEvent);
    } else if (e.type === "touchmove") {
      moveCoordinates = handleTouchMove(e as TouchEvent);
    }

    if (!moveCoordinates?.positionY) return;
    positionY = checkSliderPosition(moveCoordinates?.positionY);
    if (windowHeight - positionY - window.pageYOffset < 0) return;

    setTop(positionY - heightOffset + window.pageYOffset);
    setOutpuHeight(windowHeight - positionY - window.pageYOffset);
    setEditorHeight(windowHeight - heightOffset - outputHeight);
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <ConfirmationModal
        show={openQuitModal}
        content={quitContent}
        header={quitHeader}
        onCancel={() => setOpenQuitModal(false)}
        onClick={() => history.go(-2)}
      />
      <ConfirmationModal
        show={openSettings}
        content={settingsContent}
        header={settingHeader}
        onCancel={() => setOpenSettings(false)}
        onClick={() => setOpenSettings(false)}
        noFooter
      />
      <div
        className="editor-container"
        onMouseMove={handleSliderMove}
        onMouseUp={stopDragging}
        onTouchEnd={stopDragging}
        onTouchMove={handleSliderMove}
      >
        <div
          className={`minimalize-editor ${descriptionMode && "display-none"}`}
        >
          <Button size="xs" onClick={handleCodeCompile}>
            <FontAwesomeIcon icon={faCode} />
            <span className="icon-name">Skompiluj</span>
          </Button>
          <div
            className={`minimalize-editor__settings ${
              showOutput && "display-none"
            }`}
          >
            <Button size="xs" onClick={() => setOpenSettings(true)}>
              <FontAwesomeIcon icon={faGear} />
              <span className="icon-name">Ustawienia</span>
            </Button>
            <Button size="xs" onClick={() => changeDescriptionMode(true)}>
              <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />
            </Button>
          </div>
        </div>
        <div className={`${descriptionMode ? "none-edit" : "editor"}`}>
          {descriptionMode && (
            <Button size="sm" onClick={() => changeDescriptionMode(false)}>
              <FontAwesomeIcon
                icon={faUpRightAndDownLeftFromCenter}
                style={{ marginRight: "10px" }}
              />
              Edytuj kod
            </Button>
          )}
          <div className="code-editor-container">
            <div style={{ height: editorHeight }}>
              <Editor
                className="code-editor"
                theme={theme.value}
                language={language?.value}
                defaultValue={code}
                onChange={handleEditorChange}
              />
            </div>
            <div className="slider__divider" style={{ top: top }}>
              <div
                className="slider__handle"
                onMouseDown={startDragging}
                onTouchStart={startDragging}
                onMouseUp={stopDragging}
              >
                <FontAwesomeIcon icon={faChevronUp} />
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
            <Output
              codeExecutionRes={codeExecutionRes}
              outputHeightStyle={{ height: outputHeight }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
