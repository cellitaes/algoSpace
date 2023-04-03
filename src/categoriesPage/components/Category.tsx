import { FC, useCallback, useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { NavLink, useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/httpHook";
import usePagination from "../../shared/hooks/paginationHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import { PaginationMouseEvent } from "../../types/event";
import { URL } from "../../config";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/AuthContext";
import { Categories } from "../../types/categories";
import { SolvedTask, Task } from "../../types/task";

import "./Category.css";

const Category: FC<{ categories: Categories[] }> = ({ categories }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");

  const { currentData, currentPage, maxPage, jump, resetPage, setNewDataSet } =
    usePagination<Task>(5, tasks);

  const { category }: { category: string } = useParams();

  const { token, userId } = useContext(AuthContext);

  useEffect(() => {
    const getTasksByParam = async () => {
      let url = `${URL}/tasks`;
      let method = "GET";
      const body = null;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const tasks = await sendRequest(url, method, body, headers);

      url = `${URL}/solution/all/${userId}`;
      const response = await sendRequest(url, method, body, headers);
      const doneTasks: SolvedTask[] = response?.data;

      const mappedTasks = tasks.data.map((task: Task) => {
        const taskCopy = task;

        taskCopy.done = !!doneTasks.find(
          (t) => t.taskGeneralInfo.name === task.name
        );

        return taskCopy;
      });

      setTasks(mappedTasks);
    };
    getTasksByParam();
  }, [sendRequest, setTasks, userId, token]);

  useEffect(() => {
    resetPage();
  }, [resetPage, category]);

  useEffect(() => {
    const catTranslation =
      categories.find(
        (cat) => cat.categoryId.toLowerCase() === category.toLowerCase()
      )?.translation || "Wszystkie";
    setCurrentCategory(catTranslation);
  }, [category, categories, setCurrentCategory]);

  useEffect(() => {
    setNewDataSet(tasks);
  }, [setNewDataSet, tasks]);

  useEffect(() => {
    const filtratedTasks = tasks.filter((t) => {
      if (currentCategory === "Wszystkie") return true;
      return t.category.translation === currentCategory;
    });
    setNewDataSet(filtratedTasks);
  }, [setNewDataSet, tasks, currentCategory]);

  const handlePageClick = (event: PaginationMouseEvent) => {
    jump(event.selected);
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <ErrorModal error={error} onClear={clearError} />}
      <div className="align-items-left">
        <h1 className="category-name">{currentCategory}</h1>
        <hr />
        <h2 className="tasks-introduction">Zadania:</h2>
      </div>
      <div className="category-tasks">
        <ReactPaginate
          className="category-pagination"
          breakLabel="..."
          nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={maxPage}
          previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
          forcePage={currentPage}
        />
        {currentData?.map((task) => (
          <div key={task.id}>
            <NavLink className="task" to={`/start/task/${task.id}`}>
              <div
                className={`task__difficulty task__difficulty--${task.difficulty.id.toLowerCase()}`}
              >
                {task.difficulty.translation}
              </div>
              <div className="task__name">{task.name}</div>
              {task.done && (
                <div className="task__done">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>
              )}
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;
