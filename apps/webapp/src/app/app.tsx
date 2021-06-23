import { useCallback, useRef } from 'react';
import { useTodos } from '@mp-todos/data-access';

export function App() {
  const { todos, addTodo, togggleTodo } = useTodos();

  const textInputRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(async () => {
    if (textInputRef.current) {
      await addTodo(textInputRef.current.value);
      textInputRef.current.value = '';
    }
  }, [addTodo]);

  return (
    <div>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => togggleTodo(todo.id)}
            />
            {todo.text}
          </div>
        ))}
      </div>
      <div>
        <input ref={textInputRef} />
      </div>
      <div>
        <button onClick={onAddTodo}>Add</button>
      </div>
    </div>
  );
}

export default App;
