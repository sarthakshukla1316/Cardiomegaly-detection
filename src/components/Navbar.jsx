import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { logout } from '../http';
import { setAuth } from '../store/authSlice';
import PreHeader from './preheader/PreHeader';

const Navbar = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
          const { data } = await logout();
          dispatch(setAuth(data));
        } catch(err) {
          console.log(err);
        }
      }

    return (
        <>
            <PreHeader />
            <div className='px-6 bg-[#fdfbfbc3] sticky top-0'>
                <div className='flex justify-between items-center space-x-4'>
                    <div className='flex items-center'>
                        <img src={logo} alt="logo" className='h-24 w-24 object-cover' />
                        <p className='text-[18px] text-gray-800 font-semibold'>X-Healers</p>
                    </div>
                    
                    <div className='flex max-w-4xl justify-between items-center space-x-36'>
                        <Link to='/' className='text-xl font-semibold text-[#68AC5D] rounded-full'>Home</Link>
                        <Link to='/diagnose' className='text-xl font-semibold text-[#68AC5D] rounded-full'>Diagnose</Link>
                        <Link to='/download' className='text-xl font-semibold text-[#68AC5D] rounded-full'>Download report</Link>
                        <Link to='/news' className='text-xl font-semibold text-[#68AC5D] rounded-full'>News</Link>
                        {/* <Link to='/news' className='text-xl text-white bg-[#EAAF44] py-2 px-4 rounded-full'>News</Link> */}
                    </div>

                    <div className=''>
                        {user ? (
                            <div className='flex space-x-4 items-center justify-around'>
                            <Link to='/profile' className='text-xl font-semibold text-[#68AC5D] mr-10 border-b border-gray-600 pb-1'>Profile</Link>
                            <button onClick={() => handleLogout()} class="bg-[#68AC5D] hover:bg-[#9edc94] text-white font-bold py-2 px-4 rounded">
                                Logout
                            </button>

                            </div>
                        ) : 
                        <span className='text-[24px] mr-7'><i className="fa-solid fa-user"></i></span>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar