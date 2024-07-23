import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div class=" vh-100 justify-content-center ">
        <div class="text-center">
          <h1 class="display-1 fw-bold">404</h1>
          <p class="fs-3">
            {" "}
            <span class="text-danger">Ой...</span> Страница не найдена.
          </p>
          <p class="lead">Страница, которую вы ищете, не существует.</p>
          <a href="/" class="btn btn-dark">
            На главную
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
