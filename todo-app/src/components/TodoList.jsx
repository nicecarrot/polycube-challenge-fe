import React, { useState, useEffect } from 'react';
import { useRecoilValue} from 'recoil';
import { todoListState } from '../atom';
import TodoItem from './TodoItem';
import TodoCreate from './TodoCreate';
import '../styles/main.css'

const TodoList = () => {
  /** atom에서 가져온 todolist */
  const todoList = useRecoilValue(todoListState);
  const [filterOption, setFilterOption] = useState('newest');
  const [sortedList, setSortedList] = useState([]); // 필터로 정렬된 list 배열

  useEffect(() => {
    // To-Do 목록을 시간 기준으로 정렬
    const sortedList = todoList.slice().sort((a, b) => {
      if (filterOption === 'newest') {
        return b.time - a.time;
      } else if (filterOption === 'oldest') {
        return a.time - b.time;
      }
      return 0;
    });

    setSortedList(sortedList); // 정렬된 목록을 상태에 설정
  }, [todoList, filterOption]); // todoList와 filterOption이 변경될 때마다 실행

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  return (
    <div className={"todo_container"}>
      <h1>Todo List</h1>
      
      <TodoCreate />
      <select value={filterOption} onChange={handleFilterChange}>
        <option value="newest">최신순</option>
        <option value="oldest">오래된 순</option>
      </select>
      <div className="todo_list">
        {sortedList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
