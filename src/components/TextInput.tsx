import { h, Component } from 'preact'

export interface TextInputProps {
    text?: string
    itemId?: number
    cancelEditing?: {
        (itemId: number): void
    }
    doneEditing?: {
        (itemId: number, value: string): void
    }
}
export default class TextInput extends Component<TextInputProps, { value: string }> {
    constructor(props) {
        super(props)
        this.state = { value: props.text }
    }

    cancelEditing = () => {
        this.setState({ value: this.props.text })
        return this.props.cancelEditing(this.props.itemId)
    }
    _handleKeyDown = (e) => {
        switch (e.key) {
            case 'Enter':
                return this.props.doneEditing(this.props.itemId, this.state.value)
            case 'Escape':
                return this.cancelEditing()
        }
    }
    _handleOnBlur = (e) => {
        return this.cancelEditing()
    }
    _handleOnChange = (e) => {
        this.setState({ value: e.target.value })
    }
    render() {
        return <input className="edit"
            autofocus
            value={this.state.value}
            onChange={this._handleOnChange}
            onKeyDown={this._handleKeyDown}
            onBlur={this._handleOnBlur}
        />
    }
}