import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../redux/actions/profile';
import { Card, Container } from 'react-bootstrap';
import DashboardActions from './DashboardActions';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Button, Modal, Spinner } from 'react-bootstrap';
import ProfileForm from '../profile-forms/ProfileForm';
import Experience from './Experience';
import Course from './Course';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile } }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await getCurrentProfile();
      setLoading(false);
    }
    getData();
  }, [getCurrentProfile]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteAndCloseModal = () => {
    deleteAccount();
    setShow(false);
  };
  return (
    <section style={{ margin: '4rem' }}>
      <Card style={{ backgroundColor: '#ffcf09', borderRadius: 10 }}>
        <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ textAlign: 'center' }}>
            Dashboard
            <DashboardIcon />
          </h1>
          <p style={{ textAlign: 'center' }}>Welcome {user && user.name}</p>
          {loading ? (
            <Spinner animation='border' />
          ) : (
            <section>
              {profile !== null ? (
                <Fragment>
                  <DashboardActions />
                  <Container>
                    <Experience experience={profile.experience} />
                  </Container>
                  <Container>
                    <Course course={profile.courses} />
                  </Container>

                  <div>
                    <Button style={{ marginTop: '0.5rem' }} variant='danger' onClick={handleShow}>
                      Delete My Account{' '}
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>This action can not be reverted</Modal.Body>
                      <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                          No
                        </Button>
                        <Button variant='primary' onClick={deleteAndCloseModal}>
                          Yes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <p>You have not yet setup a profile, please add some info</p>
                  <ProfileForm edit={false} />
                </Fragment>
              )}
            </section>
          )}
        </Card.Body>
      </Card>
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
