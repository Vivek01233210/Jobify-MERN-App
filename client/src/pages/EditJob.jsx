import { FormRow, FormRowSelect } from '../components';
import CSSWrapper from '../assets/wrappers/DashboardFormPage';
// import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { useLoaderData } from 'react-router-dom';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils/customFetch';

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    // console.log(data)
    return data;
  } catch (error) {
    toast.error(error?.message?.data?.message || 'Something went wrong');
    return redirect('/dashboard/all-jobs');
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data)

  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success('Job updated successfully');
    return redirect('/dashboard/profile');
  } catch (error) {
    toast.error(error?.message?.data?.message || 'Something went wrong');
    return error;
  }
}

export default function EditJob() {

  const { job } = useLoaderData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <CSSWrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' defaultValue={job.position} />
          <FormRow type='text' name='company' defaultValue={job.company} />
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={job.jobLocation}
          />

          <FormRowSelect
            name='jobStatus'
            labelText='job status'
            defaultValue={job.jobStatus}
            list={['interview', 'declined', 'pending']}
          />
          <FormRowSelect
            name='jobType'
            labelText='job type'
            defaultValue={job.jobType}
            list={['full-time', 'part-time', 'internship']}
          />
          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </CSSWrapper>
  )
}