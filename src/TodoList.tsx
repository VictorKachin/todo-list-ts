import { ChangeEvent } from 'react'
import { AddItemForm } from './AddItemForm'
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
	removeTask: (id: string, todolistId: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (
		taskId: string,
		isDone: boolean,
		todolistId: string
	) => void
	filter: FilterValuesType
	removeTodoList: (todolistId: string) => void
}

export function TodoList(props: PropsType) {
	const onAllClickHandler = () => {
		props.changeFilter('all', props.id)
	}

	const onActiveClickHandler = () => {
		props.changeFilter('active', props.id)
	}

	const onCompletedClickHandler = () => {
		props.changeFilter('completed', props.id)
	}

	const removeTodoList = () => {
		props.removeTodoList(props.id)
	}

	const addTask = (title: string) => {
		props.addTask(title, props.id)
	}

	return (
		<div>
			<h3>
				{props.title}
				<button onClick={removeTodoList}>X</button>
			</h3>
			<h5>{props.description}</h5>
			<AddItemForm addItem={addTask} />
			<ul>
				{props.tasks.map(t => {
					const onRemoveHandler = () => props.removeTask(t.id, props.id)
					const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
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
