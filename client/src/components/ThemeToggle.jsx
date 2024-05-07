import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import CSSWrapper from '../assets/wrappers/ThemeToggle';
import { useDashboardContext } from '../pages/DashboardLayout';

export default function ThemeToggle() {

    const { isDarkTheme, toggleDarkTheme } = useDashboardContext();

  return (
    <CSSWrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className='toggle-icon' />
      ) : (
        <BsFillMoonFill className='toggle-icon' />
      )}  
    </CSSWrapper>
  )
}