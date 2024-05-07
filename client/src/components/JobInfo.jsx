import CSSWrapper from '../assets/wrappers/JobInfo.js'

export default function JobInfo({ icon, text }) {
    return (
        <CSSWrapper>
            <span className='job-icon'>{icon}</span>
            <span className='job-text'>{text}</span>
        </CSSWrapper>
    )
}