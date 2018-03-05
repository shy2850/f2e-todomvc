import IPreact from 'ipreact'

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

const store = localStorage.getItem(STORAGE_KEY) || JSON.stringify([
    { id: 1, text: 'Preact', status: 'active', editing: false },
    { id: 2, text: 'IPreact', status: 'active', editing: false },
    { id: 3, text: 'Immutable', status: 'active', editing: false },
    { id: 4, text: 'Typescript', status: 'active', editing: false },
    { id: 5, text: 'Rollup', status: 'active', editing: false },
    { id: 6, text: 'f2e-server', status: 'active', editing: false }
])

const { connect, getState, dispatch } = IPreact([
    (state, nextState) => {
        const todos = nextState.getIn(['todos'])
        if (todos !== state.getIn(['todos'])) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
        }
    },
    (state, nextState) => {
        let filter = nextState.getIn(['filter'])
        if (filter !== state.getIn(['filter'])) {
            if (!filter) {
                filter = 'all'
            }
            if (filter === 'all') {
                history.pushState(null, title, pathname)
            } else {
                history.pushState(null, title, pathname + `?filter=${filter}`)
            }
        }
    }
])({
    todos: JSON.parse(store) || [],
    filter: (mt => mt && mt[1])(search.match(/\?filter=(\w+)/)) || 'all'
})

export { connect, getState, dispatch }
