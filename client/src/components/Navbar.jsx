import { FaAlignLeft } from 'react-icons/fa'
import '../assets/CSS/Navbar.css'
import Logo from './Logo'
import { useDashboardContext } from '../pages/DashboardLayout'
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';


export default function Navbar() {

    const { toggleSidebar } = useDashboardContext();

    return (
        <nav className='nav-wrapper' >
            <div className='nav-center'>
                <button type='button' className='toggle-btn'
                    onClick={toggleSidebar}>
                    <FaAlignLeft />
                </button>
                <Link to="/dashboard">
                    <Logo />
                    <h4 className='logo-text'>dashboard</h4>
                </Link>
                <div className='btn-container'>
                    <ThemeToggle />
                    <LogoutContainer />
                </div>
            </div>
        </nav>
    )
}