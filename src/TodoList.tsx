import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValuesType } from './App'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	description: string
	tasks: Array<TaskType> // tasks: TaskType[],
	removeTask: (id: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	addTask: (title: string) => void
	changeTaskStatus: (taskId: string, isDone: boolean) => void
	filter: FilterValuesType
}

export function TodoList(props: PropsType) {
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const addTask = () => {
		if (newTaskTitle.trim() !== '') {
			props.addTask(newTaskTitle.trim())
			setNewTaskTitle('') // очистка input после ввода:
		} else {
			setError('Field is required')
		}
	}

	const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.charCode === 13) {
			addTask()
		}
	}

	const onAllClickHandler = () => {
		props.changeFilter('all', props.id)
	}

	const onActiveClickHandler = () => {
		props.changeFilter('active', props.id)
	}

	const onCompletedClickHandler = () => {
		props.changeFilter('completed', props.id)
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
						<li key={t.id} className={t.isDone ? 'is-done' : ''}>
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
				<button
					className={props.filter === 'all' ? 'active-filter' : ''}
					onClick={onAllClickHandler}
				>
					All
				</button>
				<button
					className={props.filter === 'active' ? 'active-filter' : ' '}
					onClick={onActiveClickHandler}
				>
					Active
				</button>
				<button
					className={props.filter === 'completed' ? 'active-filter' : ''}
					onClick={onCompletedClickHandler}
				>
					Completed
				</button>
			</div>
		</div>
	)
}
