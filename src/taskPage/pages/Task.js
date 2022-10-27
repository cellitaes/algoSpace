import { useEffect } from 'react';
import { useState } from 'react';
import { useHttpClient } from '../../shared/hooks/httpHook';
import { useParams } from 'react-router-dom';

import Editor from '@monaco-editor/react';

import './Task.css';
import { URL } from '../../config';

const Task = () => {
   const [task, setTask] = useState(null);
   const [language, setLanguage] = useState('');
   const [theme, setTheme] = useState('');
   const [code, setCode] = useState('');

   const { isLoading, error, sendRequest, clearError } = useHttpClient();

   const { taskId } = useParams();

   useEffect(() => {
      const getTaskById = async () => {
         const url = `${URL}/tasks/${taskId}`;
         const data = await sendRequest(url);
         setTask(data);
      };
      getTaskById();
   }, []);

   const handleEditorChange = (value) => {
      // setValue(value);
      // onChange('code', value);
   };

   return (
      <div className="task-container">
         <div
            className="task-container__task-content"
            dangerouslySetInnerHTML={{ __html: task?.content }}
         />
         {/* <div className="task-container__code-editor"> */}
         <Editor
            height="90vh"
            defaultLanguage="javascript"
            defaultValue="// some comment"
         />
         {/* </div> */}
      </div>
   );
};

export default Task;
