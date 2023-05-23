# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting
# file store.js
```js
import rootReducer from 'reducer.js'
import { composeWithDevTools } from 'redux-devtools-extension';
const composedEnhancers = composeWithDevTools();

const store = createStore(rootReducer,initvalue, (giá trị mặt định), ('enhancer => middlware') composedEnhancers)

export default store;
```
# reducer.js
```js
initState = {
  filter: {
    search: '',
    status: 'all',
    priority: []
  }
  todoList: [
    {id: 1, name: 'learn to', completed: true, priority: 'low'}
  ]
}

const rootReducer = (state = initState, action ) => {
  switch(action.type) {
    case 'todoList/addTodo':
      return {
        ...state,
        todoList: [ 
          ...state.todoList,
          action.payload
        ]
      }
    case 'filters/searchFilterChange':
      return {
        ...state,
        filters: {
          ...state.filters,
          search: action.payload
        }
      }
    default:
      return state;
  }
}

export default    rootReducer
```
# index.js
```js
import { Provider } from 'react-redux'

<Provider store={store}>
<App />
</Provider>
```
# action.js
```js
// action creators => function
export  const addTodo = (data)  => {
  return {
    type:'todoList/addTodo'
    payload: data
  }
}

export const searchFilterChange = (text) => {
  return {
    type: 'filters/searchFilterChange',
    payload: text,
  };
};
```
# TodoList.js
```js

  import { useDispatch, useSelector } from 'react-redux'
  import { addTodo } from 'action.js'
  import { todoRemainningSelector } from 'selector.js'

  const [statename, setStateName] = useState('')
  const [priority, setPriority] = useState('Medium')

  const  todoList = useSelector(todoRemainningSelector)
  // const searchText = useSelector(searchTextSelector)

  const dispatch = useDispatch()

  const handleAddButtonClick = () => {
    dispatch(dispatch({
      id: uuid,
      name: statename,
      priority: priority,
      completed: false,
    }))
  }
  const handleInputchange = (e) => {
      setStateName(e.target.value)
  }
  const handlePriorytiChange = (value) => {
    setPriority(value)
  }
  return <>
  {{todoList.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            name={todo.name}
            prioriry={todo.priority}
            completed={todo.completed}
          />
        ))}}
  <Select onChange={handlePriorytiChange}>
  <input onChange={handleInputchange}>
  <Button onClick={handleAddButtonClick}>
  <>
```

# selector.js
```js
import { createSelector } from 'reselect'


export const searchSelector = (state) => state.filters.search
export const todoListSelector = (state) => state.todoList

export const todoRemainningSelector = createSelector(
            todoListSelector, 
            searchSelector,
            (tosoList, searchText) => {
              return tosoList.filter(todo =>{
                return todo.name.includes(searchText)
              })
            } )

// c1
// export const todoListSelector = (state) =>{
//   const todoremaining = state.todoList.filter(()=> {
//     return todo.name.includes(state.filters.search)
//   })
//   return todoremaining
//   } 

// export const searchTextSelector = (state) => state.filter.search
```
# filters.js
```js
import { searchFilterChange } from 'action.js'
import { useDispatcher } from 'react-redux'

  const [searchText, setSearchText]= useState=('')
  const dispatch = useDispatch()

  const handleSearchChange = (e) => {
    console.log('handleSearchChange', { e })
      setSearchText(e.target.value)
      dispatch(searchFilterChange(e.target.value))
  }

  <Search value={searchText} onCHange={handleSearchChange} />
```

### Slice Reducer 
# filterSlice.js
```js
initState = {
    search: '',
    status: 'all',
    priority: []
}

const filtersReducer = (state = initState, action ) => {
  switch(action.type) {
    case 'filters':
        {
          ...state,
          search: action.payload
        }
    default:
      return state;
  }
}

export default filtersReducer
```
# todoSlice.js
```js
initState = [
    {id: 1, name: 'learn to', completed: true, priority: 'low'}
  ]

const todoListReducer = (state = initState, action ) => {
  switch(action.type) {
    case 'todoList/addTodo':
      return [ 
          ...state,
          action.payload
        ]
    default:
      return state;
  }
}

export default  todoListReducer
```

# rootReducer.js
```js
import filtersReducer from 'filterSlice.js'
import todoListReducer from 'todoSlice.js'
  const rootReducer = (state = {}, action) => {
    return {
      filters: filtersReducer(state.filters, action),
      todoList: todoListReducer(state.todoList, action)
    }
  }

export default rootReducer
```
# rootReducer.js c2 redux
```js
import { combineReducers } from 'redux';

import filtersReducer from 'filterSlice.js'
import todoListReducer from 'todoSlice.js'

const rootReducer = combineReducers({
  filters: filtersReducer,
  todoList: todoListReducer,
});

export default rootReducer;

```

### reduxtoolkit
# store.js
```js
import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from 'filterSlice.js'
import todoListReducer from 'todoSlice.js'
 
const store = configureStore({
  reducer: {
    filters: filtersReducer.reducer,
    todoList:todoListReducer.reducer,
  }
})

export default store
```
# filterSlice.js
```js
import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    search: '',
    status: 'all',
    priority: []
  },
  reducers: {
    searchFilterChange: (state, action) => {
      // mutation || IMMER
      state.search = action.payload;
    },// => { type: 'filters/searchFilterChange' }
    statusFilterChange: (state, action) => {
      state.status = action.payload;
    },
    prioritiesFilterChange: (state, action) => {
      state.priorities = action.payload;
    },
  },
})
```
# todoSlice.js
```js
import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'todoList',
  initialState: [
    { id: 1, name: 'Learn Yoga', completed: false, priority: 'Medium' },
    { id: 2, name: 'Learn Redux', completed: true, priority: 'High' },
    { id: 3, name: 'Learn JavaScript', completed: false, priority: 'Low' },
  ],
  reducers: { // IMMER
    addTodo: (state, action) => {
      state.push(action.payload);
    }, // action creators
    toggleTodoStatus: (state, action) => {
      const currentTodo = state.find(todo => todo.id === action.payload);
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
      }
    }
  }
});
```
# indextodolist.js
```js
import todoListSlice from './todosSlice';
const handleAddButtonClick = () => {
    dispatch(
      todoListSlice.actions.addTodo({
        id: uuidv4(),
        name: todoName,
        priority: priority,
        completed: false,
      })
    );

    setTodoName('');
    setPriority('Medium');
  };
```


### Object conteuctor 

```js
function User(firstname, lastName, avatar) {
  this.firstname = firstname,
  this.lastName = lastName,
  this.avatar = avatar

  this.getName = function() {
    return this.firstname + " " + this.lastName
  }
}

var author = new User("thanh", "ha", "avatar")
var user = new User("thanh", "hoang", "avatar")

// them 1 thuoc tinh
author.title = 'creator'
user.comment = 'user'
```


