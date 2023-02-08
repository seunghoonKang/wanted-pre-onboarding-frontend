import axios from "axios";
import React, { useState } from "react";

const TodoList = ({ todo, todos, setTodos }) => {
  const token = window.localStorage.getItem("token");
  const [modify, setModify] = useState(false);
  const [todoContent, setTodoContent] = useState(todo.todo);

  const checkboxHandler = (id, isCompleted) => {
    axios
      .put(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        {
          todo: todoContent,
          isCompleted: !isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => console.log(res));
  };

  const modifyHandler = (id, isCompleted) => {
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
      .then((res) => console.log(res));
  };

  return (
    <div>
      <li>
        <input
          type="checkbox"
          onChange={() => checkboxHandler(todo.id, todo.isCompleted)}
        />
        {!modify ? (
          <>
            <span>{todo.todo}</span>
            <button
              data-testid="modify-button"
              onClick={() => setModify(!modify)}
            >
              수정
            </button>
            <button
              data-testid="delete-button"
              // onClick={() => deleteHandler(todo.id)}
            >
              삭제
            </button>
          </>
        ) : (
          <>
            <input
              value={todoContent}
              name="modifyContent"
              onChange={(e) => setTodoContent(e.target.value)}
            ></input>
            <button
              data-testid="submit-button"
              onClick={() => modifyHandler(todo.id, todo.isCompleted)}
            >
              제출
            </button>
            <button
              data-testid="cancel-button"
              //onClick={() => deleteHandler(todo.id)}
            >
              취소
            </button>
          </>
        )}
      </li>
    </div>
  );
};

export default TodoList;
