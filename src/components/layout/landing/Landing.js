import React from 'react';
import './landing.scss';
import { Card, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <section className='landing'>
      <div className='card-container'>
        <Card
          style={{
            backgroundColor: '#ffcf09',
            borderRadius: 10,
            opacity: '75%'
          }}>
          <Card.Body>
            <Card.Text>Welcome to MusicChat-- Social Media only for musicians</Card.Text>
            <Link to='/login'>
              <Button style={{ marginRight: '15rem' }} variant='primary'>
                Sign In
              </Button>
            </Link>
            <Link to='/register'>
              <Button variant='primary'>Sign Up</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
