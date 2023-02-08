import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "../components/TodoList";

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

  const deleteHandler = (id) => {
    axios.delete(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  console.log(todos);

  const checkboxHandler = (id, checked, todoContent) => {
    axios.put(
      `https://pre-onboarding-selection-task.shop/todos/${id}`,
      {
        todo: todoContent,
        isCompleted: checked,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTodos(
      todos.map((todo) =>
        todo.isCompleted !== checked && todo.id === id
          ? { ...todo, isCompleted: checked }
          : todo
      )
    );
  };

  const modifyHandler = (id, isCompleted, todoContent) => {
    axios
      .put(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        {
          todo: todoContent,
          isCompleted: isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
