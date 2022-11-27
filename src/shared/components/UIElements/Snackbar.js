import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = ({ open, closeSnackbar, text, severity }) => {
   return (
      <Snackbar
         open={open}
         autoHideDuration={4000}
         onClose={closeSnackbar}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
         <Alert
            onClose={closeSnackbar}
            severity={severity}
            sx={{ width: '100%' }}
         >
            {text}
         </Alert>
      </Snackbar>
   );
};

export default CustomSnackbar;
