import { FaUserCircle, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import CSSWrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';

export default function LogoutContainer() {
    const [showLogout, setShowLogout] = useState(false);
    const { user, logoutUser } = useDashboardContext();

    return (
        <CSSWrapper>
            <button
                type='button'
                className='btn logout-btn'
                onClick={() => setShowLogout(prevState => !prevState)}
            >
                {user.avatar ? (
                    <img src={user.avatar} alt='avatar' className='img' />
                ) : (
                    <FaUserCircle />
                )}

                {user?.name}
                {showLogout ? <FaCaretUp /> : <FaCaretDown />}

            </button>
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                <button type='button' className='dropdown-btn' onClick={logoutUser}>
                    logout
                </button>
            </div>
        </CSSWrapper>
    )
}