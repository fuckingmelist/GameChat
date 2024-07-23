import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Loyout = () => {
  let user = JSON.parse(localStorage.getItem("User"));

  const FF = () => {
    if (window.location.href === "/themeForm") {
      alert();
    }
  };

  const profileForm = () => {
    window.location.href = "/profileForm";
  };

  const signOut = () => {
    localStorage.removeItem("User");
    document.getElementById(
      "user-view"
    ).innerHTML = `     <form class="btn me-2" action="/signInForm">
   <button class="btn btn-outline-light">Войти</button>
 </form>
 <form class="btn me-2" action="/signUpForm">
 <button class="btn btn-warning">Зарегистрироваться</button>
 </form>`;
  };
  return (
    <div>
      <div>
        <header class="d-flex bg-dark flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <a
            href="/"
            class="d-flex justify-content-center align-items-center col-md-3 mb-2 mb-md-0 text-white text-decoration-none"
          >
            Главная
          </a>

          <ul class="nav col-md-auto mb-3 justify-content-center mb-md-0">
            <a class="d-flex justify-content-center align-items-center col-md-3 mb-2 mb-md-0 text-white text-decoration-none">
              GAMECHAT
            </a>
          </ul>
          <div
            id="user-view"
            class="col-md-3 justify-content-center align-items-center"
          >
            {user === null ? (
              <div>
                <form class="btn me-2" action="/signInForm">
                  <button class="btn btn-outline-light">Войти</button>
                </form>
                <form class="btn me-2" action="/signUpForm">
                  <button class="btn btn-warning">Зарегистрироваться</button>
                </form>
              </div>
            ) : (
              <form class="btn me-2">
                <a
                  href="#"
                  class="d-block link-light text-decoration-none dropdown-toggle"
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={"data:image/png;base64," + user.profilePicture}
                    width="50"
                    height="50"
                    class="my-3 rounded-circle"
                  />
                </a>
                <ul
                  class="dropdown-menu text-small"
                  aria-labelledby="dropdownUser1"
                >
                  <li>
                    <a onClick={profileForm} class="dropdown-item" href="#">
                      Профиль
                    </a>
                  </li>

                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a onClick={signOut} class="dropdown-item" href="#">
                      Выйти
                    </a>
                  </li>
                </ul>
              </form>
            )}
          </div>
        </header>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Loyout;
