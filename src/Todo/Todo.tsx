import React, { ChangeEvent } from "react";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./Todo.module.css";

export type TodoType = {
  id: string;
  text: string;
  status: "active" | "completed";
};

interface TodoProps {
  todo: TodoType;
  onUpdate: (updated: TodoType) => void;
  onDelete: (deleted: TodoType) => void;
}

export default function Todo({ todo, onUpdate, onDelete }: TodoProps) {
  const { id, text, status } = todo;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked ? "completed" : "active";
    onUpdate({ ...todo, status });
  };
  const handleDelete = () => onDelete(todo);

  return (
    <li className={styles.todo}>
      <input
        className={styles.checkbox}
        type='checkbox'
        id={id}
        checked={status === "completed"}
        onChange={handleChange}
      />
      <label className={styles.text} htmlFor={id}>
        {text}
      </label>
      <span className={styles.icon}>
        <button className={styles.button} onClick={handleDelete}>
          <FaTrashAlt />
        </button>
      </span>
    </li>
  );
}
