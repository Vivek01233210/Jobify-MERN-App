import { FaAlignLeft } from 'react-icons/fa'
import CSSWrapper from '../assets/wrappers/Navbar'
import Logo from './Logo'
import { useDashboardContext } from '../pages/DashboardLayout'
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';


export default function Navbar() {

    const { toggleSidebar } = useDashboardContext();

    return (
        <CSSWrapper>
            <div className='nav-center'>
                <button type='button' className='toggle-btn'
                    onClick={toggleSidebar}>
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h4 className='logo-text'>dashboard</h4>
                </div>
                <div className='btn-container'>
                    <ThemeToggle />
                    <LogoutContainer />
                </div>
            </div>
        </CSSWrapper>
    )
}