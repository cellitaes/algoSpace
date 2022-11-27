import { useContext, useEffect } from 'react';
import { useReducer } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { loader } from '@monaco-editor/react';
import monacoThemes from 'monaco-themes/themes/themelist';

import './Task.css';
import { URL } from '../../config';
import CodeEditor from '../components/CodeEditor';
import ConfirmationModal from '../../shared/components/Modals/ConfirmationModal';
import TaskToolbar from '../components/TaskToolbar';
import Hints from '../components/Hints';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

import { AuthContext } from '../../shared/context/AuthContext.js';
import { useHttpClient } from '../../shared/hooks/httpHook';
import { usePopUp } from '../../shared/hooks/modalHook';
import { useSlider } from '../../shared/hooks/slideHook';
import { useCallback } from 'react';

const changeLanguageContent =
   'Czy na pewno chcesz zmienić język? Spowoduje to nieodwracalne utracenie aktualnych zmian.';
const changeLanguageHeader = 'Zmiana języka';

let tempLanguage = '';

const manageTaskState = (state, action) => {
   switch (action.type) {
      case 'SET_TASK':
         return {
            ...state,
            task: action.task,
         };
      case 'CODE_CHANGE':
         return {
            ...state,
            code: action.code,
         };
      case 'SET_THEME':
         return {
            ...state,
            theme: action.theme,
         };
      case 'SET_NEW_WIDTH':
         return {
            ...state,
            introWidth: action.introWidth,
            editorWidth: action.editorWidth,
            left: action.left,
         };
      case 'SET_LANGUAGE':
         return {
            ...state,
            language: action.language,
         };
      case 'SET_DESCRIPTIONMODE':
         return {
            ...state,
            descriptionMode: action.descriptionMode,
         };
      case 'INIT_STATE':
         return {
            ...action.state,
         };
      default:
         return state;
   }
};

