import CSSWrapper from '../assets/wrappers/SmallSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import Logo from './Logo';
import { FaTimes } from 'react-icons/fa';
import NavLinks from './NavLinks';


export default function SmallSidebar() {
    const { showSidebar, toggleSidebar } = useDashboardContext();

    return (
        <CSSWrapper>
            <div
                className={
                    showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
                }
            >
                <div className='content'>
                    <button type='button' className='close-btn' 
                    onClick={toggleSidebar}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks/>
                </div>
            </div>
        </CSSWrapper>
    )
}