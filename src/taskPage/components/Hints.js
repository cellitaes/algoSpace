import {
   Accordion,
   AccordionItem,
   AccordionItemHeading,
   AccordionItemButton,
   AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';
import './Hints.css';

const Hints = ({ hints }) => {
   return (
      <div className="hints">
         <Accordion>
            {hints?.map((hint, idx) => (
               <AccordionItem key={idx}>
                  <AccordionItemHeading>
                     <AccordionItemButton>
                        {`Podpowiedź: ${idx + 1}`}
                     </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                     <p>{hint.content}</p>
                  </AccordionItemPanel>
               </AccordionItem>
            ))}
         </Accordion>
      </div>
   );
};

export default Hints;
