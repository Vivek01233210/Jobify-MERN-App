import CSSWrapper from '../assets/wrappers/StatItem.js';


export default function StatItem({ count, title, icon, color, bcg }) {
  return (
    <CSSWrapper color={color} bcg={bcg}>
        <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </CSSWrapper>
  )
}