import React, { useState } from "react";

const Register = () => {
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
    console.log(email, password);
  };
  return (
    <div>
      <div>회원가입</div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="이메일 주소 입력"
          value={email}
          onChange={changeHandler}
        />
        <input
          name="password"
          type="password"
          placeholder="패스워드 입력"
          value={password}
          onChange={changeHandler}
          min={8}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Register;
