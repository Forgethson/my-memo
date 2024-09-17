import { useState } from "react"
import { text } from "stream/consumers"

interface AddTodoProps {
    addTodo: (text: string) => void
}


function AddTodo({ addTodo }: AddTodoProps) {
    // 表单输入框的值需要用状态来保存
    const [text, setText] = useState('')

    // 表单提交事件
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (text.trim() === '') {
            return
        }
        console.log('text=', text);
        addTodo(text) // 调用父组件传递过来的addTodo方法，将输入框的值作为参数传递过去
        setText('') // 清空输入框
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)} // 输入框内容变化时更新状态
            ></input>
            <button>新建事项</button>
        </form>
    )
}

export default AddTodo