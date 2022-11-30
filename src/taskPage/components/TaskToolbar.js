import { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faLeftLong,
   faCheck,
   faCircleXmark,
   faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

import Button from '../../shared/components/FormElements/Button';
import ConfirmationModal from '../../shared/components/Modals/ConfirmationModal';
import Modal from '../../shared/components/UIElements/Modal';
import { usePopUp } from '../../shared/hooks/modalHook';
import { useHttpClient } from '../../shared/hooks/httpHook';

import { customStyles } from '../components/SelectCustomStyles';
import './TaskToolbar.css';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/AuthContext.js';

const quitPageContent =
   'Czy na pewno chcesz opuścić stronę? Spowoduje to nieodwracalne utracenie aktualnych zmian.';
const quitPageHeader = 'Powrót do zadań';

const TaskToolbar = ({
   title,
   language,
   availableLanguages,
   handleLanguageChange,
   descriptionMode,
   changeDescriptionMode,
   displayNone,
   code,
}) => {
   const [submissionResult, setSubmissionResult] = useState(null);

   const history = useHistory();
   const { taskId } = useParams();

   const {
      open: openQuitPage,
      openModal: openQuitPageModal,
      closeModal: closeQuitPageModal,
   } = usePopUp();
   const {
      open: openTaskSolution,
      content: taskSolutionContent,
      setPopUpContent: setTaskSolutionPopUpContent,
      openModal: openTaskSolutionModal,
      closeModal: closeTaskSolutionModal,
   } = usePopUp();
   const { isLoading, error, errorCode, sendRequest, clearError } =
      useHttpClient();
   const { token, userId } = useContext(AuthContext);
   const [isCorrect, setIsCorrect] = useState(false);

   const checkSolution = async () => {
      const url = 'http://localhost:8080/solution/check';
      const method = 'POST';
      const body = JSON.stringify({
         submissionDate: new Date().toISOString(),
         content: code,
         language: language?.value?.toUpperCase(),
         taskId: taskId,
         solverUsername: userId,
      });
      const headers = {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      };

      const response = await sendRequest(url, method, body, headers);
      setSubmissionResult(response);
   };

   useEffect(() => {
      switch (errorCode) {
         case 200:
            if (!submissionResult.data) {
               setIsCorrect(false);
               break;
            }
            setIsCorrect(true);
            break;
         case 500:
            setIsCorrect(false);
            setTaskSolutionPopUpContent('Coś poszło nie tak!');
            break;
         default:
            setIsCorrect(false);
            break;
      }

      if (errorCode) openTaskSolutionModal();
   }, [
      errorCode,
      openTaskSolutionModal,
      setTaskSolutionPopUpContent,
      submissionResult,
   ]);

   return (
      <>
         {isLoading && <LoadingSpinner asOverlay />}
         {error && <ErrorModal error={error} onClear={clearError} />}
         {openTaskSolution && (
            <Modal
               header={`Twoje rozwiązanie jest ${
                  isCorrect ? 'poprawne' : 'niepoprawne'
               }`}
               show={openTaskSolution}
               footer={
                  <Button
                     onClick={
                        isCorrect
                           ? () => history.push('/tasks/all')
                           : closeTaskSolutionModal
                     }
                  >
                     Okej
                  </Button>
               }
            >
               {
                  <>
                     {taskSolutionContent}
                     <p
                        className={`solution-icon solution-icon--${
                           isCorrect ? 'success-color' : 'danger-color'
                        }`}
                     >
                        {isCorrect ? (
                           <FontAwesomeIcon icon={faCircleCheck} />
                        ) : (
                           <FontAwesomeIcon icon={faCircleXmark} />
                        )}
                     </p>
                  </>
               }
            </Modal>
         )}
         <ConfirmationModal
            show={openQuitPage}
            content={quitPageContent}
            header={quitPageHeader}
            onCancel={closeQuitPageModal}
            onClick={() => history.go(-2)}
         />
         <div className={`toolbar ${displayNone && 'display-none'}`}>
            <div className="toolbar__options">
               <Button size="xs" onClick={openQuitPageModal}>
                  <FontAwesomeIcon icon={faLeftLong} />
                  <span className="icon-name">Powrót</span>
               </Button>
               <Button size="xs" inverse onClick={checkSolution}>
                  <FontAwesomeIcon icon={faCheck} />
                  <span className="icon-name">Sprawdź rozwiązanie</span>
               </Button>
            </div>
            <div className="select-language">
               <p className="toolbar__title">{title}</p>
               <div className="toolbar__select">
                  <Select
                     placeholder={`Wybierz język`}
                     options={availableLanguages?.map((language) => ({
                        label: language.toLowerCase(),
                        value: language.toLowerCase(),
                     }))}
                     value={language}
                     styles={customStyles('dark')}
                     onChange={handleLanguageChange}
                  />
               </div>
            </div>
            <div className="toolbar__tabs">
               <Button
                  size="xs"
                  active={descriptionMode}
                  onClick={() => changeDescriptionMode(true)}
               >
                  Opis zadania
               </Button>
               <Button
                  size="xs"
                  active={!descriptionMode}
                  onClick={() => changeDescriptionMode(false)}
               >
                  Edytor kodu
               </Button>
            </div>
         </div>
      </>
   );
};

export default TaskToolbar;
