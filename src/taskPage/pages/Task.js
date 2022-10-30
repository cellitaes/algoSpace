import { useEffect } from 'react';
import { useState } from 'react';
import { useHttpClient } from '../../shared/hooks/httpHook';
import { useParams, useLocation } from 'react-router-dom';

import { loader } from '@monaco-editor/react';
import monacoThemes from 'monaco-themes/themes/themelist';

import './Task.css';
import { URL } from '../../config';
import CodeEditor from '../components/CodeEditor';
import ConfirmationModal from '../../shared/components/Modals/ConfirmationModal';
import TaskToolbar from '../components/TaskToolbar';
import Hints from '../components/Hints';
import { useModal } from '../../shared/hooks/modalHook';

const changeLanguageContent =
   'Czy na pewno chcesz zmienić język? Spowoduje to nieodwracalne utracenie aktualnych zmian.';
const changeLanguageHeader = 'Zmiana języka';

let tempLanguage = '';

const Task = () => {
   const { taskId } = useParams();
   const searchParam = new URLSearchParams(useLocation().search).get(
      'language'
   );

   const [task, setTask] = useState({});
   const [language, setLanguage] = useState({
      value: searchParam,
      label: searchParam,
   });
   const [theme, setTheme] = useState({
      value: 'dracula',
      label: 'Dracula',
   });
   const [code, setCode] = useState('');
   const [descriptionMode, setDescriptionMode] = useState(true);

   const { isLoading, error, sendRequest, clearError } = useHttpClient();
   const { open, openModal, closeModal } = useModal();

   useEffect(() => {
      const getTaskById = async () => {
         const url = `${URL}/tasks/${taskId}`;
         const data = await sendRequest(url);
         setTask(data);
      };
      getTaskById();
   }, []);

   const handleEditorChange = (value) => {
      setCode(value);
   };

   const handleThemeChange = (theme) => {
      new Promise((res) => {
         Promise.all([
            loader.init(),
            import(`monaco-themes/themes/${monacoThemes[theme.value]}.json`),
         ]).then(([monaco, themeData]) => {
            monaco.editor.defineTheme(theme.value, themeData);
            res();
         });
      }).then((_) => setTheme(theme));
   };

   const handleLanguageChange = (language) => {
      openModal();
      tempLanguage = language;
   };

   return (
      <>
         <ConfirmationModal
            show={open}
            onCancel={closeModal}
            header={changeLanguageHeader}
            content={changeLanguageContent}
            onClick={() => {
               setLanguage(tempLanguage);
               closeModal();
            }}
         >
            {changeLanguageContent}
         </ConfirmationModal>
         <div className="task-container">
            <TaskToolbar
               title={task.name}
               language={language}
               availableLanguages={task.availableLanguages}
               handleLanguageChange={handleLanguageChange}
               descriptionMode={descriptionMode}
               setDescriptionMode={setDescriptionMode}
            />
            <div
               className="task-container__task-content"
               dangerouslySetInnerHTML={{ __html: task?.content }}
            />
            <Hints hints={task.hints} />
            <div className="task-container__codeEditor">
               <CodeEditor
                  theme={theme}
                  language={language}
                  descriptionMode={descriptionMode}
                  setDescriptionMode={setDescriptionMode}
                  handleThemeChange={handleThemeChange}
                  handleEditorChange={handleEditorChange}
               />
            </div>
         </div>
      </>
   );
};

export default Task;
