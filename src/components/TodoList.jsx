import React, { useState } from "react";

const TodoList = ({
  todo,
  todos,
  setTodos,
  deleteHandler,
  checkboxHandler,
  modifyHandler,
}) => {
  const [modify, setModify] = useState(false);
  const [todoContent, setTodoContent] = useState(todo.todo);
  const cancelHandler = () => {
    setModify(!modify);
    setTodoContent(todo.todo);
  };
  return (
    <div>
      <li>
        <input
          type="checkbox"
          onChange={() =>
            checkboxHandler(todo.id, todo.isCompleted, todoContent)
          }
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
            ></input>
            <button
              data-testid="submit-button"
              onClick={() =>
                modifyHandler(todo.id, todo.isCompleted, todoContent)
              }
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
