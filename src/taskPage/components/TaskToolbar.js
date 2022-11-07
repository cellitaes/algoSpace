import { useHistory } from 'react-router-dom';
import Select from 'react-select';

import Button from '../../shared/components/FormElements/Button';
import ConfirmationModal from '../../shared/components/Modals/ConfirmationModal';
import { useModal } from '../../shared/hooks/modalHook';
import { useHttpClient } from '../../shared/hooks/httpHook';

import { customStyles } from '../components/SelectCustomStyles';
import './TaskToolbar.css';

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
   const history = useHistory();

   const { open, openModal, closeModal } = useModal();
   const { isLoading, error, sendRequest, clearError } = useHttpClient();

   const checkSolution = async () => {
      const body = {
         submissionDate: new Date().toISOString(),
         content: code,
         language: 'JAVA',
         taskId: 2,
         solverEmail: 'pelo',
      };

      // const data = await sendRequest(
      //    'http://localhost:8080/solution/check',
      //    'POST',
      //    JSON.stringify(body)
      // );

      fetch('http://localhost:8080/solution/check', {
         body: JSON.stringify(body),
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
      })
         .then((res) => res.json())
         .then((res) => console.log(res))
         .catch((e) => console.log(e));

      // console.log(data);
   };

   return (
      <>
         <ConfirmationModal
            show={open}
            content={quitPageContent}
            header={quitPageHeader}
            onCancel={closeModal}
            onClick={() => history.go(-2)}
         />
         <div className={`toolbar ${displayNone && 'display-none'}`}>
            <div className="toolbar__options">
               <Button size="xs" onClick={openModal}>
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
