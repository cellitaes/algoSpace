import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './Hints.css';

const Hints = ({ hints, displayNone }) => {
   return (
      <div className={`hints ${displayNone && 'display-none'}`}>
         {hints?.map((hint, idx) => (
            <Accordion key={idx}>
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="hint-content"
                  id="hint-header"
               >
                  <Typography>{`Podpowiedź: ${idx + 1}`}</Typography>
               </AccordionSummary>
               <AccordionDetails>
                  <Typography>{hint.content}</Typography>
               </AccordionDetails>
            </Accordion>
         ))}
      </div>
   );
};

export default Hints;
