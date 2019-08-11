import React, { useState } from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import { TODOS } from '../utils/data.js';

const TodoItem = props => {

  const statusStyle = {
    backgroundColor: props.todo.status === 'Done' ? 'blue' : 'green'
  };

  const onLongPress = todo => {
    const prompt = `"${todo.body}"`;
    Alert.alert(
      'Delete your todo?',
      prompt,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'OK', onPress: () => {
            console.log('deleted')
            props.onDeleteTodo(todo.id)
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      key={props.todo.body}
      style={[styles.todoItem, statusStyle]}
      onLongPress={() => onLongPress(props.todo)}
      onPress={() => props.onToggleTodo(props.todo.id)}
    >
      <Text style={styles.todoText}>
        {props.idx + 1}: {props.todo.body}
      </Text>
    </TouchableOpacity>
  );
};

export default class AllScreen extends React.Component {
  /* const [todoList, setTodoList] = useState(TODOS);
  const [todoBody, setTodoBody] = useState(''); */
  constructor(props) {
    super(props)
    this.state = {
      todoList: TODOS,
      todoBody: ''
    }
  }
  onToggleTodo = id => {
    let { todoList } = this.state
    const todo = todoList.find(todo => todo.id === id);
    todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    console.log('todo', todo)
    const foundIndex = todoList.findIndex(todo => todo.id === id);
    todoList[foundIndex] = todo;
    const newTodoList = [...todoList];
    this.setState({ todoList: newTodoList })
    setTimeout(() => {
      this.props.navigation.navigate('SingleTodo', {
        updatedTodo: todo
      });
    }, 1000);
  };

  onDeleteTodo = id => {
    const newTodoList = this.state.todoList.filter(todo => todo.id !== id);
    console.log('new todo list', newTodoList)
    this.setState({ todoList: newTodoList })
  };

  onSubmitTodo = () => {
    let { todoList, todoBody } = this.state
    const newTodo = {
      body: todoBody,
      status: 'Active',
      id: todoList.length + 1
    };
    const newTodoList = [...todoList, newTodo];
    console.log('new todo list: ---', newTodoList)
    this.setState({ todoList: newTodoList, todoBody: '' })

  };
  render() {
    return (
      <ImageBackground style={styles.container} source={require('../assets/background.png')}>
        <KeyboardAvoidingView
          enabled
          behavior="padding"
          style={styles.keyboard}
        >
          <ScrollView style={{ flex: 1 }}>
            <View style={{ marginTop: '150%' }}>
              {TODOS.map((todo, idx) => {
                return (<TodoItem
                  key={todo.body}
                  todo={todo}
                  idx={idx}
                  onToggleTodo={this.onToggleTodo}
                  onDeleteTodo={this.onDeleteTodo}
                />)
              })}
              <View style={styles.inputContainer}>
                <TextInput
                  value={this.state.todoBody}
                  style={styles.todoInput}
                  onChangeText={text => this.setState({todoBody: text})} />
                <TouchableOpacity style={styles.button} onPress={this.onSubmitTodo}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
}

AllScreen.navigationOptions = {
  title: 'All Todos'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  todoItem: {
    margin: 5,
    padding: 10,
    minHeight: 50,
    width: '95%',
    color: 'white',
    borderRadius: 5,
    flexWrap: 'wrap'
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  todoInput: {
    width: '95%',
    minHeight: 30,
    color: 'white',
    borderWidth: 1,
    marginTop: '20%',
    marginBottom: '5%',
    borderColor: 'grey'
  },
  inputContainer: {
    flex: 1,
    width: '90%',
    marginTop: 20,
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  button: {
    height: 50,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  scrollView: {
    flex: 1,
    paddingTop: 1000
  },
  keyboard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});