import { Link, useRouteError } from "react-router-dom"
import img from '../assets/images/not-found.svg'
import CSSWrapper from '../assets/wrappers/ErrorPage';

export default function Error() {

  const error = useRouteError();
  console.log(error)

  if (error.status === 404) {
    return (
      <CSSWrapper>
        <div>
          <img src={img} alt='not found' />
          <h3>Ohh! page not found</h3>
          <p>We can&apos;t seem to find the page you&apos;re looking for</p>
          <Link to='/dashboard'>back home</Link>
        </div>
      </CSSWrapper>
    )
  }

  return (
    <CSSWrapper>
      <div>
        <h3>something went wrong</h3>
      </div>
    </CSSWrapper>
  )

}