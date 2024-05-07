import CSSWrapper from '../assets/wrappers/JobsContainer.js';
import { useAllJobsContext } from '../pages/AllJobs.jsx';
import Job from './Job.jsx';
import PageBtnContainer from './PageBtnContainer.jsx';

export default function JobsContainer() {

  const { data } = useAllJobsContext();
  const { jobs, results, numOfPages } = data;

  if (jobs.length === 0) {
    return (
      <CSSWrapper>
        <h2>No jobs to display...</h2>
      </CSSWrapper>
    );
  }


  return (
    <CSSWrapper>
      <h5>
        {results} job{jobs.length > 1 ? 's' : ''} found
      </h5>
      <div className="jobs">
        {jobs.map(job => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {numOfPages> 1 && <PageBtnContainer/>}
    </CSSWrapper>
  );
}