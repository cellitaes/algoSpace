import { useState, useEffect, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useHttpClient } from '../../shared/hooks/httpHook';
import usePagination from '../../shared/hooks/paginationHook';
import { AuthContext } from '../../shared/context/AuthContext';
import { URL } from '../../config';

import '../../rankPage/pages/Rank.css';
import './SolutionHistory.css';

const tableHead = [
   {
      id: 1,
      name: 'L.p',
   },
   {
      id: 2,
      name: 'Nazwa',
   },
   {
      id: 3,
      name: 'Trudność',
   },
   {
      id: 4,
      name: 'Język',
   },
   {
      id: 5,
      name: 'Kategoria',
   },
   {
      id: 6,
      name: 'Data',
   },
   {
      id: 7,
      name: '',
   },
];

const SolutionHistory = () => {
   const [solvedTasks, setSolvedTasks] = useState([]);

   const history = useHistory();

   const { isLoading, error, sendRequest, clearError } = useHttpClient();
   const { currentData, currentPage, maxPage, jump } = usePagination(
      10,
      solvedTasks
   );
   const { token, userId } = useContext(AuthContext);

   useEffect(() => {
      const getSolutionHistory = async () => {
         const url = `${URL}/solution/all/${userId}`;
         const method = 'GET';
         const body = null;
         const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
         };

         const response = await sendRequest(url, method, body, headers);

         if (response.ok) {
            setSolvedTasks(response.data);
         }
      };
      getSolutionHistory();
   }, [sendRequest, setSolvedTasks, token, userId]);

   const handlePageClick = (event) => {
      jump(event.selected);
   };

   return (
      <>
         {isLoading && <LoadingSpinner asOverlay />}
         {error && <ErrorModal error={error} onClear={clearError} />}
         <div className="solution-wrapper">
            <div className="solution-history">
               <div className="pagination-container">
                  <ReactPaginate
                     className="solution-pagination "
                     breakLabel="..."
                     nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                     onPageChange={handlePageClick}
                     pageRangeDisplayed={1}
                     pageCount={maxPage}
                     previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
                     renderOnZeroPageCount={null}
                     forcePage={currentPage}
                  />
               </div>
               <table>
                  <thead>
                     <tr>
                        {tableHead.map((head) => (
                           <th key={head.id}>{head.name}</th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {currentData.map((sol, idx) => {
                        return (
                           <tr key={idx}>
                              <td className="row-place">
                                 {sol.taskGeneralInfo?.id}
                              </td>
                              <td className="row-name">
                                 {sol.taskGeneralInfo?.name}
                              </td>
                              <td className="row-difficulty">
                                 {sol.taskGeneralInfo?.difficulty?.translation}
                              </td>
                              <td className="row-language">
                                 {sol.language?.translation}
                              </td>
                              <td className="row-category">
                                 {sol.taskGeneralInfo?.category?.translation}
                              </td>
                              <td className="row-date">
                                 {`${new Date(
                                    sol.submissionDate
                                 ).toLocaleDateString()} ${new Date(
                                    sol.submissionDate
                                 ).toLocaleTimeString()}`}
                              </td>
                              <td className="row-show-solution">
                                 <Button
                                    className="xs"
                                    onClick={() => {
                                       history.push(
                                          `/task-submission/${sol.taskGeneralInfo?.id}/${sol.solverUsername}`
                                       );
                                    }}
                                 >
                                    Pokaż
                                 </Button>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         </div>
      </>
   );
};

export default SolutionHistory;
