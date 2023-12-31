import Button from '@mui/material/Button'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

type AddItemFormPropsType = {
	addItem: (title: string) => void
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
			props.addItem(title.trim())
			setTitle('') // очистка input после ввода:
		} else {
			setError('Field is required')
		}
	}

	return (
		<div>
			<h3>Input TodoList Title here</h3>
			<input
				value={title}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				className={error ? 'error' : ''}
			/>
			<Button onClick={addTask}>+</Button>
			{error && <div className='error-message'>{error}</div>}
		</div>
	)
}
