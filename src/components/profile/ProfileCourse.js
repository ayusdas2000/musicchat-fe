import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';

const ProfileCourse = ({
  course: { school, degree, fieldofstudy, current, to, from, description }
}) => (
  <div>
    <h3>{school}</h3>
    <p>
      {formatDate(from)} - {to ? formatDate(to) : 'Now'}
    </p>
    <p>
      <strong>Degree: </strong> {degree}
    </p>
    <p>
      <strong>Field Of Study: </strong> {fieldofstudy}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileCourse.propTypes = {
  course: PropTypes.object.isRequired
};

export default ProfileCourse;