const Task = () => {
   const { taskId } = useParams();
   const searchParam = new URLSearchParams(useLocation().search).get(
      'language'
   );

   const initTasktate = {
      task: {},
      language: {
         value: searchParam,
         label: searchParam,
      },
      theme: {
         label: 'Amy',
         value: 'amy',
      },
      code: '',
      descriptionMode: true,
      showOutput: false,
      left: '40',
      introWidth: '40',
      editorWidth: '60',
   };

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
   const [open, openModal, closeModal] = usePopUp();
   const { dragging, handleMove, startDragging, stopDragging } = useSlider();
   const { token } = useContext(AuthContext);

   const searchForTemplateCode = useCallback(
      (task) => {
         const template = task?.templates?.find(
            ({ language: templateLanguage }) =>
               templateLanguage.toLowerCase() === language.value.toLowerCase()
         );
         return template;
      },
      [language?.value]
   );

   useEffect(() => {
      const getTaskById = async () => {
         const url = `${URL}/tasks/${taskId}`;
         const method = 'GET';
         const body = null;
         const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
         };

         const data = await sendRequest(url, method, body, headers);
         const template = searchForTemplateCode(data.data);

         dispatchTaskState({ type: 'SET_TASK', task: data.data });
         if (!template.content) return;
         dispatchTaskState({ type: 'CODE_CHANGE', code: template.content });
      };
      getTaskById();
   }, [searchForTemplateCode, sendRequest, taskId, token]);

   useEffect(() => {
      const template = searchForTemplateCode(task);
      if (!template?.content) return;
      setNewLangAndChangeCode(template);
   }, [language, searchForTemplateCode, task]);

   const handleEditorChange = (value) => {
      dispatchTaskState({ type: 'CODE_CHANGE', code: value });
   };

   const handleResize = () => {
      if (window.innerWidth < 1024)
         dispatchTaskState({
            type: 'SET_NEW_WIDTH',
            editorWidth: '100%',
            left: '40',
            introWidth: '40',
         });
      if (window.innerWidth >= 1024 && editorWidth === '60') {
         dispatchTaskState({
            type: 'SET_NEW_WIDTH',
            left: '40',
            introWidth: '40',
            editorWidth: '60',
         });
      }
   };

   useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   const handleThemeChange = async (theme) => {
      await new Promise((res) => {
         Promise.all([
            loader.init(),
            import(`monaco-themes/themes/${monacoThemes[theme.value]}.json`),
         ]).then(([monaco, themeData]) => {
            monaco.editor.defineTheme(theme.value, themeData);
            res();
         });
      }).then((_) => dispatchTaskState({ type: 'SET_THEME', theme: theme }));
   };

   const handleLanguageChange = (language) => {
      openModal();
      tempLanguage = language;
   };

   const setNewLangAndChangeCode = async (template) => {
      await new Promise((res) => {
         Promise.all([loader.init()]).then(([monaco]) => {
            monaco.editor.getModels()[0]?.setValue(template?.content);
            res();
         });
      }).then((_) =>
         dispatchTaskState({
            type: 'CODE_CHANGE',
            code: template?.content,
         })
      );
   };

   const checkSliderPosition = (leftPosition) => {
      let sliderPosiotion = leftPosition;

      if (leftPosition < 20 || leftPosition >= 80) return;

      return sliderPosiotion;
   };

   const handleSliderMove = (e) => {
      if (!dragging) return;

      let { positionX } = handleMove(e) || introWidth;
      if (!positionX) return;
      const windowWidth = window.innerWidth;
      const leftPosition = (positionX / windowWidth) * 100;

      const introductionWidth = checkSliderPosition(leftPosition);
      dispatchTaskState({
         type: 'SET_NEW_WIDTH',
         introWidth: introductionWidth,
         editorWidth: 100 - introductionWidth,
         left: introductionWidth,
      });
   };

   const changeDescriptionMode = (descMode) => {
      dispatchTaskState({
         type: 'SET_DESCRIPTIONMODE',
         descriptionMode: descMode,
      });
   };

   return (
      <>
         {isLoading && <LoadingSpinner asOverlay />}
         {error && <ErrorModal error={error} onCancel={clearError} />}
         <ConfirmationModal
            show={open}
            onCancel={closeModal}
            header={changeLanguageHeader}
            content={changeLanguageContent}
            onClick={() => {
               dispatchTaskState({
                  type: 'SET_LANGUAGE',
                  language: tempLanguage,
               });
               closeModal();
            }}
         >
            {changeLanguageContent}
         </ConfirmationModal>
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
                  title={task.name}
                  language={language}
                  availableLanguages={task.availableLanguages}
                  handleLanguageChange={handleLanguageChange}
                  descriptionMode={descriptionMode}
                  changeDescriptionMode={changeDescriptionMode}
                  displayNone={!showOutput && !descriptionMode}
                  code={code}
               />
               <div
                  className="task-container__task-content"
                  dangerouslySetInnerHTML={{ __html: task?.content }}
               />
               <Hints
                  hints={task.hints}
                  displayNone={!showOutput && !descriptionMode}
               />
            </div>
            <div>
               <div class="slider-task__divider" style={{ left: `${left}%` }}>
                  <div
                     class="slider-task__handle"
                     onMouseDown={startDragging}
                     onTouchStart={startDragging}
                     onMouseUp={stopDragging}
                  >
                     <i class="fa fa-chevron-left"></i>
                     <i class="fa fa-chevron-right"></i>
                  </div>
               </div>
            </div>
            <div
               className="task-container__code-editor"
               style={{
                  width: `${window.innerWidth < 1024 ? '100' : editorWidth}%`,
                  flexBasis: `${
                     window.innerWidth < 1024 ? '100' : editorWidth
                  }%`,
               }}
            >
               <CodeEditor
                  theme={theme}
                  language={language}
                  displayNone={!showOutput && !descriptionMode}
                  descriptionMode={descriptionMode}
                  changeDescriptionMode={changeDescriptionMode}
                  handleThemeChange={handleThemeChange}
                  handleEditorChange={handleEditorChange}
                  code={code}
                  showOutput={showOutput}
               />
            </div>
         </div>
      </>
   );
};

export default Task;
