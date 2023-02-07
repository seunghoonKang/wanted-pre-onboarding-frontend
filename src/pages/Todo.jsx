import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const token = window.localStorage.getItem("token");
  const [addTodo, setAddTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const getTodos = async () => {
    await axios
      .get("https://pre-onboarding-selection-task.shop/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTodos(res.data));
  };

  useEffect(() => {
    if (!token) navigate("/signin");
  }, []);

  useEffect(() => {
    getTodos();
  }, []);

  const changeHandler = (e) => {
    setAddTodo(e.target.value);
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://pre-onboarding-selection-task.shop/todos",
        { todo: addTodo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setTodos([...todos, res.data]);
      });
    setAddTodo("");
  };

  return (
    <div>
      <input
        data-testid="new-todo-input"
        name="addTodo"
        onChange={changeHandler}
        type="text"
        value={addTodo}
      />
      <button onClick={onClickHandler} data-testid="new-todo-add-button">
        추가
      </button>

      <ol>
        {todos?.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" />
            <span>{todo.todo}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Todo;
