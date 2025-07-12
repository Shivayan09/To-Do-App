import React, { useState, useEffect, useRef } from 'react'
import todo_icon from '../assets/todo-icon.png'
import edit_icon from '../assets/edit-icon.png'
import delete_icon from '../assets/delete-icon.png'
import noTask_icon from '../assets/noTask-icon.png'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify'
import DelConfirmation from './delConfirmation'

const ToDoBody = () => {

    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [delId, setDelId] = useState(null);

    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleEdit = (e, id) => {
        let t = todos.find(i => i.id === id);
        setTodo(t.todo);
        let newTodos = todos.filter(item => item.id !== id);
        setTodos(newTodos);
        toast.success("Task editted successfully!", {
            position: "top-center"
        })
    }

    const handleDelete = (e, id) => {
        setDelId(id);
    }

    const handleChange = (e) => {
        setTodo(e.target.value);
    }

    const handleAdd = () => {
        if (todo.trim().length === 0) {
            toast.error("Task cannot be empty", {
                position: "top-center"
            })
            return;
        }
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
        setTodo("");
        toast.success("Task added!", {
            position: "top-center"
        })
    }

    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = todos.findIndex(item => item.id === id);
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
    }

    return (
        <div className='relative'>
            <div className='flex h-[80vh] w-[70vw] mx-auto mt-5 flex-col md:flex-row'>
                <div className="box rounded-l-xl w-[100%] md:w-[50%] bg-cyan-500">
                    <div className="header text-[1.4rem] text-center mt-5 uppercase text-white font-bold">Your go to To-do list</div>
                    <div className="img">
                        <img src={todo_icon} alt="todo illustration" />
                    </div>
                </div>
                <div className="box border-1 border-black/20 w-[100%] md:w-[50%] rounded-r-xl shadow-md p-5">
                    <div className="header text-[1.3rem] font-semibold text-gray-800/80 font-serif">Add a task</div>
                    <div className="inputbox flex gap-5 items-center mt-5">
                        <input
                            onChange={handleChange}
                            value={todo}
                            type="text"
                            placeholder='Enter your task'
                            className='bg-black/10 h-10 w-[60%] p-2 rounded-md outline-none'
                        />
                        <div
                            className="button bg-cyan-500 text-white h-10 flex items-center justify-center w-30 rounded-xl hover:rounded-md cursor-pointer transition-all duration-100 hover:scale-[1.02]"
                            onClick={handleAdd}
                        >
                            Save
                        </div>
                    </div>
                    <p className='my-5 text-[1.3rem] text-gray-800/80 font-semibold font-serif'>Your saved tasks:</p>
                    <div className="todos max-h-[300px] overflow-y-auto pr-2">
                        {todos.length === 0 ? (
                            <div>
                                <p className='text-center text-[0.9rem] text-gray-600'>No tasks added yet</p>
                                <img src={noTask_icon} alt="no tasks" />
                            </div>
                        ) : (
                            todos.map((item) => (
                                <div key={item.id} className="tasks flex items-center justify-between w-full overflow-y-auto mb-2">
                                    {delId==item.id && <DelConfirmation
                                    todos={todos}
                                    setTodos={setTodos}
                                    setDelId={setDelId}
                                    item={item}
                                    />}
                                    <div className='flex items-start gap-3 w-[80%]'>
                                        <input
                                            name={item.id}
                                            onChange={handleCheckbox}
                                            type="checkbox"
                                            checked={item.isCompleted}
                                            className='h-5 w-5 my-auto'
                                        />
                                        <div className={item.isCompleted ? "text-green-600 text-[1.05rem] font-mono" : "w-[80%] text-gray-800 text-[1.05rem] font-mono"}>
                                            {item.todo}
                                        </div>
                                    </div>
                                    <div className="buttons flex items-center gap-2 w-[20%]">
                                        <div className="button transition-all" onClick={(e) => handleEdit(e, item.id)}>
                                            <img src={edit_icon} alt="edit" className='h-10 cursor-pointer' />
                                        </div>
                                        <div className="button transition-all" onClick={(e) => handleDelete(e, item.id)}>
                                            <img src={delete_icon} alt="delete" className='h-5 cursor-pointer' />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToDoBody;
