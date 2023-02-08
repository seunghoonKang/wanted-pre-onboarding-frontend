import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "../components/TodoList";

const Todo = () => {
  const token = window.localStorage.getItem("token");
  const [checked, setChecked] = useState(false);
  const [addTodo, setAddTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [modify, setModify] = useState(false);
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

  const modifyHandler = (id) => {
    setModify(!modify);
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
            <TodoList todo={todo} todos={todos} setTodos={setTodos} />
          </div>
          // <li key={todo.id}>
          //   <input
          //     type="checkbox"
          //     onChange={() =>
          //       checkboxHandler(todo.id, todo.todo, todo.isCompleted)
          //     }
          //   />
          //   {!modify ? (
          //     <>
          //       <span>{todo.todo}</span>
          //       <button data-testid="modify-button" onClick={modifyHandler}>
          //         수정
          //       </button>
          //       <button
          //         data-testid="delete-button"
          //         onClick={() => deleteHandler(todo.id)}
          //       >
          //         삭제
          //       </button>
          //     </>
          //   ) : (
          //     <>
          //       <input />
          //       <button
          //         data-testid="submit-button"
          //         //onClick={() => modifyHandler(todo.id)}
          //       >
          //         제출
          //       </button>
          //       <button
          //         data-testid="cancel-button"
          //         //onClick={() => deleteHandler(todo.id)}
          //       >
          //         취소
          //       </button>
          //     </>
          //   )}
          // </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
