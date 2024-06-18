import { useDashboardContext } from '../pages/DashboardLayout'
import Logo from './Logo'
import NavLinks from './NavLinks'
import '../assets/CSS/BigSidebar.css'
import { FaTimes } from 'react-icons/fa';

export default function BigSidebar() {

  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <div className='big-sidebar'>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container '
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar={false} />
        </div>
        {showSidebar && <FaTimes onClick={toggleSidebar} className='close-btn' />}
      </div>
    </div>
  )
}