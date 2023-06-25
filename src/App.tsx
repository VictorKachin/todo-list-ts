import { useState } from 'react'
import { v1 } from 'uuid'
import './App.css'
import { TodoList } from './TodoList'

export type FilterValuesType = 'all' | 'completed' | 'active'

const App = () => {
	// let initTasks: Array<TaskType> = [
	//   {id: 1, title: 'HTML&CSS', isDone: true},
	//   {id: 2, title: 'JS', isDone: true},
	//   {id: 3, title: 'React.js', isDone: false},
	//   {id: 4, title: 'Redux', isDone: false},
	// ]

	// Разобрали useState по полочкам:
	// let arr = useState(initTasks);
	// let tasks = arr[0];
	// let setTasks = arr[1];

	// let [tasks, setTasks] = useState(initTasks);

	const [tasks, setTasks] = useState([
		{ id: v1(), title: 'HTML&CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'React.js', isDone: false },
		{ id: v1(), title: 'Redux', isDone: false },
		{ id: v1(), title: 'GraphQL', isDone: false },
	])

	console.log(tasks)

	function removeTask(id: string) {
		let filteredTasks = tasks.filter(t => t.id !== id)
		setTasks(filteredTasks)
	}

	function addTask(title: string) {
		let newTask = {
			id: v1(),
			title: title,
			isDone: false,
		}
		let newTasks = [newTask, ...tasks]
		setTasks(newTasks)
	}

	const [filter, setFilter] = useState<FilterValuesType>('all')

	let tasksForTodoList = tasks

	if (filter === 'completed') {
		tasksForTodoList = tasks.filter(t => t.isDone === true)
	}
	if (filter === 'active') {
		tasksForTodoList = tasks.filter(t => t.isDone === false)
	}

	function changeFilter(value: FilterValuesType) {
		setFilter(value)
	}

	return (
		<div className='App'>
			<TodoList
				title='What to learn?'
				tasks={tasksForTodoList}
				removeTask={removeTask}
				changeFilter={changeFilter}
				addTask={addTask}
			/>
		</div>
	)
}

export default App
