import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { todoListState } from '../atom';
import '../styles/main.css';

function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const todoList = useRecoilValue(todoListState);
  const setTodoList = useSetRecoilState(todoListState);
  const todo = todoList.find((todo) => todo.id === parseInt(id));

  const [editedTodo, setEditedTodo] = useState({
    id: todo.id,
    title: todo.title,
    description: todo.description || '',
    time: todo.time,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateTodo = () => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((item) =>
        item.id === editedTodo.id ? editedTodo : item
      )
    );
    navigate('/');
  };

  const handleDeleteTodo = () => {
    setTodoList((prevTodoList) =>
      prevTodoList.filter((item) => item.id !== editedTodo.id)
    );
    navigate('/');
  };

  /** 잘못된 ID 접근 시 not found return*/
  if (!todo) {
    return <div>Todo not found.</div>;
  }

  return (
    <div className="todo-detail-container">
      <h1>Todo Detail</h1>
      <p>ID: {editedTodo.id}</p>
      Title:
      <input
        type="text"
        name="title"
        value={editedTodo.title}
        onChange={handleInputChange}
      />
      Description:
      <input
        type="text"
        name="description"
        value={editedTodo.description}
        onChange={handleInputChange}
      />
      <p>Time: {editedTodo.time.toLocaleString()}</p>
      <div className="button_container">
        <button onClick={handleUpdateTodo}>Update</button>
        <button onClick={handleDeleteTodo}>Delete</button>
      </div>
    </div>
  );
}

export default TodoDetail;
