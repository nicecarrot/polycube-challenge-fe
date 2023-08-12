import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/:id" element={<TodoDetail />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
