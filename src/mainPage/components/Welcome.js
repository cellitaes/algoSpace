import Button from '../../shared/components/FormElements/Button';

import './Welcome.css';
import '../../shared/util/Paragraph.css';

const Welcome = () => {
   return (
      <div className={`welcome center--column`}>
         <p className="paragraph--shadow">
            Witaj przybyszu z odległej galaktyki...
         </p>
         <div className="margin-around--small">
            <p className="paragraph--shadow paragraph--big-font paragraph--color-secondary paragraph--font-bold">
               AlgoSpace
            </p>
         </div>
         <p className="paragraph--shadow">
            Jedyna w swoim rodzaju platforma e-learingowa.
         </p>
         <p className="paragraph--shadow">
            Lepsza od każdej innej znanej ci testerki, już teraz możesz mieć
            wszystko w jednym miejscu.
         </p>
         <div className="margin-around--medium">
            <Button>Zarejestruj się</Button>
         </div>
      </div>
   );
};

export default Welcome;
