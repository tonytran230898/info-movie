import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.scss";
import NetflixLogo from "../../assets/images/netflix-logo.png";

const api = axios.create({
  baseURL: "https://api.realworld.io/api",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});
function FormSignIn(props) {
  const [email, setEmail] = useState({
    value: "",
    isTouch: false,
  });
  const [password, setPassword] = useState({
    value: "",
    isShowPass: false,
    isTouch: false,
  });

  // Cách 1 (get từng trường hợp)
  // const onChangeEmail = (e) => {
  //   const value = e.target.value;
  //   setEmail((pre) => (pre = value));
  // };

  // const onChangePass = (e) => {
  //   const value = e.target.value;
  //   setPassword((pre) => ({
  //     ...pre,
  //     value,
  //   }));
  // };

  // Cách 2 (viết hàm dùng chung)
  const onType = (e) => {
    const { name } = e.target;
    const value =
      e.target.value &&
      e.target.value.length >= 4 &&
      e.target.value.length <= 60;
    if (name === "email") {
      setEmail((pre) => ({
        ...pre,
        value,
        isTouch: true,
      }));
    } else if (name === "password") {
      setPassword((pre) => ({
        ...pre,
        value,
        isTouch: true,
      }));
    }
  };

  const onShowPass = (e) => {
    const checked = e.target.checked;
    setPassword((pre) => ({
      ...pre,
      // C1
      isShowPass: checked,
      // C2
      // isShowPass: !pre.isShowPass,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (email.value && password.value) {
      //call api

      api
        .post("/users/login", {
          user: {
            email: email.value,
            password: password.value,
          },
        })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            alert("success");
            //ghi giá trị token vào localstorage
            const {
              user: { token },
            } = res.data;
            localStorage.setItem("token", `${token}`);
          }
        });
    }
  };

  const navigate = useNavigate();

  const goHome = (e) => {
    navigate("/");
  };

  const handleClickSignUp = (e) => {
    navigate("/signup");
  };

  useEffect(() => {
    console.log("email", email.value);
    console.log("pass", password.value);
    console.log("check", password.isShowPass);
  }, [
    email.value,
    password.value,
    password.isShowPass,
    email.isTouch,
    password.isTouch,
  ]);
  return (
    <div className="containerForm">
      <div className="logo" onClick={(e) => goHome(e)}>
        <img src={NetflixLogo} alt="" />
      </div>
      <div className="modalImg"></div>
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/ac824598-245b-4828-b14f-5cff9074f4d0/2dc90a8e-4441-4703-8b73-1ca831fb0733/VN-vi-20220822-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="background"
      />

      <div className="modalForm">
        <form className="form">
          <h1>Đăng nhập</h1>
          <div className="formLogin">
            <input
              onChange={(e) => onType(e)}
              name="email"
              type="text"
              placeholder="Email hoặc số điện thoại"
              style={
                !email.value && email.isTouch
                  ? { boxShadow: "0 2px 1px #E87C03" }
                  : { boxShadow: "none" }
              }
              onBlur={(e) => onType(e)}
            />
            <div
              className="errorInput"
              style={{
                fontSize: "13px",
                color: "#E87C03",
                marginTop: "5px",
                marginBottom: "15px",
              }}
            >
              {!email.value && email.isTouch
                ? "Vui lòng nhập email hoặc số điện thoại hợp lệ."
                : ""}
            </div>

            <input
              onChange={(e) => onType(e)}
              name="password"
              type={password.isShowPass ? "text" : "password"}
              placeholder="Mật khẩu"
              style={
                !password.value && password.isTouch
                  ? { boxShadow: "0 2px 1px #E87C03" }
                  : { boxShadow: "none" }
              }
              onBlur={(e) => onType(e)}
            />
            <div
              className="errorInput"
              style={{
                fontSize: "13px",
                color: "#E87C03",
                marginTop: "5px",
                marginBottom: "35px",
              }}
            >
              {!password.value && password.isTouch
                ? "Mật khẩu của bạn phải chứa từ 4 đến 60 ký tự."
                : ""}
            </div>
          </div>
          <div className="btnLogin">
            <input
              type="submit"
              value="Đăng nhập"
              style={{
                backgroundColor: "#E50914",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={(event) => onSubmit(event)}
            />
          </div>
          <div className="btnCheck">
            <div>
              <input
                onClick={(e) => onShowPass(e)}
                className="checkbox"
                type="checkbox"
                name=""
                id="showPass"
              />
              <i className="fa-solid fa-check iconCheck"></i>
              <label htmlFor="showPass">Show Password</label>
            </div>
            <div>
              <input
                className="checkbox"
                type="checkbox"
                name=""
                id="rememberMe"
              />
              <i className="fa-solid fa-check iconCheck"></i>
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
          </div>
          <div className="descirption">
            <p>
              Bạn mới tham gia Netflix?&nbsp;
              <span onClick={(e) => handleClickSignUp(e)}>Đăng ký ngay</span>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormSignIn;
