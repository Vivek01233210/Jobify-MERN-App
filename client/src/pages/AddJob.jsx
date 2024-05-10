import { Form, redirect, useNavigation, useOutletContext } from 'react-router-dom';
import CSSWrapper from '../assets/wrappers/DashboardFormPage';
import FormRow from '../components/FormRow.jsx';
import { customFetch } from '../utils/customFetch.js';
import { toast } from 'react-toastify';
import FormRowSelect from '../components/FormRowSelect.jsx';


export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  // console.log(data)

  try {
    await customFetch.post('/jobs', data);
    toast.success('Job added successfully');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.message || 'An error occurred')
    return error;
  }
}

export default function AddJob() {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <CSSWrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>add job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' />
          <FormRow type='text' name='company' />
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            list={['interview', 'declined', 'pending']}
            defaultValue='pending'
          />
          <FormRowSelect
            labelText='job type'
            name='jobType'
            list={['full-time', 'part-time', 'internship']}
            defaultValue='full-time'
          />
          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </Form>
    </CSSWrapper>)
}