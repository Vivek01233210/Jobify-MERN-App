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
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar={true} />
        </div>
        {!showSidebar && <FaTimes onClick={toggleSidebar} className='close-btn' />}
      </div>
    </div>
  )
}