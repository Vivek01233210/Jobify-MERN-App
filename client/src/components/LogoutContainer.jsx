import { FaUserCircle, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { IoLogOutOutline  } from "react-icons/io5";
import { ImProfile } from 'react-icons/im';
// import CSSWrapper from '../assets/wrappers/LogoutContainer';
import '../assets/CSS/LogoutContainer.css'
import { useState, useEffect, useRef } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';
import { Link } from 'react-router-dom';

export default function LogoutContainer() {
    const [showLogout, setShowLogout] = useState(false);
    const { user, logoutUser } = useDashboardContext();
    const logoutRef = useRef();

    const handleClickOutside = (event) => {
        if (logoutRef.current && !logoutRef.current.contains(event.target)) {
            setShowLogout(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='logoutContainer' ref={logoutRef}>
            <button
                type='button'
                className='logout-btn'
                onClick={() => setShowLogout(prevState => !prevState)}
            >
                {user.avatar ? (
                    <img src={user.avatar} alt='avatar' className='profile-img' />
                ) : (
                    <FaUserCircle />
                )}

                {user?.name}
                {showLogout ? <FaCaretUp /> : <FaCaretDown />}
            </button>
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                <button type='button' className='dropdown-btn' onClick={()=>setShowLogout(false)}>
                    <Link to="/dashboard/profile">
                        <ImProfile/>Profile
                    </Link>
                </button>
                <button type='button' className='dropdown-btn' onClick={logoutUser}>
                    <IoLogOutOutline className='logout-icon' />logout
                </button>
            </div>
        </div>
    )
}