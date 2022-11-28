import { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

import './SubmissionCode.css';

import { useHttpClient } from '../../shared/hooks/httpHook';
import { AuthContext } from '../../shared/context/AuthContext';
import { URL } from '../../config';

const SubmissionCode = () => {
   const [taskData, setTaskData] = useState(null);

   const history = useHistory();

   const { isLoading, error, sendRequest, clearError } = useHttpClient();

   const { token, userId } = useContext(AuthContext);
   const { taskId } = useParams();

   useEffect(() => {
      const getCode = async () => {
         const url = `${URL}/solution/task/{taskId}/{user}?taskId=${taskId}&user=${userId}`;
         const method = 'GET';
         const body = null;
         const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
         };

         const response = await sendRequest(url, method, body, headers);
         setTaskData(response.data);
      };

      getCode();
   }, [sendRequest, taskId, userId, token]);

   return (
      <>
         {isLoading && <LoadingSpinner asOverlay />}
         {error && <ErrorModal error={error} onClear={clearError} />}
         <div className="code-container">
            <Button size="xs" onClick={() => history.push('/solution-history')}>
               <FontAwesomeIcon icon={faLeftLong} />
            </Button>
            <div
               className="code-content"
               dangerouslySetInnerHTML={{ __html: taskData?.content }}
            />
         </div>
      </>
   );
};

export default SubmissionCode;
