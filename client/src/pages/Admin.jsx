import { redirect, useLoaderData } from 'react-router-dom';
import CSSWrapper from '../assets/wrappers/StatsContainer';
import { customFetch } from '../utils/customFetch.js';
import { toast } from 'react-toastify';
import { FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';
import StatItem from '../components/StatItem.jsx';

export const loader = async() => {
  try {
    const response = await customFetch.get('/users/admin/app-stats');
    return response.data;
  } catch (error) {
    toast.error(error?.message?.data?.message || 'Access denied!');
    return redirect('/dashboard');
  }
}

export default function Admin() {
  const {users, jobs} = useLoaderData();
  // console.log(data)

  return (
    <CSSWrapper>
      <StatItem
        title='current users'
        count={users}
        color='#e9b949'
        bcg='#fcefc7'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title='total jobs'
        count={jobs}
        color='#647acb'
        bcg='#e0e8f9'
        icon={<FaCalendarCheck />}
      />
    </CSSWrapper>
  )
}