import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useHistory 대신 useNavigate로 수정
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { todoListState } from '../atom';

function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const todoList = useRecoilValue(todoListState);
  const setTodoList = useSetRecoilState(todoListState);
  const todo = todoList.find(todo => todo.id === parseInt(id));

  const [editedTodo, setEditedTodo] = useState({
    id: todo.id,
    title: todo.title,
    time: todo.time,
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEditedTodo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateTodo = () => {
    setTodoList(prevTodoList =>
      prevTodoList.map(item => (item.id === editedTodo.id ? editedTodo : item))
    );
    navigate('/'); // useNavigate를 이용한 리다이렉션
  };

  const handleDeleteTodo = () => {
    setTodoList(prevTodoList =>
      prevTodoList.filter(item => item.id !== editedTodo.id)
    );
    navigate('/'); // useNavigate를 이용한 리다이렉션
  };

  if (!todo) {
    return <div>Todo not found.</div>;
  }

  return (
    <div>
      <h2>Todo Detail</h2>
      <p>ID: {editedTodo.id}</p>
      <input
        type="text"
        name="title"
        value={editedTodo.title}
        onChange={handleInputChange}
      />
      <p>Time: {editedTodo.time.toLocaleString()}</p>
      <button onClick={handleUpdateTodo}>Update</button>
      <button onClick={handleDeleteTodo}>Delete</button>
    </div>
  );
}

export default TodoDetail;
