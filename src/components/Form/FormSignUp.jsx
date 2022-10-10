import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import "./Form.scss";
import NetflixLogo from "../../assets/images/netflix-logo.png";

export default function FormSignUp() {
  const [email, setEmail] = useState({
    value: "",
    isTouch: false,
  });

  const [password, setPassword] = useState({
    value: "",
    isShowPass: false,
    isTouch: false,
  });

  const [retypePassword, setRetypePassword] = useState({
    value: "",
    isShowPass: false,
    isTouch: false,
  });

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
    } else if (name === "retypePassword") {
      setRetypePassword((pre) => ({
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
      isShowPass: checked,
    }));
    setRetypePassword((pre) => ({
      ...pre,
      isShowPass: checked,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const goHome = (e) => {
    navigate("/");
  };

  const handleClickSingIn = (e) => {
    navigate("/signin");
  };
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

      <div className="modalForm modalFormRegister">
        <form className="form">
          <h1>Đăng ký</h1>
          <div className="formRegister">
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
                marginBottom: "15px",
              }}
            >
              {!password.value && password.isTouch
                ? "Mật khẩu của bạn phải chứa từ 4 đến 60 ký tự."
                : ""}
            </div>

            <input
              onChange={(e) => onType(e)}
              name="retypePassword"
              type={retypePassword.isShowPass ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              style={
                !retypePassword.value && retypePassword.isTouch
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
              {!retypePassword.value && retypePassword.isTouch
                ? "Mật khẩu của bạn phải chứa từ 4 đến 60 ký tự."
                : ""}
            </div>
          </div>
          <div className="btnSignin btnSignUp ">
            <input
              type="submit"
              value="Đăng ký"
              style={{
                backgroundColor: "#E50914",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={(e) => onSubmit(e)}
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
          </div>
          <div className="descirption">
            <p>
              Bạn đã tham gia Netflix?&nbsp;
              <span onClick={(e) => handleClickSingIn(e)}>Đăng nhập ngay</span>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
