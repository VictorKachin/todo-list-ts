import { useState } from 'react'
import { v1 } from 'uuid'
import './App.css'
import { TaskType, TodoList } from './TodoList'

// тип (type) назвали сами:
export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
	// let initTasks: Array<TaskType> = [
	//   {id: 1, title: 'HTML&CSS', isDone: true},
	//   {id: 2, title: 'JS', isDone: true},
	//   {id: 3, title: 'React.js', isDone: false},
	//   {id: 4, title: 'Redux', isDone: false},
	// ]

	// Разобрали useState по полочкам:
	// 50:30 https://www.youtube.com/watch?v=an32Q6yqqfY&list=PLcvhF2Wqh7DOFHUukzl5g4BP_Bbn6oM00&index=2&t=1222s
	// как работает useState внутри
	// export function Counter() {
	// let arr = useState(5);
	// let data = arr[0];
	// let setData = arr[1];
	// return <div omClick{ () => { setData(data + 1) } }>{data}</div>
	// }
	// 1:00:00

	let [tasks, setTasks] = useState<Array<TaskType>>([
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

	let [filter, setFilter] = useState<FilterValuesType>('all')

	let tasksForTodoList = tasks

	if (filter === 'completed') {
		tasksForTodoList = tasks.filter(t => t.isDone)
	}
	if (filter === 'active') {
		tasksForTodoList = tasks.filter(t => !t.isDone)
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
