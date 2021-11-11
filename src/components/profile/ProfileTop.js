import React from 'react';
import PropTypes from 'prop-types';
import { Container, Image } from 'react-bootstrap';
import LanguageIcon from '@mui/icons-material/Language';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div>
      <Container style={{ width: '40vh', height: '40vh', marginLeft: 'auto' }}>
        <Image src={avatar} alt='' roundedCircle style={{ width: '100%' }} />
      </Container>
      <h1 style={{ textAlign: 'center' }}>{name}</h1>
      <p style={{ textAlign: 'center' }}>
        {status} {company ? <span> at {company}</span> : null}
      </p>
      <p style={{ textAlign: 'center' }}>{location ? <span>{location}</span> : null}</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {website ? (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <LanguageIcon />
          </a>
        ) : null}
        {social
          ? Object.entries(social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a key={key} href={value} target='_blank' rel='noopener noreferrer'>
                  {key === 'instagram' ? (
                    <InstagramIcon />
                  ) : key === 'youtube' ? (
                    <YouTubeIcon />
                  ) : key === 'twitter' ? (
                    <TwitterIcon />
                  ) : key === 'facebook' ? (
                    <FacebookIcon />
                  ) : (
                    <LinkedInIcon />
                  )}
                </a>
              ))
          : null}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
