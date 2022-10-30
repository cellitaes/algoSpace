import Button from '../FormElements/Button';
import Modal from '../UIElements/Modal';

const ConfirmationModal = ({
   content,
   onClick,
   show,
   onCancel,
   header,
   noFooter,
}) => {
   const modalHeader = header;
   const modalContent = <p>{content}</p>;
   const footer = !noFooter && (
      <>
         <Button onClick={onClick} success size="sm">
            Zatwierdź
         </Button>
         <Button onClick={onCancel} size="sm" danger>
            Anuluj
         </Button>
      </>
   );

   return (
      <Modal
         footer={footer}
         header={modalHeader}
         onCancel={onCancel}
         show={show}
      >
         {modalContent}
      </Modal>
   );
};

export default ConfirmationModal;
