import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TODOS_STORAGE_KEY = 'todos';

const initialState = {
  todos: [],
  status: 'idle',
  error: null,
};

export const loadTodos = createAsyncThunk('todos/loadTodos', async () => {
  const todosJson = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
  return todosJson ? JSON.parse(todosJson) : [];
});

export const saveTodos = createAsyncThunk('todos/saveTodos', async (todos) => {
  await AsyncStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      const { id, title, description, status } = action.payload;
      const existingTodo = state.todos.find(todo => todo.id === id);
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.description = description;
        existingTodo.status = status;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(saveTodos.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;
