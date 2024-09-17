"use client"
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import TodoFilter from "../components/TodoFilter";
import { useEffect, useState } from "react";
import { Todo } from "../types/types";
import axios from "axios";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getTodos();
  }, []);

  // 获取Todo列表
  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/todo/list');
      const data = response.data.data;
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // 添加Todo
  const addTodo = async (text: string) => {
    const newTodo: Todo = {
      id: 0,
      text,
      completed: false,
    }
    // setTodos([...todos, newTodo]);
    try {
      console.log('newTodo:', newTodo);
      const response = await axios.post('http://localhost:8081/api/todo/add', newTodo)
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
    getTodos();
  }

  // 删除Todo
  const deleteTodo = async (id: number) => {
    // setTodos(todos.filter(todo => todo.id !== id));
    try {
      const response = await axios.post(`http://localhost:8081/api/todo/delete/${id}`);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
    getTodos();
  }

  // 切换Todo完成状态
  const toggleTodo = async (id: number) => {
    try {
      const response = await axios.post(`http://localhost:8081/api/todo/toggle/${id}`);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
    getTodos();
    // setTodos(todos.map(todo => {
    //   if (todo.id === id) {
    //     todo.completed = !todo.completed;
    //   }
    //   return todo;
    // }));
  }

  // 根据filter筛选Todo
  const getFilteredTodos = () => {
    // TODO: 可以调用后端接口实现
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodo addTodo={addTodo}></AddTodo>
      <TodoList todos={getFilteredTodos()} deleteTodo={deleteTodo} toggleTodo={toggleTodo}></TodoList>
      <TodoFilter setFilter={setFilter}></TodoFilter>
    </div>
  );
}
