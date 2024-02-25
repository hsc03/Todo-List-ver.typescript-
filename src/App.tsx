import React, { useState } from 'react';
import "./styles/App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row } from 'react-bootstrap';
import Header from './components/Header';
import TodoList from './components/TodoList';

export type Todo = {
  id: number;
  text: string;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoItem = (text: string) => {
    const newTodo = { id: Date.now(), text: text };
    setTodos([...todos, newTodo]);
  };

  const deleteTodoItem = (id: number) => {
    const deletedTodo = todos.filter(todo => todo.id !== id);
    setTodos(deletedTodo);
  };

  const editTodoItem = (id: number, newText: string) => {
    const editTodo = todos.map(todo => todo.id === id ? {...todo, text: newText }: todo);
    setTodos(editTodo);
  };

  return (
    <div className='app'>
      <Container>
        <Row>
          <Header onAdd={addTodoItem} />
        </Row>
        <Row>
          <TodoList
            todos={todos}
            onDelete={deleteTodoItem}
            onEdit={editTodoItem}
          />
        </Row>
      </Container>
    </div>
  );
}

export default App;