import React, { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState } from '../atom';
import styles from '../styles/main.css'

const TodoCreate = () => {
  /** Todo Title Input */
  const titleRef = useRef();
  const setTodoList = useSetRecoilState(todoListState);

  /** Create 이벤트 발생 시에만 atom변경 */
  const handleCreateTodo = () => {
    const title = titleRef.current.value;
    if (title) {
      setTodoList(prevTodoList => [
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
    <div className={styles.create_container}>
      <h2>New Todo Create</h2>
      <input type="text" ref={titleRef} />
      <button onClick={handleCreateTodo}>저장</button>
    </div>
  );
}

export default TodoCreate;
