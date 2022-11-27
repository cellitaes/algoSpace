import './Output.css';

const Output = ({ codeExecutionRes, outputHeightStyle }) => {
   return (
      <div className="output" style={outputHeightStyle}>
         <div className="output__info">{codeExecutionRes}</div>
      </div>
   );
};

export default Output;
