import React from 'react';
import ProfileForm from '../profile-forms/ProfileForm';
import AddExperience from '../profile-forms/AddExperience';
import AddCourse from '../profile-forms/AddCourse';

const DashboardActions = () => {
  return (
    <div
      style={{
        flexWrap: 'wrap',
        display: 'flex',
        gap: '0.5rem'
      }}>
      <ProfileForm edit={true} />
      <AddExperience />
      <AddCourse />
    </div>
  );
};

export default DashboardActions;
