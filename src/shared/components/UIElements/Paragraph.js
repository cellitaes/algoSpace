import './Paragraph.css';

const Paragraph = (props, children) => {
   return (
      <p
         className={`paragraph ${
            props.secondary && 'paragraph--color-secondary'
         } ${props.shadow && 'paragraph--shadow'} ${
            props.bigFont && 'paragraph--big-font'
         } ${props.bold && 'paragraph--font-bold'} ${
            props.primary && 'paragraph--color-primay'
         }`}
      >
         {props.children}
      </p>
   );
};

export default Paragraph;
