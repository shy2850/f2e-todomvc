import { h, Component } from 'preact'
import { connect, getState } from '../store'
import actions from '../actions'
import TodoList, { TodoListProps } from './TodoList'
import TodoHeader from './TodoHeader'
import TodoTools from './TodoTools'
import Footer from './Footer'

class TodoApp extends Component<any, {}> {
    getNbActiveItems() {
        if (this.props.todos) {
            const activeItems = this.props.todos.filter(
                (item) => item.get('status') === 'active'
            )
            return activeItems.size
        }
        return 0
    }
    render() {
        return <div>
            <section className="todoapp">
                <TodoHeader addItem={this.props.addItem} />
                <TodoList {...this.props} />
                <TodoTools changeFilter={this.props.changeFilter}
                    filter={this.props.filter}
                    nbActiveItems={this.getNbActiveItems()}
                    clearCompleted={this.props.clearCompleted} />
            </section>
            <Footer />
        </div>
    }
};

function mapStateToProps() {
    const state = getState()
    return {
        todos: state.getIn(['todos']),
        filter: state.getIn(['filter']),
        ...actions
    }
}

export default connect(mapStateToProps)(TodoApp)