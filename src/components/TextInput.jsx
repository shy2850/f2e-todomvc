import * as React from 'react'

export default class TextInput extends React.Component {
    constructor (props) {
        super(props)
        this.state = {value: props.text}
    }

    cancelEditing () {
        this.setState({'value': this.props.text})
        return this.props.cancelEditing(this.props.itemId)
    }
    _handleKeyDown (e) {
        switch (e.key) {
        case 'Enter':
            return this.props.doneEditing(this.props.itemId, this.state.value)
        case 'Escape':
            return this.cancelEditing()
        }
    }
    _handleOnBlur (e) {
        return this.cancelEditing()
    }
    _handleOnChange (e) {
        this.setState({value: e.target.value})
    }
    render () {
        return <input className="edit"
            autoFocus
            value={this.state.value}
            onChange={this._handleOnChange.bind(this)}
            type="text"
            ref="itemInput"
            onKeyDown={this._handleKeyDown.bind(this)}
            onBlur={this._handleOnBlur.bind(this)}
        />
    }
};
