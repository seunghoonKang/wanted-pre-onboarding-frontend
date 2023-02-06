import React, { useEffect, useState } from "react";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
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
    if (!email.includes("@") || password.length < 8) {
      setDisabled(true);
      alert("email에는 @가, 비밀번호는 8자리 이상이어야 해요!");
      //   setTimeout(() => {
      //     setDisabled(false);
      //   }, 2000);
    } else {
      alert("회원 가입 완료!");
    }
  };

  useEffect(() => {
    setDisabled(false);
  }, [email, password]);

  return (
    <div>
      <div>회원가입</div>
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
        <button type="submit" data-testid="signup-button" disabled={disabled}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Register;
