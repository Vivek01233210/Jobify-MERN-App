import { NavLink } from "react-router-dom"
import { useDashboardContext } from "../pages/DashboardLayout"
import links from "../utils/links.jsx"

export default function NavLinks({ isBigSidebar }) {

  const { toggleSidebar, user } = useDashboardContext();
  // console.log(user)
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (role !== 'admin' && path === 'admin') return;
        return (
          <NavLink
            to={path}
            key={text}
            onClick={isBigSidebar ? null : toggleSidebar}
            className='nav-link'
            end
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  )
}