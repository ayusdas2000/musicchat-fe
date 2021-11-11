import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner, Card, Container } from 'react-bootstrap';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../redux/actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <section style={{ margin: '4rem' }}>
      <Card
        style={{
          backgroundColor: '#ffcf09',
          borderRadius: 10
        }}>
        <Card.Body>
          <Container>
            {loading ? (
              <Spinner />
            ) : (
              <Container>
                <Card.Title style={{ textAlign: 'center' }}>Musicians</Card.Title>
                <Card.Subtitle style={{ textAlign: 'center' }}>
                  Browse and connect with musicians
                </Card.Subtitle>
                <div className='profiles'>
                  {profiles.length > 0 ? (
                    profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />)
                  ) : (
                    <h4>No profiles found...</h4>
                  )}
                </div>
              </Container>
            )}
          </Container>
        </Card.Body>
      </Card>
    </section>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
