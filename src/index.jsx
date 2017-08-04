import React from 'react'
import ReactDOM from 'react-dom'
import {List, Map} from 'immutable'
import {compose, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer, {routerMiddleware, CHANGE_FILTER, storeMiddleware} from './reducer'
import {TodoAppContainer} from './components/TodoApp'

const createStoreDevTools = compose(
    // search-router-middleware
    applyMiddleware(routerMiddleware),
    applyMiddleware(storeMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)
const store = createStoreDevTools(reducer)
store.dispatch({
    type: CHANGE_FILTER
})

ReactDOM.render(
    <Provider store={store}>
        <TodoAppContainer />
    </Provider>,
    document.getElementById('app')
)
