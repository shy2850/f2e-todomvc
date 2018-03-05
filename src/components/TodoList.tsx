import { h, Component } from 'preact'
import TodoItem, { TodoItemProps } from './TodoItem'
import { List } from 'immutable'

export interface TodoListProps extends TodoItemProps{
    todos?: List<any>
    filter?: string
}
export default class TodoList extends Component<TodoListProps, {}> {
    getItems = () => {
        if (this.props.todos) {
            return this.props.todos.filter(
                (item) => this.props.filter === 'all' ||
                    item.get('status') === this.props.filter
            ).toArray()
        }
        return []
    }
    isCompleted(item) {
        return item.get('status') === 'completed'
    }
    render() {
        return <section className="main">
            <ul className="todo-list">
                {this.getItems().map(item => <li><TodoItem key={item.get('text')}
                    text={item.get('text')}
                    id={item.get('id')}
                    isCompleted={this.isCompleted(item)}
                    isEditing={item.get('editing')}
                    doneEditing={this.props.doneEditing}
                    cancelEditing={this.props.cancelEditing}
                    toggleComplete={this.props.toggleComplete}
                    deleteItem={this.props.deleteItem}
                    editItem={this.props.editItem} /></li>)}
            </ul>
        </section>
    }
};