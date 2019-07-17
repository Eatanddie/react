function renderTitle(newTitle, oldTitle = {}) {
    if (newTitle === oldTitle) return
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = newTitle.text
    titleDOM.style.color = newTitle.color
}

function renderContent(newContent, oldContent = {}) {
    if (newContent === oldContent) return
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = newContent.text
    contentDOM.style.color = newContent.color
}

function renderApp(newAppState, oldAppState = {}) {
    if (newAppState === oldAppState) return
    renderTitle(newAppState.title, oldAppState.title)
    renderContent(newAppState.content, oldAppState.content)
}

function reducer(state, action) {
    if (!state) {
        return {
            title: {
                text: 'react 小书',
                color: 'red'
            },
            content: {
                text: 'react 内容',
                color: 'blue'
            }
        }
    }
    switch(action.type) {
        case 'UPDATE_TITLE_TEXT':
            return {
                ...state,
                title: {
                    ...state.title,
                    text: action.text
                }
            }
        case 'UPDATE_TITLT_COLOR':  
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            }
        default:
            return state
    }
}

function createStore(reducer) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener) //监听数据变化重新渲染页面
    const getState = () => state
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(listener => listener()) //传入方法，执行方法
    }
    dispatch({}) //初始化state
    return { getState, dispatch, subscribe }
}

const store = createStore(reducer) //首次渲染
let oldState = store.getState()

store.subscribe(() => {
    const newState = store.getState()
    renderApp(newState, oldState)
    oldState = newState //新数据赋值为老数据
})

renderApp(store.getState())

store.dispatch({
    type: 'UPDATE_TITLE_TEXT',
    text: '666'
})

store.dispatch({
    type: 'UPDATE_TITLT_COLOR',
    color: 'green'
})

