import { Todo } from "@/types/types"
import TodoItem from "./TodoItem"

interface TodoListProps {
    todos: Todo[],
    toggleTodo: (id: number) => void,
    deleteTodo: (id: number) => void
}

function TodoList({ todos, toggleTodo, deleteTodo }: TodoListProps) {

    return (
        <ol>
            {todos.map(todo => {
                return (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        toggleTodo={toggleTodo}
                        deleteTodo={deleteTodo}
                    />
                )
            })}
        </ol>
    )
}

export default TodoList