import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://pre-onboarding-selection-task.shop/auth/signin", {
        email: email,
        password: password,
      })
      .then(
        (res) => window.localStorage.setItem("token", res.data.access_token),
        alert("로그인되었습니다"),
        navigate("/todo")
      );
  };

  useEffect(() => {
    if (token) {
      alert("토큰이 있어 todo로 바로 갈게요");
      navigate("/todo");
    } else return;
  }, []);

  return (
    <div>
      <div>로그인</div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          placeholder="이메일 주소 입력"
          value={email}
          onChange={changeHandler}
          data-testid="email-input"
        />
        <input
          name="password"
          type="password"
          placeholder="패스워드 입력"
          value={password}
          onChange={changeHandler}
          data-testid="password-input"
        />
        <button type="submit" data-testid="signin-button">
          로그인하기
        </button>
      </form>
    </div>
  );
};

export default SignIn;
