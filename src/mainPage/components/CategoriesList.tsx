import "./CategoriesList.css";
import "../../shared/utils/css/Paragraph.css";
import { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/httpHook";

import { URL } from "../../config";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { Categories } from "../../types/categories";

const futureCategories = [
  {
    categoryId: "graphs",
    translation: "grafy",
    futureCategory: true,
  },
  {
    categoryId: "trees",
    translation: "drzewa",
    futureCategory: true,
  },
  {
    categoryId: "linked-lists",
    translation: "listy łączone",
    futureCategory: true,
  },
  {
    categoryId: "binary-trees",
    translation: "drzewa binarne",
    futureCategory: true,
  },
  {
    categoryId: "dynamic-programming",
    translation: "programowanie dynamiczne",
    futureCategory: true,
  },
  {
    categoryId: "search",
    translation: "przeszukiwanie",
    futureCategory: true,
  },
  {
    categoryId: "greedy-algorithms",
    translation: "algorytmy zachłanne",
    futureCategory: true,
  },
  {
    categoryId: "known-algorithms",
    translation: "znane algorytmy",
    futureCategory: true,
  },
  {
    categoryId: "binary-tree-search",
    translation: "przeszukiwanie drzew binarnych",
    futureCategory: true,
  },
  {
    categoryId: "heaps",
    translation: "kopce",
    futureCategory: true,
  },
];

const CategoriesList = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [categories, setCategories] = useState<Categories[]>([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getCategoriesAndTasks = async () => {
      let url = `${URL}/categories`;
      const fetchedCategories = await sendRequest(url);
      setCategories([...fetchedCategories.data, ...futureCategories]);

      url = `${URL}/tasks/number`;
      const allTasks = await sendRequest(url);
      setTasks(allTasks.data);
    };
    getCategoriesAndTasks();
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <ErrorModal error={error} onClear={clearError} />}
      <div className="categories">
        <div className="categories__introduction">
          <h1>
            {tasks} zadań obejmujących{" "}
            {categories.length - futureCategories.length + " "}
            kategorii.
          </h1>
          <p className="paragraph--color-primay categories__description--spacing paragraph--justify paragraph--normal-font">
            Jeśli chcesz dobrze wypaść na rozmowach o pracę, być dobrze
            zorientowanym we wszystkich typowych strukturach danych i
            popularnych metodach rozwiązywania problemów jest to miejsce idealne
            dla Ciebie.
          </p>
        </div>
        <ul className="categories__unorderd-list">
          {categories.map((category) => (
            <li
              key={category.categoryId}
              className={`categories__list-item center ${
                category.futureCategory && "category-disabled"
              }`}
            >
              <p className="paragraph--color-secondary paragraph--normal-font">
                {category.translation}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoriesList;
