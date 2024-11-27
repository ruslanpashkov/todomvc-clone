import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';
import { TodoStatusFilter } from '../../types/TodoStatusFilter';
import {
  getActiveTodos,
  getCompletedTodos,
  getVisibleTodos,
  validateTitle,
} from '../../utils/helpers';
import { ErrorNotification } from '../ErrorNotification';
import { TodoFooter } from '../TodoFooter';
import { TodoHeader } from '../TodoHeader';
import { TodoList } from '../TodoList';

export const Layout: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([0]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { status } = useParams();

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    let timerId: number;

    if (error) {
      timerId = window.setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => {
      if (timerId) {
        window.clearTimeout(timerId);
      }
    };
  }, [error]);

  const completedTodos = useMemo(() => getCompletedTodos(todos), [todos]);

  const activeTodos = useMemo(() => getActiveTodos(todos), [todos]);

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, status as TodoStatusFilter),
    [todos, status],
  );

  const activeTodosLeft = activeTodos.length;

  const hasTodos = todos.length > 0;
  const hasVisibleTodos = todos.length > 0 || Boolean(tempTodo);
  const isAllTodosCompleted = activeTodos.length === 0;
  const canClearCompleted = completedTodos.length > 0;

  const closeErrorNotification = () => {
    setError(null);
  };

  const changeErrorMessage = (errorMessage: string) => {
    setError(errorMessage);
  };

  const addTodo = useCallback(async (title: string) => {
    try {
      const newTodo = {
        title: title.trim(),
        completed: false,
      };

      setTempTodo({
        ...newTodo,
        id: 0,
      });

      const createdTodo = await createTodo(newTodo);

      setTodos((currentTodos) => [...currentTodos, createdTodo]);
    } catch {
      setError('Unable to add a todo');
    } finally {
      setTempTodo(null);
    }
  }, []);

  const removeTodo = useCallback(async (todoId: number) => {
    try {
      setLoadingTodoIds((currentTodos) => [...currentTodos, todoId]);

      await deleteTodo(todoId);

      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo.id !== todoId),
      );
    } catch {
      setError('Unable to delete a todo');
    } finally {
      setLoadingTodoIds((currentTodos) =>
        currentTodos.filter((id) => id !== todoId),
      );
    }
  }, []);

  const clearCompleted = useCallback(() => {
    Promise.all(completedTodos.map((todo) => removeTodo(todo.id)));
  }, [completedTodos, removeTodo]);

  const editTodo = useCallback(async (todo: Todo) => {
    const data = { ...todo };

    try {
      setLoadingTodoIds((currentTodos) => [...currentTodos, todo.id]);
      validateTitle(data.title);

      data.title = data.title.trim();

      await updateTodo(todo.id, data);

      setTodos((currentTodos) =>
        currentTodos.map((currentTodo) =>
          currentTodo.id === todo.id
            ? { ...currentTodo, ...data }
            : currentTodo,
        ),
      );
    } catch {
      setError('Unable to update a todo');
    } finally {
      setLoadingTodoIds((currentTodos) =>
        currentTodos.filter((id) => id !== todo.id),
      );
    }
  }, []);

  const toggleAllTodos = useCallback(() => {
    Promise.all(
      todos.map((todo) =>
        editTodo({ ...todo, completed: !isAllTodosCompleted }),
      ),
    );
  }, [todos, editTodo, isAllTodosCompleted]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          changeError={changeErrorMessage}
          addTodo={addTodo}
          toggleAllTodos={toggleAllTodos}
          isAllCompleted={isAllTodosCompleted}
          hasTodos={hasTodos}
        />

        {hasVisibleTodos && (
          <>
            <TodoList
              todos={visibleTodos}
              loadingTodoIds={loadingTodoIds}
              tempTodo={tempTodo}
              removeTodo={removeTodo}
              editTodo={editTodo}
            />

            <TodoFooter
              clearCompleted={clearCompleted}
              activeTodosLeft={activeTodosLeft}
              canClearCompleted={canClearCompleted}
            />
          </>
        )}
      </div>

      <ErrorNotification error={error} closeError={closeErrorNotification} />
    </div>
  );
};
