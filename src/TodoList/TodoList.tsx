import React, { useEffect, useState } from "react";
import Todo from "../Todo/Todo";
import AddTodo from "../AddTodo/AddTodo";
import styles from "./TodoList.module.css";

type TodoType = {
  id: string;
  text: string;
  status: "active" | "completed";
};

interface TodoListProps {
  filter: "all" | "active" | "completed";
}

export default function TodoList({ filter }: TodoListProps) {
  const [todos, setTodos] = useState<TodoType[]>(() =>
    readTodosFromLocalStorage()
  );
  const handleAdd = (todo: TodoType) => setTodos([...todos, todo]);
  const handleUpdate = (updated: TodoType) =>
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  const handleDelete = (deleted: TodoType) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));
  const filtered = getFilteredItems(todos, filter);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}
function readTodosFromLocalStorage(): TodoType[] {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

function getFilteredItems(
  todos: TodoType[],
  filter: "all" | "active" | "completed"
) {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}
