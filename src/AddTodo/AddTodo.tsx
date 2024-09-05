import React,{ChangeEvent, FormEvent, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import styles from './AddTodo.module.css'

type TodoType = {
  id: string;
  text: string;
  status: 'active' | 'completed';
};

interface AddTodoProps {
  onAdd: (newTodo: TodoType) => void;
}

export default function AddTodo({onAdd}: AddTodoProps) {
  const [text, setText] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(text.trim().length === 0) {
      return;
    }
    onAdd({id: uuidv4(), text, status: 'active'});
    setText('');
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} type="text" placeholder='Add Todo' value={text} onChange={handleChange} />
      <button className={styles.button}>Add</button>
    </form>
  );
}

