import { FormRow, FormRowSelect } from '.';
import CSSWrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link, useNavigation } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs.jsx';

export default function SearchContainer() {
  const submit = useSubmit();

  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;
  // console.log(searchValues)

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const debounce = (onChange)=>{
    let timeoutID;
    return (e)=>{
      const form = e.currentTarget.form;
      clearTimeout(timeoutID);
      timeoutID = setTimeout(()=>{
        onChange(form);
      }, 1000);
      console.log("form");
    }
  }

  return (
    <CSSWrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          {/* search position */}

          <FormRow
            type='search'
            name='search'
            defaultValue={search || ''}
            onChange={debounce((form)=>submit(form))}
            // onChange={(e) => submit(e.currentTarget.form)}
          />

          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            list={['all', 'pending', 'interview', 'declined']}
            defaultValue={jobStatus || 'all'}
            onChange={(e) => submit(e.currentTarget.form)}
          />

          <FormRowSelect
            labelText='job type'
            name='jobType'
            list={['all', 'full-time', 'part-time', 'internship']}
            defaultValue={jobType || 'all'}
            onChange={(e) => submit(e.currentTarget.form)}
          />

          <FormRowSelect
            name='sort'
            defaultValue={sort || 'newest'}
            list={['newest', 'oldest', 'a-z', 'z-a']}
            onChange={(e) => submit(e.currentTarget.form)}
          />

          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>
          {/* TEMP!!!! */}
          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'Search'}
          </button>
        </div>
      </Form>
    </CSSWrapper>
  );
}