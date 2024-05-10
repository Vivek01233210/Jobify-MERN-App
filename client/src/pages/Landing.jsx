import CSSWrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';

export default function Landing() {
  return (
    <CSSWrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>"Stay on Track, Land Your Dream Job!"</p>
          <p>
            Job Tracker Pro is your ultimate companion in the journey to securing your dream job. From creating personalized job lists to scheduling interviews and following up on applications, Job Tracker Pro ensures no opportunity slips through the cracks. Start streamlining your path to professional success today!
          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn'>
            Login
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </CSSWrapper>
  )
}