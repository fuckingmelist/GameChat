import React, { useState } from "react";
import { useForm } from "react-hook-form";
import GameChatApiWorker from "../Api/Api";

const SignUpForm = () => {
  let {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  let [dataURL, setDataURL] = useState("");

  let userApiWorker = new GameChatApiWorker();

  const addNewUser = (inputUserData) => {
    console.log(inputUserData);
    userApiWorker
      .addNewUser(inputUserData)
      .then((response) => {
        console.log(response.data);

        if (response.data == "") {
          window.location.href = "/signInForm";
        } else {
          alert(response.data);
        }
      })
      .catch((error) => {
        alert("Ошибка, перезагрузите страницу и попробуйте снова.");
      });
  };

  /* const downloadImg = (input) => {
    let file = input.files[0];
    img.src = URL.createObjectURL(file);
   
    img.onload = function(){
     var canvas = document.createElement('canvas');
     canvas.width = 200;
     canvas.height = 200;
   
     var ctx = canvas.getContext('2d');
     ctx.drawImage(img, 0,0, 200, 200);
     dataURL = canvas.toDataURL("image/png");
   
     return(dataURL);
    }
   } */

  const OnSubmit = (data) => {
    let inputUserData = {
      id: 0,
      nickname: data.nickname,
      login: data.login,
      password: data.password,
      eMail: data.eMail,
      profilePicture: uploadFileToServer(),
      comments: [],
      themes: [],
    };

    addNewUser(inputUserData);
    reset();
  };

 function uploadFileToServer() {
  if(document.getElementById("input").files[0] != null){
    var file = document.getElementById("input").files[0];
    console.log(file);
    var reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = function() {
        setDataURL(btoa(reader.result));
    };
    reader.onerror = function() {
        console.log('there are some problems');
    };
    console.log(dataURL);
    return dataURL;
  }
  else{
    return null;
  }
}

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
                      <h2 class="text-center ">Регистрация</h2>
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
                              minLength: {
                                value: 6,
                                message: "Не менее 6 символов",
                              },
                              maxLength: {
                                value: 12,
                                message: "Не более 12 символов",
                              },
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
                              minLength: {
                                value: 6,
                                message: "Не менее 6 символов",
                              },
                              maxLength: {
                                value: 12,
                                message: "Не более 12 символов",
                              },
                            })}
                          />
                          <div>{errors?.password?.message}</div>
                        </div>
                      </div>
                      <div class="row my-2 justify-content-center">
                        <div class="col-lg-5">
                          {" "}
                          <b>Псевдоним</b>
                          <input
                            class="form-control"
                            type="text"
                            {...register("nickname", {
                              required: "Поле не может быть пустым",
                              minLength: {
                                value: 6,
                                message: "Не менее 6 символов",
                              },
                              maxLength: {
                                value: 12,
                                message: "Не более 12 символов",
                              },
                            })}
                          />
                          <div>{errors?.nickname?.message}</div>
                        </div>
                      </div>
                      <div class="row my-2 justify-content-center">
                        <div class="col-lg-5">
                          {" "}
                          <b>Электронная почта</b>
                          <input
                            class="form-control"
                            type="text"
                            {...register("eMail", {
                              required: "Поле не может быть пустым",
                            })}
                          />
                          <div>{errors?.eMail?.message}</div>
                        </div>
                        <div class="row my-2 justify-content-center">
                          <div class="col-lg-5">
                            {" "}
                            <b>Картинка</b>
                            <input
                              class="form-control"
                              type="file"
                              id="input"

                              onChange={uploadFileToServer}
                              {...register("profilePicture", {
                              })}
                            />
                          </div>
                        </div>

                        <div class="row my-3 justify-content-center">
                          <div class="col-lg-3 ms-5 ">
                            <input
                              class="form-control btn btn-success"
                              type="submit"
                              value="Зарегаться :3"
                              disabled={isValid == false}
                            />
                          </div>
                          <form class="col-lg-2 me-4" action="/">
                            <button class="btn btn-outline-dark">Назад</button>
                          </form>
                        </div>
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

export default SignUpForm;
