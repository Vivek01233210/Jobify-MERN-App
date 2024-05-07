import { Form, Link, redirect, useNavigation } from "react-router-dom";

import { Logo, FormRow } from "../components"
import CSSWrapper from '../assets/wrappers/RegisterAndLoginPage';
import { customFetch } from "../utils/customFetch.js";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successfully');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg || error);
    return error;
  }
}

export default function Login() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <CSSWrapper>
      <Form method="post" className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow
          type='email'
          name='email'
          // defaultValue='vivek@gmail.com'
        />
        <FormRow
          type='password'
          name='password'
          // defaultValue='test1234'
        />
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Login'}
        </button>
        {/* <button type='button' className='btn btn-block'>
          explore the app
        </button> */}
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </CSSWrapper>
  )
}