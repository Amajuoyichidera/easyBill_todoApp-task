import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo, deleteTodo, loadTodos, saveTodos } from '../Slice/todosSlice';

const MyText = ({ text }) => (
  <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{text}</Text>
);

export default function Todo() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);

  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(saveTodos(todos));
  }, [todos, dispatch]);

  const handleAddTodo = () => {
    if (title) {
      dispatch(addTodo({ id: Math.random(), title, description, status: 'todo' }));
      setTitle('');
      setDescription('');
      setAddModalVisible(false);
    }
  };

  const handleUpdateTodo = (id, status) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      dispatch(updateTodo({ ...todo, status }));
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = () => {
    if (selectedTodo) {
      dispatch(updateTodo({
        id: selectedTodo.id,
        title,
        description,
        status: selectedTodo.status,
      }));
      setSelectedTodo(null);
      setTitle('');
      setDescription('');
      setEditModalVisible(false);
    }
  };

  const openEditModal = (todo) => {
    setSelectedTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
    setEditModalVisible(true);
  };

  const renderTodoItem = ({ item }) => (
    <TouchableOpacity onPress={() => openEditModal(item)}>
      <View style={styles.todoItem}>
        <Text>{item.title}</Text>
        <View style={styles.todoActions}>
          <Button title="Todo" onPress={() => handleUpdateTodo(item.id, 'todo')} />
          <Button color='orange' title="Doing" onPress={() => handleUpdateTodo(item.id, 'doing')} />
          <Button color='green' title="Done" onPress={() => handleUpdateTodo(item.id, 'done')} />
          <Button color='red' title="Delete" onPress={() => handleDeleteTodo(item.id)} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/home.png')} />
      <View style={styles.section}>
        <TouchableOpacity style={styles.add} onPress={() => setAddModalVisible(true)}>
          <Text style={styles.addText}>+ Add Task</Text>
        </TouchableOpacity>
        <MyText text='Todo' />
        <FlatList
          style={{ marginBottom: -100 }}
          data={todos.filter(todo => todo.status === 'todo')}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <MyText text='Doing' />
        <FlatList
          style={{ marginBottom: -100 }}
          data={todos.filter(todo => todo.status === 'doing')}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <MyText text='Done' />
        <FlatList
          data={todos.filter(todo => todo.status === 'done')}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      {/* Add Task Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholderTextColor='#A9A9A9'
          />
          <TextInput
            placeholder="Description..."
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            placeholderTextColor='#A9A9A9'
          />
          <Button title="Add Todo" onPress={handleAddTodo} />
          <Button title="Close" onPress={() => setAddModalVisible(false)} />
        </View>
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholderTextColor='#A9A9A9'
          />
          <TextInput
            placeholder="Description..."
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            placeholderTextColor='#A9A9A9'
          />
          <Button title="Update Todo" onPress={handleEditTodo} />
          <Button title="Close" onPress={() => setEditModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 50,
    backgroundColor: '#D8D0FF',
    paddingBottom: 150
  },
  todoItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 4,
    width: '97%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  todoActions: {
    flexDirection: 'row',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 55,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  img: {
    height: 250,
    width: 250,
    marginLeft: 80,
  },
  section: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  add: {
    backgroundColor: '#7B61FF',
    width: 350,
    height: 55,
    borderRadius: 50,
    shadowColor: '#585858',
    shadowOffset: { width: 0, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 10,
    textAlign: 'center',
    paddingTop: 13,
    marginLeft: 10,
    marginBottom: 20
  },
  addText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
  }
});
