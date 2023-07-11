import {  faPlus, faUser, faSignOutAlt, faDashboard, faImages, faFolder, faTh }  from '@fortawesome/free-solid-svg-icons';

export const navlinks = [
  {
    name: 'Campaigns',
    icon: faTh,
    link: '/',
  },
  {
    name: 'Create',
    icon: faPlus,
    link: '/create-campaign',
  },
  {
    name: 'Profile',
    icon: faUser,
    link: '/profile',
  },
];


export default navlinks;
