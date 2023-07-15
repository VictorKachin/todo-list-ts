import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValuesType } from './App'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	title: string
	description: string
	tasks: Array<TaskType> // tasks: TaskType[],
	removeTask: (id: string) => void
	changeFilter: (value: FilterValuesType) => void
	addTask: (title: string) => void
	changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export function TodoList(props: PropsType) {
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.ctrlKey && e.charCode === 13) {
			props.addTask(newTaskTitle)
			setNewTaskTitle('') // очистка input после ввода:
		}
	}
	// 50:00
	const addTask = () => {
		if (newTaskTitle.trim() !== '') {
			props.addTask(newTaskTitle.trim())
			setNewTaskTitle('') // очистка input после ввода:
		} else {
			setError('Field is required')
		}
	}

	const onAllClickHandler = () => {
		props.changeFilter('all')
	}

	const onActiveClickHandler = () => {
		props.changeFilter('active')
	}

	const onCompletedClickHandler = () => {
		props.changeFilter('completed')
	}

	return (
		<div>
			<h3>{props.title}</h3>
			<h5>{props.description}</h5>
			<div>
				<input
					value={newTaskTitle}
					onChange={onNewTitleChangeHandler}
					onKeyPress={onKeyPressHandler}
					className={error ? 'error' : ''}
				/>
				<button onClick={addTask}>+</button>
				{error && <div className='error-message'>{error}</div>}
			</div>

			<ul>
				{props.tasks.map(t => {
					const onRemoveHandler = () => props.removeTask(t.id)
					const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						props.changeTaskStatus(t.id, e.currentTarget.checked)
					}

					return (
						<li key={t.id}>
							<input
								type='checkbox'
								onChange={onChangeHandler}
								checked={t.isDone}
							/>
							<span>{t.title}</span>
							<button onClick={onRemoveHandler}>x</button>
						</li>
					)
				})}
			</ul>

			<div>
				<button onClick={onAllClickHandler}>All</button>
				<button onClick={onActiveClickHandler}>Active</button>
				<button onClick={onCompletedClickHandler}>Completed</button>
			</div>
		</div>
	)
}
