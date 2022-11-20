import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import monacoThemes from 'monaco-themes/themes/themelist';
import Select from 'react-select';

import Button from '../../shared/components/FormElements/Button';
import ConfirmationModal from '../../shared/components/Modals/ConfirmationModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Output from './Output';

import { AuthContext } from '../../shared/context/AuthContext';
import { customStyles } from '../components/SelectCustomStyles';
import { URL } from '../../config';

import './CodeEditor.css';

const CodeEditor = ({
   theme,
   language,
   descriptionMode,
   changeDescriptionMode,
   handleThemeChange,
   handleEditorChange,
   code,
   showOutput,
   toggleOutputState,
}) => {
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
         <div className="editor-container">
            <div
               className={`minimalize-editor ${
                  descriptionMode && 'display-none'
               }`}
            >
               <Button size="xs" onClick={toggleOutputState}>
                  <i class="fa-solid fa-play"></i>
               </Button>
               <div
                  className={`minimalize-editor__settings ${
                     showOutput && 'display-none'
                  }`}
               >
                  <Button size="xs" onClick={() => setOpenSettings(true)}>
                     <i class="fa-solid fa-gear"></i>
                  </Button>
                  <Button size="xs" onClick={() => changeDescriptionMode(true)}>
                     <i class="fa-solid fa-down-left-and-up-right-to-center"></i>
                  </Button>
                  <Button size="xs" onClick={() => setOpenQuitModal(true)}>
                     <i class="fa-solid fa-door-open"></i>
                  </Button>
               </div>
               {showOutput && (
                  <Button size="xs" onClick={handleCodeCompile}>
                     Compile code
                  </Button>
               )}
            </div>
            <div className={`${descriptionMode ? 'none-edit' : 'editor'}`}>
               {descriptionMode && (
                  <Button
                     size="sm"
                     onClick={() => changeDescriptionMode(false)}
                  >
                     <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                     Edytuj kod
                  </Button>
               )}
               <div className="code-editor-container">
                  {code && (
                     <Editor
                        className="code-editor"
                        theme={theme.value}
                        height={'92vh'}
                        code={code}
                        language={language?.value}
                        defaultValue={code}
                        onChange={handleEditorChange}
                     />
                  )}
                  {showOutput && <Output codeExecutionRes={codeExecutionRes} />}
               </div>
            </div>
         </div>
      </>
   );
};

export default CodeEditor;
