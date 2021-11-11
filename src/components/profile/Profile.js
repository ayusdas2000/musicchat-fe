import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Spinner, Container, Button } from 'react-bootstrap';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileCourse from './ProfileCourse';
import { getProfileById } from '../../redux/actions/profile';
import ProfileForm from '../profile-forms/ProfileForm';

const Profile = ({ getProfileById, profile: { profile }, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <section style={{ margin: '4rem' }}>
      <Card
        style={{
          backgroundColor: '#ffcf09',
          borderRadius: 10
        }}>
        <Card.Body>
          <Container>
            {profile === null ? (
              <Spinner />
            ) : (
              <Container>
                <Container>
                  <Link to='/profiles'>
                    <Button style={{ marginBottom: '0.5rem' }}>Back To Profiles</Button>
                  </Link>
                  {auth.isAuthenticated &&
                    auth.loading === false &&
                    auth.user._id === profile.user._id && <ProfileForm edit={true} />}
                </Container>
                <div>
                  <ProfileTop profile={profile} />
                  <ProfileAbout profile={profile} />
                  <div>
                    <h2>Experience</h2>
                    {profile.experience.length > 0 ? (
                      <Container>
                        {profile.experience.map((experience) => (
                          <ProfileExperience key={experience._id} experience={experience} />
                        ))}
                      </Container>
                    ) : (
                      <h4>No experience credentials</h4>
                    )}
                  </div>

                  <div>
                    <h2>Courses</h2>
                    {profile.courses.length > 0 ? (
                      <Container>
                        {profile.courses.map((crc) => (
                          <ProfileCourse key={crc._id} course={crc} />
                        ))}
                      </Container>
                    ) : (
                      <h4>No course credentials</h4>
                    )}
                  </div>
                </div>
              </Container>
            )}
          </Container>
        </Card.Body>
      </Card>
    </section>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
