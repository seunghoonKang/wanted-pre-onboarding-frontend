import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authInstance } from "../api/api";
import TodoList from "../components/TodoList";

const Todo = () => {
  const token = window.localStorage.getItem("token");

  const [addTodo, setAddTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  const getTodos = async () => {
    await authInstance.get(`todos`).then((res) => setTodos(res.data));
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

  const addTodos = async () => {
    await authInstance
      .post("/todos", { todo: addTodo })
      .then((res) => setTodos([...todos, res.data]));
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    addTodos();
    setAddTodo("");
  };

  const deleteHandler = (id) => {
    authInstance.delete(`todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  console.log(todos);

  const checkboxHandler = (id, checked, todoContent) => {
    authInstance.put(`todos/${id}`, {
      todo: todoContent,
      isCompleted: checked,
    });
    setTodos(
      todos.map((todo) =>
        todo.isCompleted !== checked && todo.id === id
          ? { ...todo, isCompleted: checked }
          : todo
      )
    );
  };

  const modifyHandler = (id, isCompleted, todoContent) => {
    authInstance
      .put(`todos/${id}`, {
        todo: todoContent,
        isCompleted: isCompleted,
      })
      .then((res) =>
        setTodos(
          todos.map((todo) =>
            todo.id === res.data.id ? { ...todo, todo: res.data.todo } : todo
          )
        )
      );
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

      <ul>
        {todos?.map((todo) => (
          <div key={todo.id}>
            <TodoList
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              deleteHandler={deleteHandler}
              checkboxHandler={checkboxHandler}
              modifyHandler={modifyHandler}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
