import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => (
  <div>
    {bio && (
      <Fragment>
        <h2 style={{ textAlign: 'center' }}>{name.trim().split(' ')[0]}'s Bio</h2>
        <p style={{ textAlign: 'center' }}>{bio}</p>
        <div />
      </Fragment>
    )}
    <h2>Skill Set</h2>
    <div>
      {skills.map((skill, index) => (
        <div key={index}>
          <i /> {skill}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
