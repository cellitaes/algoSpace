export const customStyles = (theme) => ({
   control: (styles) => ({
      ...styles,
      borderRadius: '5px',
      textAlign: 'left',
      color: theme === 'light' ? '#000' : '#fff',
      backgroundColor: theme === 'light' ? '#fff' : '#032538',
      cursor: 'pointer',
      border: `2px solid ${theme === 'light' ? '#000' : '#fff'}`,
   }),
   option: (styles) => {
      return {
         ...styles,
         color: '#000',
         fontSize: '0.8rem',
         textAlign: 'left',
         lineHeight: '1.75rem',
         background: '#fff',
         ':hover': {
            backgroundColor: 'rgb(243 244 246)',
            color: '#000',
            cursor: 'pointer',
         },
      };
   },
   singleValue: (style) => {
      return {
         ...style,
         color: theme === 'light' ? '#000' : '#fff',
      };
   },
   menu: (styles) => {
      return {
         ...styles,
         backgroundColor: '#fff',
         color: '#fff',
         border: '2px solid #000000',
         borderRadius: '5px',
      };
   },

   placeholder: (defaultStyles) => {
      return {
         ...defaultStyles,
         color: '#000',
         fontSize: '0.8rem',
         lineHeight: '1.75rem',
      };
   },
});
