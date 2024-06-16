import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../assets/CSS/JobItem.css'
import { FaUserCircle } from "react-icons/fa";
import JobInfo from './JobInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useMutation } from '@tanstack/react-query';
import { customFetch } from '../utils/customFetch.js';
import { toast } from 'react-toastify';
import { useDashboardContext } from '../pages/DashboardLayout.jsx';
day.extend(advancedFormat);


export default function Job({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    createdBy,
    jobStatus,
}) {
    const date = day(createdAt).format('Do MMMM, YYYY');

    const { user } = useDashboardContext();

    return (
        <article>
            <header>
                <div className='main-icon'>{company.charAt(0)}</div>
                <div className='info'>
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${jobStatus}`}>{jobStatus}</div>
                </div>

            </div>
            <div className='creator-content'>
                {createdBy.avatar ? <img src={createdBy.avatar} alt="creator-img" className='creator-img' /> : <FaUserCircle className='creator-icon' />}
                <div>
                    <p className='creator-name'>Posted by {createdBy?.name}</p>
                    <small className='creator-email'>{createdBy?.email}</small>
                </div>
            </div>
        </article>
    )
}