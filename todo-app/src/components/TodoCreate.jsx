import React, { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState } from '../atom';
import '../styles/main.css';

const TodoCreate = () => {
  /** Todo Title Input */
  const titleRef = useRef();
  const setTodoList = useSetRecoilState(todoListState);

  /** Create 이벤트 발생 시에만 atom변경 */
  const handleCreateTodo = () => {
    const title = titleRef.current.value;
    if (title) {
      setTodoList((prevTodoList) => [
        ...prevTodoList,
        {
          id: prevTodoList.length + 1,
          title,
          time: new Date(),
        },
      ]);
      titleRef.current.value = '';
    }
  };

  return (
    <div className="create_container">
      <h1>새로운 할 일 만들기</h1>
      <input type="text" ref={titleRef} />
      <div className="rightsort_container">
        <button onClick={handleCreateTodo}>등록</button>
      </div>
    </div>
  );
};

export default TodoCreate;
