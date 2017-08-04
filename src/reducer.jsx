import {Map} from 'immutable'

function findItemIndex (state, itemId) {
    return state.get('todos').findIndex(
        (item) => item.get('id') === itemId
    )
}

function toggleComplete (state, itemId) {
    const itemIndex = findItemIndex(state, itemId)
    const updatedItem = state.get('todos')
        .get(itemIndex)
        .update('status', status => status === 'active' ? 'completed' : 'active')

    return state.update('todos', todos => todos.set(itemIndex, updatedItem))
}

function changeFilter (state, filter) {
    return state.set('filter', filter)
}

function editItem (state, itemId) {
    const itemIndex = findItemIndex(state, itemId)
    const updatedItem = state.get('todos')
        .get(itemIndex)
        .set('editing', true)

    return state.update('todos', todos => todos.set(itemIndex, updatedItem))
}

function cancelEditing (state, itemId) {
    const itemIndex = findItemIndex(state, itemId)
    const updatedItem = state.get('todos')
        .get(itemIndex)
        .set('editing', false)

    return state.update('todos', todos => todos.set(itemIndex, updatedItem))
}

function doneEditing (state, itemId, newText) {
    const itemIndex = findItemIndex(state, itemId)
    const updatedItem = state.get('todos')
        .get(itemIndex)
        .set('editing', false)
        .set('text', newText)

    return state.update('todos', todos => todos.set(itemIndex, updatedItem))
}

function clearCompleted (state) {
    return state.update('todos',
        (todos) => todos.filterNot(
            (item) => item.get('status') === 'completed'
        )
    )
}

function addItem (state, text) {
    const itemId = state.get('todos').reduce((maxId, item) => Math.max(maxId, item.get('id')), 0) + 1
    const newItem = Map({id: itemId, text: text, status: 'active'})
    return state.update('todos', (todos) => todos.push(newItem))
}

function deleteItem (state, itemId) {
    return state.update('todos',
        (todos) => todos.filterNot(
            (item) => item.get('id') === itemId
        )
    )
}

const STORAGE_KEY = '_STORAGE_KEY_'
const {
    history,
    location: {
        pathname,
        search
    },
    localStorage,
    document: {
        title
    }
} = window
export const CHANGE_FILTER = 'CHANGE_FILTER'
export const routerMiddleware = () => next => action => {
    switch (action.type) {
    case CHANGE_FILTER:
        if (!action.filter) {
            let filter = search.match(/\?filter=(\w+)/)
            action.filter = filter ? filter[1] : 'all'
        }
        history.pushState(null, title, pathname + `?filter=${action.filter}`)
    }
    return next(action)
}
export const storeMiddleware = ({getState}) => next => action => {
    setTimeout(function () {
        let state = getState()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.get('todos').toJS()))
    }, 0)
    return next(action)
}
const store = localStorage.getItem(STORAGE_KEY) || JSON.stringify([
    {id: 1, text: 'React', status: 'active', editing: false},
    {id: 2, text: 'Redux', status: 'active', editing: false},
    {id: 3, text: 'Immutable', status: 'active', editing: false}
])
const initState = Map().merge({
    todos: JSON.parse(store) || [],
    filter: 'all'
})
export default function (state = initState, action) {
    switch (action.type) {
    case 'TOGGLE_COMPLETE':
        return toggleComplete(state, action.itemId)
    case CHANGE_FILTER:
        return changeFilter(state, action.filter)
    case 'EDIT_ITEM':
        return editItem(state, action.itemId)
    case 'CANCEL_EDITING':
        return cancelEditing(state, action.itemId)
    case 'DONE_EDITING':
        return doneEditing(state, action.itemId, action.newText)
    case 'CLEAR_COMPLETED':
        return clearCompleted(state)
    case 'ADD_ITEM':
        return addItem(state, action.text)
    case 'DELETE_ITEM':
        return deleteItem(state, action.itemId)
    }
    return state
}
