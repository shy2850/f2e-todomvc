import { Map } from 'immutable'
import { dispatch } from './store'

function findItemIndex(state, itemId) {
    return state.get('todos').findIndex(
        (item) => item.get('id') === itemId
    )
}

function toggleComplete(state, itemId) {
    const itemIndex = findItemIndex(state, itemId)
    const updatedItem = state.get('todos')
        .get(itemIndex)
        .update('status', status => status === 'active' ? 'completed' : 'active')

    return state.update('todos', todos => todos.set(itemIndex, updatedItem))
}

function changeFilter(state, filter) {
    return state.set('filter', filter)
}

function editItem(state, itemId) {
    const itemIndex = findItemIndex(state, itemId)
    const updatedItem = state.get('todos')
        .get(itemIndex)
        .set('editing', true)

    return state.update('todos', todos => todos.set(itemIndex, updatedItem))
}

function cancelEditing(state, itemId) {
    const itemIndex = findItemIndex(state, itemId)
    const updatedItem = state.get('todos')
        .get(itemIndex)
        .set('editing', false)

    return state.update('todos', todos => todos.set(itemIndex, updatedItem))
}

function doneEditing(state, itemId, newText) {
    const itemIndex = findItemIndex(state, itemId)
    const updatedItem = state.get('todos')
        .get(itemIndex)
        .set('editing', false)
        .set('text', newText)

    return state.update('todos', todos => todos.set(itemIndex, updatedItem))
}

function clearCompleted(state) {
    return state.update('todos',
        (todos) => todos.filterNot(
            (item) => item.get('status') === 'completed'
        )
    )
}

function addItem(state, text) {
    const itemId = state.get('todos').reduce((maxId, item) => Math.max(maxId, item.get('id')), 0) + 1
    const newItem = Map({ id: itemId, text: text, status: 'active' })
    return state.update('todos', (todos) => todos.push(newItem))
}

function deleteItem(state, itemId) {
    return state.update('todos',
        (todos) => todos.filterNot(
            (item) => item.get('id') === itemId
        )
    )
}

const createAction = (map: {[x:string]: Function}) => {
    Object.keys(map).map(x => {
        let fn = map[x]
        map[x] = (...args) => dispatch(state => fn.apply(null, [state].concat(args)))
    })
    return map
}
export default createAction({
    toggleComplete,
    changeFilter,
    editItem,
    doneEditing,
    cancelEditing,
    clearCompleted,
    deleteItem,
    addItem
})