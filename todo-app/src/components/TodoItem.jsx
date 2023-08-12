import React from 'react';
import { Link } from 'react-router-dom';

const TodoItem = ({ todo }) => {
  return (
    <div>
      <Link to={`/${todo.id}`}>
        <h3>{todo.title}</h3>
      </Link>
      <p>작성일: {todo.time.toLocaleString('ko-KR', { timeZone: 'UTC' })}</p>
    </div>
  );
};

export default TodoItem;
