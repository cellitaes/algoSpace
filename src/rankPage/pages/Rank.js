import { useEffect } from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import { useHttpClient } from '../../shared/hooks/httpHook';
import usePagination from '../../shared/hooks/paginationHook';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { URL } from '../../config';

import './Rank.css';

const Rank = () => {
   const [ranks, setRanks] = useState([]);
   const { isLoading, error, sendRequest, clearError } = useHttpClient();
   const { currentData, currentPage, maxPage, jump } = usePagination(10, ranks);

   useEffect(() => {
      const url = `${URL}/users/ranking`;

      const getRanking = async () => {
         const response = await sendRequest(url);
         setRanks(response.data);
      };
      getRanking();
   }, [sendRequest]);

   const handlePageClick = (event) => {
      jump(event.selected);
   };

   return (
      <>
         {isLoading && <LoadingSpinner asOverlay />}
         {error && <ErrorModal error={error} onClear={clearError} />}
         <div className="rank-wrapper">
            <div className="rank">
               <div className="pagination-container">
                  <ReactPaginate
                     className="rank-pagination "
                     breakLabel="..."
                     nextLabel={<i class="fa-solid fa-angle-right"></i>}
                     onPageChange={handlePageClick}
                     pageRangeDisplayed={1}
                     pageCount={maxPage}
                     previousLabel={<i class="fa-solid fa-angle-left"></i>}
                     renderOnZeroPageCount={null}
                     forcePage={currentPage}
                  />
               </div>
               <table>
                  <thead>
                     <tr>
                        <th>L.p</th>
                        <th>Użytkownik</th>
                        <th>punkty</th>
                     </tr>
                  </thead>
                  <tbody>
                     {currentData.map((rank, idx) => {
                        return (
                           <tr>
                              <td className="row-place">{idx + 1}</td>
                              <td className="row-username">{rank.username}</td>
                              <td className="row-points">{rank.points}</td>
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

export default Rank;
