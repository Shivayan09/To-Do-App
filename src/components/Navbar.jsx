import React from 'react'
import user_icon from '../assets/user_icon.svg'

const Navbar = () => {
    return (
        <div className='relative'>
            <div className='h-[9vh] w-[90vw] md:w-[50vw] bg-white shadow-md rounded-xl m-2 flex flex-col md:flex-row items-center p-3 mx-auto'>
                <ul className='flex items-center gap-9 md:gap-24 mx-auto'>
                    <li className='text-[1.1rem] text-sky-800 font-semibold hover:text-cyan-400 transition-all duration-300 cursor-pointer'>Reset</li>
                    <li className='text-[1.1rem] text-sky-800 font-semibold hover:text-cyan-400 transition-all duration-300 cursor-pointer'>Contact</li>
                    <li className='flex items-center gap-2 text-[1.1rem] text-sky-800 font-semibold hover:text-cyan-400 transition-all duration-300 cursor-pointer'>
                        <img src={user_icon} alt="" />
                        <p>User</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
