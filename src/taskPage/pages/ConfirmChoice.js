import { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { URL } from '../../config';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

import { customStyles } from '../components/SelectCustomStyles';
import './ConfirmChoice.css';

import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/AuthContext.js';
import { useHttpClient } from '../../shared/hooks/httpHook';

const categoryTranslation = [
   {
      categoryId: 'ARRAYS',
      translation: 'Tablice',
   },
   {
      categoryId: 'STACKS',
      translation: 'Stosy',
   },
   {
      categoryId: 'RECURSION',
      translation: 'Rekurencja',
   },
   {
      categoryId: 'STRINGS',
      translation: 'Ciągi znaków',
   },
   {
      categoryId: 'SORTING',
      translation: 'Sortowanie',
   },
   {
      categoryId: 'OTHER',
      translation: 'Inne',
   },
];

const ConfirmChoice = () => {
   const history = useHistory();
   const { taskId } = useParams();

   const [language, setLanguage] = useState();
   const [task, setTask] = useState({});
   const [selectError, setSelectError] = useState(false);
   const [isTouched, setIsTouched] = useState(false);

   const { isLoading, error, sendRequest, clearError } = useHttpClient();
   const { token } = useContext(AuthContext);

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
         setTask(data.data);
      };
      getTaskById();
   }, []);

   const handleLanguageChange = (lang) => {
      setLanguage(lang);
      setSelectError(false);
   };

   const handleSelectFocus = () => {
      if (!language) setSelectError(true);
      setIsTouched(true);
   };

   return (
      <>
         {isLoading && <LoadingSpinner asOverlay />}
         {error && <ErrorModal error={error} onClear={clearError} />}
         <div className="confirmation-page center--column">
            <div className="confirmation-page__layout">
               <div className="confirmation-page__goback-btn">
                  <Button size="sm" onClick={() => history.goBack()}>
                     <FontAwesomeIcon icon={faLeftLong} />
                     <span>Powrót</span>
                  </Button>
               </div>
               <header className="confirmation-page__header">
                  <p className="app-name paragraph--big-font paragraph--font-bold">
                     AlgoSpace
                  </p>
                  <div className="task-summary">
                     <p>
                        {`Nazwa zadania: `}
                        <span>{task.name}</span>
                     </p>
                     <p>
                        {`Kategoria: `}
                        <span className="task-summary__category">
                           {
                              categoryTranslation.find(
                                 (category) =>
                                    category.categoryId === task.category
                              )?.translation
                           }
                        </span>
                     </p>
                     <p>
                        {`Łatwość zdania: `}
                        <span>{task.difficulty?.translation}</span>
                     </p>
                  </div>
               </header>
               <div
                  className="task-content"
                  dangerouslySetInnerHTML={{ __html: task?.content }}
               />
               {(isTouched && !!language) ||
                  (selectError && (
                     <p className="paragraph--color-danger paragraph--padding-sx paragraph--normal-font">
                        Musisz wybrać język!
                     </p>
                  ))}
               <div className="language-select">
                  <Select
                     placeholder={`Wybierz język`}
                     options={task.availableLanguages?.map((language) => ({
                        label: language.toLowerCase(),
                        value: language.toLowerCase(),
                     }))}
                     value={language}
                     styles={customStyles('light')}
                     onChange={handleLanguageChange}
                     onBlur={handleSelectFocus}
                  />
               </div>
               <Button
                  to={`/task/${taskId}?language=${language?.value}`}
                  onClick={(e) => {
                     if (!language) e.preventDefault();
                     setSelectError(true);
                  }}
               >
                  Przejdź do zadania
               </Button>
            </div>
         </div>
      </>
   );
};

export default ConfirmChoice;
