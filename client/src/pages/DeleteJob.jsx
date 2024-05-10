import { toast } from "react-toastify";
import { customFetch } from "../utils/customFetch.js";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    console.log("from delete comp")
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success('Job deleted successfully');
  } catch (error) {
    toast.error(error?.message?.data?.message || 'Something went wrong');
    return error;
  }
  return redirect('/dashboard');
}

export default function DeleteJob() {
  return (
    <></>
  )
}
// with react router v6 we can set a component to return no jsx but to return a function