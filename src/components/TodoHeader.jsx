import * as React from 'react'

export default class TodoHeader extends React.Component {
    _handleKeyPress (e) {
        if (e.key === 'Enter' && this.refs.addTodoInput.value !== '') {
            const itemText = this.refs.addTodoInput.value
            this.refs.addTodoInput.value = ''
            return this.props.addItem(itemText)
        }
    }
    render () {
        return <header className="header">
            <h1>todos</h1>
            <input className="new-todo"
                ref="addTodoInput"
                autoFocus
                autoComplete="off"
                placeholder="What needs to be done?"
                onKeyPress = {this._handleKeyPress.bind(this)} />
        </header>
    }
};
