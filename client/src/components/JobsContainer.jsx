import '../assets/CSS/JobsContainer.css'
import { useAllJobsContext } from '../pages/AllJobs.jsx';
import Job from './Job.jsx';
import PageBtnContainer from './PageBtnContainer.jsx';

export default function JobsContainer() {

  const { data } = useAllJobsContext();

  const { jobs, results, numOfPages } = data;

  if (jobs.length === 0) {
    return (
      <section className='jobs-container'>
        <h2>No jobs to display...</h2>
      </section>
    );
  }


  return (
    <section className='jobs-container'>
      <h5 className='heading-jobs-found'>
        {results} job{jobs.length > 1 ? 's' : ''} found
      </h5>
      <div className="jobs">
        {jobs.map(job => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {numOfPages> 1 && <PageBtnContainer/>}
    </section>
  );
}