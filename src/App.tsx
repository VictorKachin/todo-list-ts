import { useState } from 'react'
import { v1 } from 'uuid'
import './App.css'
import { TaskType, TodoList } from './TodoList'

// тип (type) назвали сами:
export type FilterValuesType = 'all' | 'completed' | 'active'

type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

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

	// console.log(tasks)

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

	function changeStatus(taskId: string, isDone: boolean) {
		let task = tasks.find(t => t.id === taskId)
		if (task) {
			task.isDone = isDone
		}

		setTasks([...tasks])
	}

	function changeFilter(value: FilterValuesType, todolistId: string) {
		let todolist = todolists.find(tl => tl.id === todolistId)
		if (todolist) {
			todolist.filter = value
			setTodolist([...todolists])
		}
	}

	let todolistId1 = v1()
	let todolistId2 = v1()

	let [todolists, setTodolist] = useState<Array<TodolistType>>([
		{ id: todolistId1, title: 'What to learn?', filter: 'active' },
		{ id: todolistId2, title: 'What to buy?', filter: 'completed' },
	])

	let [allTasks, setAllTasks] = useState({
		todolistId1: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'React.js', isDone: false },
			{ id: v1(), title: 'Redux', isDone: false },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
		todolistId2: [
			{ id: v1(), title: 'Oil', isDone: true },
			{ id: v1(), title: 'Milk', isDone: true },
			{ id: v1(), title: 'Bread', isDone: false },
			{ id: v1(), title: 'Meat', isDone: false },
			{ id: v1(), title: 'Eggs', isDone: false },
		],
	})
	// 35:24 #05

	return (
		<div className={'App'}>
			{' '}
			{todolists.map(tl => {
				let tasksForTodoList = tasks

				if (tl.filter === 'completed') {
					tasksForTodoList = tasks.filter(t => t.isDone)
				}
				if (tl.filter === 'active') {
					tasksForTodoList = tasks.filter(t => !t.isDone)
				}

				return (
					<TodoList
						key={tl.id}
						id={tl.id}
						title={tl.title}
						description='Press Ctrl+Enter to add new task'
						tasks={tasksForTodoList}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeStatus}
						filter={tl.filter}
					/>
				)
			})}
		</div>
	)
}

export default App
