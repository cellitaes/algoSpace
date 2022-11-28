import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import monacoThemes from 'monaco-themes/themes/themelist';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faPlay,
   faGear,
   faDownLeftAndUpRightToCenter,
   faUpRightAndDownLeftFromCenter,
   faChevronUp,
   faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

import Button from '../../shared/components/FormElements/Button';
import ConfirmationModal from '../../shared/components/Modals/ConfirmationModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Output from './Output';

import './CodeEditor.css';

import { AuthContext } from '../../shared/context/AuthContext';
import { customStyles } from '../components/SelectCustomStyles';
import { URL } from '../../config';
import { useSlider } from '../../shared/hooks/slideHook';
import { useEffect } from 'react';

const CodeEditor = ({
   theme,
   language,
   descriptionMode,
   changeDescriptionMode,
   handleThemeChange,
   handleEditorChange,
   code,
   showOutput,
}) => {
   const navigation = document.querySelector('.main-header');
   const toolbar = document.querySelector('.minimalize-editor');
   let heightOffset = navigation?.offsetHeight + toolbar?.offsetHeight;
   const windowHeight = window.innerHeight;

   const { handleMove, startDragging, stopDragging, dragging } = useSlider();

   const [top, setTop] = useState(0);
   const [outputHeight, setOutpuHeight] = useState(0);
   const [editorHeight, setEditorHeight] = useState(0);

   const history = useHistory();
   const [openQuitModal, setOpenQuitModal] = useState(false);
   const [openSettings, setOpenSettings] = useState(false);
   const [codeExecutionRes, setCodeExecutionRes] = useState('');

   const { token } = useContext(AuthContext);

   const quitHeader = 'Czy na pewno chcesz wyjść?';
   const quitContent =
      'Czy na pewno chcesz wyjść? Spowoduje to nieodwracalne utracenie wszystkich zmian!';

   const settingHeader = 'Ustawienia edytora';
   const settingsContent = (
      <div className="flex-column">
         <label className="form-spacing">Wybierz motyw:</label>
         <Select
            placeholder={`Wybierz motyw`}
            options={Object.entries(monacoThemes).map(
               ([themeId, themeName]) => ({
                  label: themeName,
                  value: themeId,
               })
            )}
            value={theme}
            styles={customStyles('light')}
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
      setCodeExecutionRes('');
      const url = `${URL}/syntax/check`;
      const method = 'POST';
      const body = JSON.stringify({
         language: language.value.toUpperCase(),
         code: code,
      });
      const headers = {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      };

      await fetch(url, {
         method,
         body,
         headers,
      })
         .then((res) => res.text())
         .then((res) => setCodeExecutionRes(res));
   };

   const checkSliderPosition = (clientY) => {
      let sliderPosiotion = clientY;
      sliderPosiotion = clientY < heightOffset ? heightOffset : clientY;
      sliderPosiotion = clientY > windowHeight ? windowHeight : sliderPosiotion;

      return sliderPosiotion;
   };

   const handleSliderMove = (e) => {
      if (!dragging) return;

      let { positionY } = handleMove(e);
      positionY = checkSliderPosition(positionY);

      if (windowHeight - positionY - window.pageYOffset < 0) return;

      setTop(positionY - heightOffset + window.pageYOffset);
      setOutpuHeight(windowHeight - positionY - window.pageYOffset);
      setEditorHeight(windowHeight - heightOffset - outputHeight);
   };

   return (
      <>
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
               className={`minimalize-editor ${
                  descriptionMode && 'display-none'
               }`}
            >
               <Button size="xs" onClick={handleCodeCompile}>
                  <FontAwesomeIcon icon={faPlay} />
               </Button>
               <div
                  className={`minimalize-editor__settings ${
                     showOutput && 'display-none'
                  }`}
               >
                  <Button size="xs" onClick={() => setOpenSettings(true)}>
                     <FontAwesomeIcon icon={faGear} />
                  </Button>
                  <Button size="xs" onClick={() => changeDescriptionMode(true)}>
                     <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />
                  </Button>
               </div>
            </div>
            <div className={`${descriptionMode ? 'none-edit' : 'editor'}`}>
               {descriptionMode && (
                  <Button
                     size="sm"
                     onClick={() => changeDescriptionMode(false)}
                  >
                     <FontAwesomeIcon
                        icon={faUpRightAndDownLeftFromCenter}
                        style={{ marginRight: '10px' }}
                     />
                     Edytuj kod
                  </Button>
               )}
               <div className="code-editor-container">
                  <div style={{ height: editorHeight }}>
                     <Editor
                        className="code-editor"
                        theme={theme.value}
                        code={code}
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
