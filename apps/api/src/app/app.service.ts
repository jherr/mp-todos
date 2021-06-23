import { Injectable } from '@nestjs/common';

import { Todo } from '@mp-todos/shared-types';

@Injectable()
export class AppService {
  private todos: Todo[] = [];

  getData(): Todo[] {
    return this.todos;
  }

  add(text: string): void {
    this.todos.push({
      id: this.todos.length,
      text,
      done: false,
    });
  }

  setDone(id: number, done: boolean): void {
    this.todos = this.todos.map((todo) => ({
      ...todo,
      done: todo.id === id ? done : todo.done,
    }));
  }
}
