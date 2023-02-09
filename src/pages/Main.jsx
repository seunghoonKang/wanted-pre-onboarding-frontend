import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Main = () => {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/signup");
  };

  const goToSignIn = () => {
    navigate("/signin");
  };

  return (
    <WrapContainer>
      <GoSomewhereContainer onClick={goToSignUp}>
        회원가입하기
      </GoSomewhereContainer>
      <GoSomewhereContainer onClick={goToSignIn}>
        로그인하기
      </GoSomewhereContainer>
    </WrapContainer>
  );
};

const WrapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100vh;
`;

const GoSomewhereContainer = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    background-color: #554e4e;
    color: #ffffffc8;
  }
`;

export default Main;
