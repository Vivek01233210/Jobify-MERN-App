import { FormRow } from '../components';
import '../assets/CSS/Profile.css'
import { Link, useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import { customFetch } from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import JobInfo from '../components/JobInfo.jsx';
import { FaRegEdit } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from 'react-icons/fa';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useRef, useState } from 'react';
day.extend(advancedFormat);

export const action = async ({ request }) => {
  const formData = await request.formData();

  const file = formData.get('avatar');
  if (file && file.size > 1000000) {  // 1 mb
    toast.error('File size must be less than 1 MB');
    return null;
  }

  try {
    await customFetch.patch('/users/update-user', formData);
    toast.success('Profile updated successfully');
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong')
  }

  return null;
}



export default function Profile() {

  const imageInputRef = useRef(null);

  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['get-my-jobs'],
    queryFn: () => customFetch.get('/jobs/my-jobs'),
  });

  // delete mutation
  const deleteMutation = useMutation({
    mutationKey: ['delete-job'],
    mutationFn: (id) => {
      return customFetch.delete(`/jobs/${id}`);
    },
  });

  const handleDelete = (jobId) => {
    deleteMutation.mutateAsync(jobId)
      .then(() => toast.success('Job deleted successfully'))
      .then(() => refetch())
      .catch((error) => toast.error(error?.response?.data?.message || 'Something went wrong'));
  };

  return (
    <>
      <div className='search-form'>
        <Form method='post' className='form' encType='multipart/form-data'>
          <h4 className='form-title'>profile</h4>

          <div className='form-center'>
            <div className='form-row image-row'>
              <div className='image-container'>
                {user.avatar ? (
                  <img src={user.avatar} alt='profile-pic' className='profile-image' onClick={() => imageInputRef.current.click()} />
                ) : (
                  <FaUserCircle className='profile-image' onClick={() => imageInputRef.current.click()} />
                )}
                <FaRegEdit className='edit-button' onClick={() => imageInputRef.current.click()}/>
              </div>
              <label htmlFor='image' className='form-label'>
                Update Image (max 1 MB):
              </label>
              <input
                type='file'
                id='avatar'
                name='avatar'
                className='form-input'
                accept='image/*'
                ref={imageInputRef}
                
                style={{ display: 'none' }}
              />
            </div>
            <FormRow type='text' name='name' defaultValue={name} />
            <FormRow
              type='text'
              labelText='last name'
              name='lastName'
              defaultValue={lastName}
            />
            <FormRow type='email' name='email' defaultValue={email} />
            <FormRow type='text' name='location' defaultValue={location} />
            <button
              className=' form-btn'
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'submitting...' : 'save changes'}
            </button>
          </div>
        </Form>
      </div>

      <div className='post-area'>
        <h4>My Posts({data?.data?.jobs?.length})</h4>
        <div className='jobs-container'>
          {data?.data?.jobs?.length === 0 && <h1>You haven't posted yet...</h1>}
          {isLoading && <h1>Loading...</h1>}
          {data?.data?.jobs?.map(job => (
            <article key={job._id}>
              <header>
                <div className='main-icon'>{job.company.charAt(0)}</div>
                <div className='info'>
                  <h5>{job.position}</h5>
                  <p>{job.company}</p>
                </div>
              </header>
              <div className='content'>
                <div className='content-center'>
                  <JobInfo icon={<FaLocationArrow />} text={job.jobLocation} />
                  <JobInfo icon={<FaCalendarAlt />} text={day(job.createdAt).format('Do MMMM, YYYY')} />
                  <JobInfo icon={<FaBriefcase />} text={job.jobType} />
                  <div className={`status ${job.jobStatus}`}>{job.jobStatus}</div>
                </div>
              </div>
              <footer className='footer'>
                <Link to={`/dashboard/edit-job/${job._id}`} className='btn'>
                  Edit
                </Link>
                <button className='btn' onClick={() => handleDelete(job._id)}>
                  Delete
                </button>
              </footer>
            </article>
          ))}
        </div>

      </div>
    </>
  )
}