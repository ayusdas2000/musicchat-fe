import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image, Container, Button } from 'react-bootstrap';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <div style={{ marginTop: '5rem' }}>
      <Container style={{ width: '40vh', height: '40vh', marginLeft: 'auto' }}>
        <Image src={avatar} alt='' roundedCircle style={{ width: '100%' }} />
      </Container>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ textAlign: 'center' }}>{name}</h2>
        <p style={{ textAlign: 'center' }}>
          {status} {company && <span> at {company}</span>}
        </p>
        <p style={{ textAlign: 'center' }}>{location && <span>{location}</span>}</p>
        <Container style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Link style={{ width: '7rem' }} to={`/profile/${_id}`}>
            <Button variant='primary'>View Profile</Button>
          </Link>
        </Container>
      </div>
      <ul style={{ marginTop: '4rem' }}>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index}>
            <i /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
