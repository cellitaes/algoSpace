import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import monacoThemes from 'monaco-themes/themes/themelist';
import Select from 'react-select';

import {
   RAPID_API_HOST,
   RAPID_API_KEY,
   APP_APPI_SUBMISSION_URL,
} from '../../config';
import { apiLanguages } from '../../shared/util/apiLanguages.js';

import Button from '../../shared/components/FormElements/Button';
import ConfirmationModal from '../../shared/components/Modals/ConfirmationModal';
import Output from './Output';

import { customStyles } from '../components/SelectCustomStyles';
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
   const [codeExecutionRes, setCodeExecutionRes] = useState({});

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

   const language_id = apiLanguages.find(
      (lang) => lang.value === language.value
   ).id;

   const checkCode = async (token) => {
      const options = {
         method: 'GET',
         headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': RAPID_API_HOST,
         },
      };

      await fetch(`${APP_APPI_SUBMISSION_URL}/${token}`, options)
         .then((res) => res.json())
         .then((res) => setCodeExecutionRes(res));
   };

   const sendCode = async () => {
      const options = {
         method: 'POST',
         headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': RAPID_API_HOST,
         },
         body: JSON.stringify({
            language_id: language_id,
            source_code: code,
         }),
      };

      await fetch(APP_APPI_SUBMISSION_URL, options)
         .then((res) => res.json())
         .then((token) => checkCode(token.token));
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
                  <Button size="xs" onClick={sendCode}>
                     Compile and execute
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
                        height={'93vh'}
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
