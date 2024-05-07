import CSSWrapper from '../assets/wrappers/BigSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import Logo from './Logo'
import NavLinks from './NavLinks'


export default function BigSidebar() {

  const { showSidebar } = useDashboardContext();

  return (
    <CSSWrapper>
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
      </div>
    </CSSWrapper>
  )
}