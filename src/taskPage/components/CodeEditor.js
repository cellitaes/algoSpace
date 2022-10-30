import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import monacoThemes from 'monaco-themes/themes/themelist';
import Select from 'react-select';

import Button from '../../shared/components/FormElements/Button';
import ConfirmationModal from '../../shared/components/Modals/ConfirmationModal';

import { customStyles } from '../components/SelectCustomStyles';
import './CodeEditor.css';

const CodeEditor = ({
   theme,
   language,
   descriptionMode,
   setDescriptionMode,
   handleThemeChange,
   handleEditorChange,
}) => {
   const history = useHistory();
   const [openQuitModal, setOpenQuitModal] = useState(false);
   const [openSettings, setOpenSettings] = useState(false);

   const quitHeader = 'Czy na pewno chcesz wyjść?';
   const quitContent =
      'Czy na pewno chcesz wyjść? Spowoduje to nieodwracalne utracenie wszystkich zmian!';

   const settingHeader = 'Ustawienia edytora';
   const settingsContent = (
      <Select
         placeholder={`Wybierz motyw`}
         options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
            label: themeName,
            value: themeId,
         }))}
         value={theme}
         styles={customStyles('light')}
         onChange={handleThemeChange}
      />
   );

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
            {!descriptionMode && (
               <div className="minimalize-editor">
                  <div className="dropdown">
                     <Button size="xs" onClick={() => setOpenSettings(true)}>
                        <i class="fa-solid fa-gear"></i>
                     </Button>
                  </div>
                  <Button size="xs" onClick={() => setDescriptionMode(true)}>
                     <i class="fa-solid fa-down-left-and-up-right-to-center"></i>
                  </Button>
                  <Button size="xs" onClick={() => setOpenQuitModal(true)}>
                     <i class="fa-solid fa-door-open"></i>
                  </Button>
               </div>
            )}
            <div
               className={`${descriptionMode && 'none-edit'} ${
                  !descriptionMode && 'editor'
               }`}
            >
               {descriptionMode && (
                  <Button size="sm" onClick={() => setDescriptionMode(false)}>
                     <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                     Edytuj kod
                  </Button>
               )}

               <Editor
                  theme={theme.value}
                  height="100vh"
                  language={language.value || 'java'}
                  defaultValue="// some comment"
                  onChange={handleEditorChange}
               />
            </div>
         </div>
      </>
   );
};

export default CodeEditor;
