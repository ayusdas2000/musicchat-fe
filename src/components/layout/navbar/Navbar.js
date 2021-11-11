import React, { Fragment } from 'react';
import './navbar.scss';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../../redux/actions/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavbarComponent = ({ auth: { isAuthenticated }, logout }) => {
  const guestLinks = (
    <div>
      <Link to='/login'>
        <Button style={{ marginRight: '1rem' }} variant='primary'>
          Sign In
        </Button>
      </Link>
      <Link to='/register'>
        <Button variant='primary'>Sign Up</Button>
      </Link>
    </div>
  );
  const authLinks = (
    <div className='button-container'>
      <Link to='/profiles'>
        <Button style={{ marginRight: '1rem' }} variant='primary'>
          <span>Profiles</span>
        </Button>
      </Link>
      <Link to='/posts'>
        <Button style={{ marginRight: '1rem' }} variant='primary'>
          <span>Posts</span>
        </Button>
      </Link>
      <Link to='/dashboard'>
        <Button style={{ marginRight: '1rem' }} variant='primary'>
          <span>Dashboard</span>
        </Button>
      </Link>
      <Link to='/' onClick={logout}>
        <Button style={{ marginRight: '1rem' }} variant='danger'>
          <span>Sign Out</span>
          <LogoutIcon style={{ marginLeft: '0.5rem' }} />
        </Button>
      </Link>
    </div>
  );
  return (
    <Navbar collapseOnSelect expand='lg' style={{ backgroundColor: '#ffcf09' }}>
      <Container>
        <Navbar.Brand>
          {' '}
          <Link style={{ textDecoration: 'none' }} to='/'>
            MusicChat{' '}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav>
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavbarComponent.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavbarComponent);
