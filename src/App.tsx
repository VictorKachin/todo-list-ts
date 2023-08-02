import { useState } from 'react'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm'
import './App.css'
import { TaskType, TodoList } from './TodoList'

// тип (type) назвали сами:
export type FilterValuesType = 'all' | 'completed' | 'active'

type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

type TaskStateType = {
	[key: string]: Array<TaskType>
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

	let todolistId1 = v1()
	let todolistId2 = v1()

	let [tasksObj, setTasks] = useState<TaskStateType>({
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

	let [todolists, setTodolists] = useState<Array<TodolistType>>([
		{ id: todolistId1, title: 'What to learn?', filter: 'all' },
		{ id: todolistId2, title: 'What to buy?', filter: 'all' },
	])

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
		// достаём нудный массив по todolistId
		let tasks = tasksObj[todolistId]
		// найдём нужную таску
		let task = tasks.find(t => t.id === taskId)
		// изменим таску, если она нашлась
		if (task) {
			task.isDone = isDone
			// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
			setTasks({ ...tasksObj })
		}
	}

	function changeTaskTitle(
		taskId: string,
		newTitle: string,
		todolistId: string
	) {
		// достаём нудный массив по todolistId
		let tasks = tasksObj[todolistId]
		// найдём нужную таску
		let task = tasks.find(t => t.id === taskId)
		// изменим таску, если она нашлась
		if (task) {
			task.title = newTitle
			// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
			setTasks({ ...tasksObj })
		}
	}

	function changeFilter(value: FilterValuesType, todolistId: string) {
		let todolist = todolists.find(tl => tl.id === todolistId)
		if (todolist) {
			todolist.filter = value
			setTodolists([...todolists])
		}
	}

	let removeTodoList = (todolistId: string) => {
		let filteredTodoList = todolists.filter(tl => tl.id !== todolistId)
		setTodolists(filteredTodoList)
		delete tasksObj[todolistId]
		setTasks({ ...tasksObj })
	}

	function changeTodoListTitle(id: string, newTitle: string) {
		const todolist = todolists.find(tl => tl.id === id)
		if (todolist) {
			todolist.title = newTitle
			setTodolists([...todolists])
		}
	}

	function addTodoList(title: string) {
		let newTodoListId = v1()
		let newTodoList: TodolistType = {
			id: newTodoListId,
			filter: 'all',
			title: title,
		}
		setTodolists([newTodoList, ...todolists])
		setTasks({
			...tasksObj,
			[newTodoListId]: [],
		})
	}

	return (
		<div className={'App'}>
			<AddItemForm addItem={addTodoList} />
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
						changeTaskTitle={changeTaskTitle}
						filter={tl.filter}
						removeTodoList={removeTodoList}
						changeTodoListTitle={changeTodoListTitle}
					/>
				)
			})}
		</div>
	)
}

export default App
