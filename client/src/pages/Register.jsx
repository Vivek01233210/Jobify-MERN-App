import { Logo, FormRow } from "../components"
import CSSWrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import { customFetch } from "../utils/customFetch.js";
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successfully');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg || error);
    return error;
  }
}

export default function Register() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <CSSWrapper>
      <Form method="post" className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow
          type='text'
          name='name'
          // defaultValue="Vivek"
        />
        <FormRow
          type='text'
          name='lastName'
          labelText='last name'
          // defaultValue="Sagar"
        />
        <FormRow
          type='text'
          name='location'
          // defaultValue="Bihar"
        />
        <FormRow
          type='email'
          name='email'
          // defaultValue="vivek@gmail.com"
        />
        <FormRow
          type='password'
          name='password'
          // defaultValue="test1234"
        />

        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Register'}
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </CSSWrapper>
  )
}