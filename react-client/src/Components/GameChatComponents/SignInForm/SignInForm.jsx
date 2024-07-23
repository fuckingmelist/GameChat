import React, { useState } from "react";
import { useForm } from "react-hook-form";
import GameChatApiWorker from "../Api/Api";

const SignInForm = () => {
  let {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  let userApiWorker = new GameChatApiWorker();

  const findUser = (inputUserData) => {
    console.log(inputUserData);

    userApiWorker
      .getUser(inputUserData)
      .then((response) => {
        if (response.data != "") {
          console.log(response.data);
          localStorage.setItem("User", JSON.stringify(response.data));
         window.location.href = "/";
        } else {
          alert("Неправильные логин или пароль!!!");
        }
      })
      .catch((error) => {
        console.log("getUserError");
        alert("Ошибка, перезагрузите страницу и попробуйте снова!!!")
      });
  };

  const OnSubmit = (data) => {
    let inputUserData = {
      id: 0,
      nickname: null,
      login: data.login,
      password: data.password,
      eMail: null,
      profilePicture: null,
      comments: [],
      themes: [],
    };

    findUser(inputUserData);
    reset();
  };

  return (
    <div class="bg-dark">
      <footer class=" bg-dark vh-100">
        <h1 class="text-center text-white p-4 ">GAMECHAT</h1>
        <div class="">
          <div class="container h-100">
            <div class="d-flex justify-content-center align-items-center">
              <div class="col col-lg-9 col-xl-7">
                <div class="card rounded-3">
                  <div class="card-body ">
                    <div class="row justify-content-center">
                      <h2 class="text-center ">Авторизация</h2>
                    </div>
                    <form onSubmit={handleSubmit(OnSubmit)}>
                      <div class="row my-2 justify-content-center">
                        <div class="col-lg-5">
                          <b>Логин</b>
                          <input
                            class="form-control"
                            type="text"
                            {...register("login", {
                              required: "Поле не может быть пустым",
                            })}
                          />
                          <div>{errors?.login?.message}</div>
                        </div>
                      </div>
                      <div class="row my-2 justify-content-center">
                        <div class="col-lg-5">
                          {" "}
                          <b>Пароль</b>
                          <input
                            class="form-control"
                            type="text"
                            {...register("password", {
                              required: "Поле не может быть пустым",
                            })}
                          />
                          <div>{errors?.password?.message}</div>
                        </div>
                      </div>

                      <div class="row my-2 justify-content-center">
                        <div class="col-lg-3 ms-5 ">
                          <input
                            class="form-control btn btn-success"
                            type="submit"
                            value="Войти :3"
                            disabled={isValid == false}
                          />
                        </div>
                        <form class="col-lg-2 me-4" action="/">
                          <button class="btn btn-outline-dark">Назад</button>
                        </form>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignInForm;
