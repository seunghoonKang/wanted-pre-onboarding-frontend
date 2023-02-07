import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/signin");
  }, []);
  return <div>Todo</div>;
};

export default Todo;
