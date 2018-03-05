import { h, Component } from 'preact'

export interface TodoHeaderProps {
    addItem: {
        (item: string): void
    }
}

export default class TodoHeader extends Component<TodoHeaderProps, {}> {
    addTodoInput: HTMLInputElement
    _handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && this.addTodoInput.value !== '') {
            const itemText = this.addTodoInput.value
            this.addTodoInput.value = ''
            return this.props.addItem(itemText)
        }
    }
    _initInput = (input) => {
        this.addTodoInput = input
    }
    render() {
        return <header className="header">
            <h1>todos</h1>
            <input className="new-todo"
                ref={this._initInput}
                autofocus
                autocomplete="off"
                placeholder="What needs to be done?"
                onKeyPress={this._handleKeyPress} />
        </header>
    }
};