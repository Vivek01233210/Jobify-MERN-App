import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
// import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

const links = [
  // '.' is the same as '/dashboard' in this case
  { text: 'all jobs', path: '.', icon: <FaWpforms /> },
  { text: 'add jobs', path: 'add-jobs', icon: <MdQueryStats /> },
  { text: 'my stats', path: 'stats', icon: <IoBarChartSharp /> },
  // { text: 'profile', path: 'profile', icon: <ImProfile /> },
  { text: 'admin', path: 'admin', icon: <MdAdminPanelSettings /> },
];

export default links;