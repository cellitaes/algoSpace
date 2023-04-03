import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/httpHook";

import Category from "../components/Category";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./Categories.css";

import { Categories as CategoriesStruct } from "../../types/categories";
import { AuthContext } from "../../shared/context/AuthContext";
import { URL } from "../../config";

const initCategory = {
  categoryId: "ALL",
  translation: "Wszystkie",
};

const Categories = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { token } = useContext(AuthContext);

  const [categories, setCategories] = useState<CategoriesStruct[]>([
    initCategory,
  ]);

  useEffect(() => {
    const getCategories = async () => {
      const url = `${URL}/categories`;
      const method = "GET";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const body = null;

      const fetchedCategories = await sendRequest(url, method, body, headers);
      setCategories([initCategory, ...fetchedCategories.data]);
    };
    getCategories();
  }, [sendRequest, token]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <ErrorModal error={error} onClear={clearError} />}
      <div className="categories-container center">
        <div className="categories-layout">
          <div className="categories-list">
            {categories.map((cat) => (
              <div key={cat.categoryId} className="categories-list__item">
                <NavLink to={`/tasks/${cat.categoryId.toLowerCase()}`}>
                  {cat.translation}
                </NavLink>
              </div>
            ))}
          </div>
          <div className="category-tasks">
            <Category categories={categories} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
