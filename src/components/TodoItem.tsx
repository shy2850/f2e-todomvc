import { h, Component } from 'preact'
import TextInput from './TextInput'
import classNames from '../classNames'

export interface TodoItemProps {
    key?: string
    id?: number
    text?: string
    isCompleted?: boolean
    isEditing?: boolean
    editItem?: {
        (id: number): void
    }
    deleteItem?: {
        (id: number): void
    }
    toggleComplete?: {
        (id: number): void
    }
    cancelEditing?: {
        (id: number): void
    }
    doneEditing?: {
        (id: number): void
    }
}
export default function (props: TodoItemProps) {
    var itemClass = classNames({
        'todo': true,
        'completed': props.isCompleted,
        'editing': props.isEditing
    })
    return <li className={itemClass}>
        <div className="view">
            <input type="checkbox"
                className="toggle"
                checked={props.isCompleted}
                onClick={() => this.props.toggleComplete(props.id)} />
            <label onDblClick={() => props.editItem(props.id)}>
                {props.text}
            </label>
            <button className="destroy" onClick={() => props.deleteItem(props.id)}>
            </button>
        </div>
        <TextInput text={props.text}
            itemId={props.id}
            cancelEditing={props.cancelEditing}
            doneEditing={props.doneEditing} />
    </li>
}