import { useState } from 'react'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm'
import './App.css'
import { TodoList } from './TodoList'

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

	function removeTask(id: string, todolistId: string) {
		let tasks = tasksObj[todolistId]
		let filteredTasks = tasks.filter(t => t.id !== id)
		tasksObj[todolistId] = filteredTasks
		setTasks({ ...tasksObj })
	}

	function addTask(title: string, todolistId: string) {
		let task = {
			id: v1(),
			title: title,
			isDone: false,
		}
		let tasks = tasksObj[todolistId]
		let newTasks = [task, ...tasks]
		tasksObj[todolistId] = newTasks
		setTasks({ ...tasksObj })
	}

	function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
		let tasks = tasksObj[todolistId]

		let task = tasks.find(t => t.id === taskId)
		if (task) {
			task.isDone = isDone
			setTasks({ ...tasksObj })
		}
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

	let removeTodoList = (todolistId: string) => {
		let filteredTodoList = todolists.filter(tl => tl.id !== todolistId)
		setTodolist(filteredTodoList)
		delete tasksObj[todolistId]
		setTasks({ ...tasksObj })
	}

	let [tasksObj, setTasks] = useState({
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'React.js', isDone: false },
			{ id: v1(), title: 'Redux', isDone: false },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
		[todolistId2]: [
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
			<AddItemForm id={'props.id'} addTask={() => {}} />
			{todolists.map(tl => {
				let tasksForTodoList = tasksObj[tl.id]

				if (tl.filter === 'completed') {
					tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
				}
				if (tl.filter === 'active') {
					tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
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
						removeTodoList={removeTodoList}
					/>
				)
			})}
		</div>
	)
}

export default App
