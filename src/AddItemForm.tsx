import { ChangeEvent, KeyboardEvent, useState } from 'react'

// 12:14 #6

type AddItemFormPropsType = {
	id: string
	addTask: (title: string, todolistId: string) => void
}
export function AddItemForm(props: AddItemFormPropsType) {
	let [title, setTitle] = useState('')
	let [error, setError] = useState<string | null>(null)

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.charCode === 13) {
			addTask()
		}
	}

	const addTask = () => {
		if (title.trim() !== '') {
			props.addTask(title.trim(), props.id)
			setTitle('') // очистка input после ввода:
		} else {
			setError('Field is required')
		}
	}

	return (
		<div>
			<input
				value={title}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				className={error ? 'error' : ''}
			/>
			<button onClick={addTask}>+</button>
			{error && <div className='error-message'>{error}</div>}
		</div>
	)
}
