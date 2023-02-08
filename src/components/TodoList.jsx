import React, { useState } from "react";

const TodoList = ({ todo, deleteHandler, checkboxHandler, modifyHandler }) => {
  const [modify, setModify] = useState(false);
  const [todoContent, setTodoContent] = useState(todo.todo);
  const [checked, setChecked] = useState(!todo.isCompleted);
  const cancelHandler = () => {
    setModify(!modify);
    setTodoContent(todo.todo);
  };
  return (
    <div>
      <li>
        {todo.isCompleted ? (
          <input
            type="checkbox"
            value={undefined || ""}
            onChange={() => {
              setChecked(!checked);
              checkboxHandler(todo.id, checked, todoContent);
            }}
            checked
          />
        ) : (
          <input
            type="checkbox"
            value={undefined || ""}
            onChange={() => {
              setChecked(!checked);
              checkboxHandler(todo.id, checked, todoContent);
            }}
          />
        )}

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
              onClick={() => deleteHandler(todo.id)}
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
              data-testid="modify-input"
            ></input>
            <button
              data-testid="submit-button"
              onClick={() => {
                modifyHandler(todo.id, todo.isCompleted, todoContent);
                setModify(!modify);
              }}
            >
              제출
            </button>
            <button data-testid="cancel-button" onClick={cancelHandler}>
              취소
            </button>
          </>
        )}
      </li>
    </div>
  );
};

export default TodoList;
