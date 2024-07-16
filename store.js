// store.js
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './Slice/todosSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
