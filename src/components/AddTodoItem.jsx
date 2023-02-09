import React from "react";

const AddTodoItem = ({ addTodo, setAddTodo, addTodos }) => {
  const changeHandler = (e) => {
    setAddTodo(e.target.value);
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    addTodos();
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
    </div>
  );
};

export default AddTodoItem;
