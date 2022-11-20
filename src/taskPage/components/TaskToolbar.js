import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

import Button from '../../shared/components/FormElements/Button';
import ConfirmationModal from '../../shared/components/Modals/ConfirmationModal';
import { useModal } from '../../shared/hooks/modalHook';
import { useHttpClient } from '../../shared/hooks/httpHook';

import { customStyles } from '../components/SelectCustomStyles';
import './TaskToolbar.css';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/AuthContext.js';

const quitPageContent =
   'Czy na pewno chcesz opuścić stronę? Spowoduje to nieodwracalne utracenie aktualnych zmian.';
const quitPageHeader = 'Powrót do zadań';

const taskSolvedContent = 'Zadanie zostało poprawnie rozwiązane!';
let taskSolutionContent = 'Twoje rozwiązanie jest';
const taskNotSolvedContent = 'Zadanie nie zostało rozwiązane poprawnie :(.';

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
   const history = useHistory();

   const [openQuitPage, openQuitPageModal, closeQuitPageModal] = useModal();
   const [openTaskSolution, openTaskSolutionModal, closeTaskSolutionModal] =
      useModal();
   const { isLoading, error, sendRequest, clearError } = useHttpClient();
   const { token, userId } = useContext(AuthContext);

   const checkSolution = async () => {
      const url = 'http://localhost:8080/solution/check';
      const method = 'POST';
      const body = JSON.stringify({
         submissionDate: new Date().toISOString(),
         content: code,
         language: 'JAVA',
         taskId: 2,
         solverUsername: userId,
      });
      const headers = {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      };

      const result = await sendRequest(url, method, body, headers);
      if (!result.data) {
         openTaskSolutionModal();
      } else {
      }
   };

   return (
      <>
         {isLoading && <LoadingSpinner asOverlay />}
         {error && <ErrorModal error={error} onClear={clearError} />}
         <ConfirmationModal
            show={openTaskSolution}
            content={quitPageContent}
            header={quitPageHeader}
            onCancel={closeTaskSolutionModal}
            onClick={() => history.go(-2)}
         />
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
                  <i class="fa-solid fa-left-long"></i>
               </Button>
               <Button size="xs" inverse onClick={checkSolution}>
                  <i class="fa-solid fa-check"></i>
                  {` Sprawdź rozwiązanie`}
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
