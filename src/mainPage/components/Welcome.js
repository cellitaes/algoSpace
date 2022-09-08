import Button from '../../shared/components/FormElements/Button';
import Paragraph from '../../shared/components/UIElements/Paragraph';

import './Welcome.css';

const Welcome = () => {
   return (
      <div className={`welcome center--column`}>
         <Paragraph shadow={true}>
            Witaj przybyszu z odległej galaktyki...
         </Paragraph>
         <div className="margin-around--small">
            <Paragraph bigFont={true} secondary={true} bold={true}>
               AlgoSpace
            </Paragraph>
         </div>
         <Paragraph shadow={true}>
            Jedyna w swoim rodzaju platforma e-learingowa.
         </Paragraph>
         <Paragraph shadow={true}>
            Lepsza od każdej innej znanej ci testerki, już teraz możesz mieć
            wszystko w jednym miejscu.
         </Paragraph>
         <div className="margin-around--medium">
            <Button>Zarejestruj się</Button>
         </div>
      </div>
   );
};

export default Welcome;
