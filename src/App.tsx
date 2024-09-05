import { useState } from 'react';
import './App.css';
import TodoList from './TodoList/TodoList';
import Header from './Header/Header';
import DarkModeProvider from './context/DarkModeContext';

const filters = ['all', 'active', 'completed'] as const;
export type FilterType = typeof filters[number];
function App() {
  const [filter, setFilter] = useState<FilterType>(filters[0]);
  
  return (
    <DarkModeProvider>
      <Header filters={["all", "active", "completed"]} filter={filter} onFilterChange={setFilter} />
      <TodoList filter={filter} />
    </DarkModeProvider>
  );
}

export default App;
