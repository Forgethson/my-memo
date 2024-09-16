"use client"
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import TodoFilter from "../components/TodoFilter";
import { useState } from "react";
import { Todo } from "../types/types";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');

  // 添加Todo
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo]);
  }

  // 删除Todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  // 切换Todo完成状态
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    }));
  }

  // 根据filter筛选Todo
  const getFilteredTodos = () => {
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
