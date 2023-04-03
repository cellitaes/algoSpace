import { FC, CSSProperties } from "react";
import "./Output.css";

const Output: FC<{
  codeExecutionRes: string;
  outputHeightStyle: CSSProperties;
}> = ({ codeExecutionRes, outputHeightStyle }) => {
  return (
    <div className="output" style={outputHeightStyle}>
      <div className="output__info" style={{ whiteSpace: "pre-wrap" }}>
        {codeExecutionRes}
      </div>
    </div>
  );
};

export default Output;
