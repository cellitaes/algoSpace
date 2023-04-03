import { useContext, useEffect, MouseEvent, TouchEvent } from "react";
import { useReducer } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { SingleValue } from "react-select";
import { loader } from "@monaco-editor/react";
import monacoThemes from "monaco-themes/themes/themelist";

import "./Task.css";
import { URL } from "../../config";
import CodeEditor from "../components/CodeEditor";
import ConfirmationModal from "../../shared/components/Modals/ConfirmationModal";
import TaskToolbar from "../components/TaskToolbar";
import Hints from "../components/Hints";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { AuthContext } from "../../shared/context/AuthContext";
import { useHttpClient } from "../../shared/hooks/httpHook";
import { usePopUp } from "../../shared/hooks/modalHook";
import { useSlider } from "../../shared/hooks/slideHook";
import { useCallback } from "react";
import { manageTaskState, initTasktate } from "../utils/taskReducer";
import { TaskExtended } from "../../types/task";

const changeLanguageContent =
  "Czy na pewno chcesz zmienić język? Spowoduje to nieodwracalne utracenie aktualnych zmian.";
const changeLanguageHeader = "Zmiana języka";

let tempLanguage: SingleValue<{ value: string; label: string }>;

const Task = () => {
  const { taskId }: { taskId: string } = useParams();
  const searchParam =
    new URLSearchParams(useLocation().search).get("language") || "";

  const [tableState, dispatchTaskState] = useReducer(
    manageTaskState,
    initTasktate
  );

  const {
    task,
    language,
    theme,
    code,
    descriptionMode,
    showOutput,
    left,
    introWidth,
    editorWidth,
  } = tableState;

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { open, openModal, closeModal } = usePopUp();
  const { dragging, handleMove, handleTouchMove, startDragging, stopDragging } =
    useSlider();
  const { token } = useContext(AuthContext);

  const searchForTemplateCode = useCallback(
    (task: TaskExtended | null) => {
      if (task === null) return;
      const template = task?.templates?.find(
        ({ language: templateLanguage }) =>
          templateLanguage.toLowerCase() === language?.value.toLowerCase()
      );
      return template;
    },
    [language?.value]
  );

  useEffect(() => {
    dispatchTaskState({
      type: "SET_LANGUAGE",
      language: { value: searchParam, label: searchParam },
    });
  }, [searchParam]);

  useEffect(() => {
    const getTaskById = async () => {
      const url = `${URL}/tasks/${taskId}`;
      const method = "GET";
      const body = null;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const data = await sendRequest(url, method, body, headers);
      const template = searchForTemplateCode(data.data);

      dispatchTaskState({ type: "SET_TASK", task: data.data });
      if (!template?.content) return;
      dispatchTaskState({ type: "CODE_CHANGE", code: template!.content });
    };
    getTaskById();
  }, [searchForTemplateCode, sendRequest, taskId, token]);

  useEffect(() => {
    const template = searchForTemplateCode(task || null);
    if (!template?.content) return;
    setNewLangAndChangeCode(template);
  }, [language, searchForTemplateCode, task]);

  const handleEditorChange = (value: string | undefined) => {
    dispatchTaskState({ type: "CODE_CHANGE", code: value });
  };

  const handleResize = useCallback(() => {
    if (window.innerWidth < 1024)
      dispatchTaskState({
        type: "SET_NEW_WIDTH",
        editorWidth: "100%",
        left: "40",
        introWidth: "40",
      });
    if (window.innerWidth >= 1024 && editorWidth === "60") {
      dispatchTaskState({
        type: "SET_NEW_WIDTH",
        left: "40",
        introWidth: "40",
        editorWidth: "60",
      });
    }
  }, [editorWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const handleThemeChange = async (
    option: SingleValue<{ label: string; value: string }>
  ) => {
    await new Promise<void>((res) => {
      Promise.all([
        loader.init(),
        import(`monaco-themes/themes/${monacoThemes[option!.value]}.json`),
      ]).then(([monaco, themeData]) => {
        monaco.editor.defineTheme(option?.value, themeData);
        res();
      });
    }).then((_) => dispatchTaskState({ type: "SET_THEME", theme: option! }));
  };

  const handleLanguageChange = (
    language: SingleValue<{ value: string; label: string }>
  ) => {
    openModal();
    tempLanguage = language;
  };

  const setNewLangAndChangeCode = async (template: {
    id: number;
    content: string;
    language: string;
    taskId: number;
  }) => {
    await new Promise<void>((res) => {
      Promise.all([loader.init()]).then(([monaco]) => {
        monaco.editor.getModels()[0]?.setValue(template?.content);
        res();
      });
    }).then((_) =>
      dispatchTaskState({
        type: "CODE_CHANGE",
        code: template?.content,
      })
    );
  };

  const checkSliderPosition = (leftPosition: number) => {
    let sliderPosiotion = leftPosition;

    if (leftPosition < 20 || leftPosition >= 80) return;

    return `${sliderPosiotion}`;
  };

  const handleSliderMove = (e: MouseEvent | TouchEvent) => {
    if (!dragging) return;
    let positionX;
    console.log(e);

    if (e.type === "mousemove") {
      const moveCoordinates = handleMove(e as MouseEvent);
      positionX = moveCoordinates?.positionX || +introWidth!;
    } else if (e.type === "touchmove") {
      const moveCoordinates = handleTouchMove(e as TouchEvent);
      positionX = moveCoordinates?.positionX || +introWidth!;
    }

    if (!positionX) return;
    const windowWidth = window.innerWidth;
    const leftPosition = (positionX / windowWidth) * 100;

    const introductionWidth = checkSliderPosition(leftPosition);
    dispatchTaskState({
      type: "SET_NEW_WIDTH",
      introWidth: introductionWidth,
      editorWidth: `${100 - +introductionWidth!}`,
      left: introductionWidth,
    });
  };

  const changeDescriptionMode = (descMode: boolean) => {
    dispatchTaskState({
      type: "SET_DESCRIPTIONMODE",
      descriptionMode: descMode,
    });
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <ErrorModal error={error} onClear={clearError} />}
      <ConfirmationModal
        show={open}
        onCancel={closeModal}
        header={changeLanguageHeader}
        content={changeLanguageContent}
        onClick={() => {
          dispatchTaskState({
            type: "SET_LANGUAGE",
            language: tempLanguage,
          });
          closeModal();
        }}
      />
      {task && (
        <div
          className="task-container"
          onMouseMove={handleSliderMove}
          onMouseUp={stopDragging}
          onTouchEnd={stopDragging}
          onTouchMove={handleSliderMove}
        >
          <div
            className="task-container__introduction"
            style={{ flexBasis: `${introWidth}%` }}
          >
            <TaskToolbar
              title={task?.name}
              language={language || null}
              availableLanguages={
                task?.availableLanguages && task?.availableLanguages
              }
              handleLanguageChange={handleLanguageChange}
              descriptionMode={descriptionMode || false}
              changeDescriptionMode={changeDescriptionMode}
              displayNone={!showOutput && !descriptionMode}
              code={code || ""}
            />
            <div
              className="task-container__task-content"
              dangerouslySetInnerHTML={{ __html: task.content }}
            />
            <Hints
              hints={task.hints || []}
              displayNone={!showOutput && !descriptionMode}
            />
          </div>
          <div>
            <div className="slider-task__divider" style={{ left: `${left}%` }}>
              <div
                className="slider-task__handle"
                onMouseDown={startDragging}
                onTouchStart={startDragging}
                onMouseUp={stopDragging}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
          </div>
          <div
            className="task-container__code-editor"
            style={{
              width: `${window.innerWidth < 1024 ? "100" : editorWidth}%`,
              flexBasis: `${window.innerWidth < 1024 ? "100" : editorWidth}%`,
            }}
          >
            <CodeEditor
              theme={theme!}
              language={language!}
              descriptionMode={descriptionMode!}
              changeDescriptionMode={changeDescriptionMode}
              handleThemeChange={handleThemeChange}
              handleEditorChange={handleEditorChange}
              code={code!}
              showOutput={showOutput!}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
