import { useHistory } from 'react-router-dom';
import Select from 'react-select';

import Button from '../../shared/components/FormElements/Button';
import ConfirmationModal from '../../shared/components/Modals/ConfirmationModal';
import { useModal } from '../../shared/hooks/modalHook';

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
   setDescriptionMode,
}) => {
   const history = useHistory();

   const { open, openModal, closeModal } = useModal();

   return (
      <>
         <ConfirmationModal
            show={open}
            content={quitPageContent}
            header={quitPageHeader}
            onCancel={closeModal}
            onClick={() => history.go(-2)}
         />
         <div className="toolbar">
            <div className="toolbar__goback">
               <Button size="xs" onClick={openModal}>
                  <i class="fa-solid fa-left-long"></i>
               </Button>
            </div>
            <div className="toolbar__button toolbar__button--txtAlignRight">
               <Button size="xs" inverse>
                  <i class="fa-solid fa-check"></i>
                  {` Sprawdź rozwiązanie`}
               </Button>
            </div>
            <div className="toolbar__tabs">
               <Button
                  size="xs"
                  active={descriptionMode}
                  onClick={() => setDescriptionMode(true)}
               >
                  Opis zadania
               </Button>
               <Button
                  size="xs"
                  active={!descriptionMode}
                  onClick={() => setDescriptionMode(false)}
               >
                  Edytor kodu
               </Button>
            </div>
            <div>
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
         </div>
      </>
   );
};

export default TaskToolbar;
