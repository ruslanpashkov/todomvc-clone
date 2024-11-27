import { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
  loadingTodoIds: number[];
  tempTodo: Todo | null;
  removeTodo: (todoId: number) => void;
  editTodo: (todo: Todo) => void;
}

export const TodoList: FC<Props> = ({
  todos,
  loadingTodoIds,
  tempTodo,
  removeTodo,
  editTodo,
}) => (
  <section className="todoapp__main">
    <TransitionGroup>
      {todos.map((todo) => (
        <CSSTransition key={todo.id} timeout={300} classNames="item">
          <TodoInfo
            todo={todo}
            loadingTodoIds={loadingTodoIds}
            removeTodo={removeTodo}
            editTodo={editTodo}
          />
        </CSSTransition>
      ))}

      {tempTodo && (
        <CSSTransition key={0} timeout={300} classNames="temp-item">
          <TodoInfo
            todo={tempTodo}
            loadingTodoIds={loadingTodoIds}
            removeTodo={removeTodo}
            editTodo={editTodo}
          />
        </CSSTransition>
      )}
    </TransitionGroup>
  </section>
);
