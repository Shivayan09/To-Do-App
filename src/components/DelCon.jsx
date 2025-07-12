import React from 'react';
import { toast } from 'react-toastify';

const DelCon = ({ item, todos = [], setTodos, setDelId }) => {
    const handleConfirmDelete = () => {
        const updatedTodos = todos.filter(t => t.id !== item.id);
        setTodos(updatedTodos);
        setDelId(null);
        toast.success("Task deleted", {
            position: "top-center"
        });
    };

    return (
        <div className='fixed z-50 bg-white h-[25vh] w-[80vw] md:w-[20vw] border border-red-300 text-red-700 rounded-xl p-5 shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='mb-5 text-center'>Are you sure you want to delete this task?</div>
            <div className='flex gap-5 justify-center'>
                <div
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600"
                    onClick={handleConfirmDelete}
                >
                    Yes
                </div>
                <div
                    className="bg-white border border-black text-black px-3 py-1 rounded cursor-pointer hover:bg-gray-200"
                    onClick={() => setDelId(null)}
                >
                    No
                </div>
            </div>
        </div>
    );
};

export default DelCon;
