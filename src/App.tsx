import React from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';

const App = () => {

let tasks1: Array<TaskType> = [
  {id: 1, title: 'HTML&CSS', isDone: true},
  {id: 2, title: 'JS', isDone: true},
  {id: 3, title: 'React.js', isDone: false},
]

let tasks2: Array<TaskType> = [
  {id: 1, title: 'Milk', isDone: false},
  {id: 2, title: 'Broad', isDone: true},
  {id: 3, title: 'Butter', isDone: true},
]

  return (
    <div className="App">
      <TodoList title='What to learn?' tasks={tasks1}/>
      <TodoList title='What to buy?' tasks={tasks2}/>
    </div>
  );
}

export default App;
