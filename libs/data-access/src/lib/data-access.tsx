import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';

import { Todo } from '@mp-todos/shared-types';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = useCallback(async () => {
    const resp = await axios.get<Todo[]>('http://localhost:3333/api');
    setTodos(resp.data);
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const addTodo = useCallback(
    async (text: string) => {
      await axios.post('http://localhost:3333/api', {
        text,
      });
      getTodos();
    },
    [getTodos]
  );

  const togggleTodo = useCallback(
    async (id: number) => {
      await axios.post('http://localhost:3333/api/setDone', {
        id,
        done: !todos.find((todo) => todo.id === id)?.done,
      });
      getTodos();
    },
    [todos, getTodos]
  );

  return {
    todos,
    getTodos,
    addTodo,
    togggleTodo,
  };
}
