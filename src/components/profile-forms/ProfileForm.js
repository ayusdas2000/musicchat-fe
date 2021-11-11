import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../redux/actions/profile';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};

const ProfileForm = ({ profile: { profile, loading }, createProfile, getCurrentProfile, edit }) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills)) profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);
  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    handleClose();
    createProfile(formData, profile ? true : false);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant='primary' onClick={handleShow}>
        {edit ? 'Edit Profile' : 'Create Profile'}
      </Button>
      <Modal show={show} onHide={handleClose} scrollable={true} onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? 'Edit Profile' : 'Create Profile'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='myForm'>
            <Form.Text>* = required field</Form.Text>
            <Form.Group className='mb-3'>
              <Form.Select name='status' value={status} onChange={onChange}>
                <option>* Select your music experience level</option>
                <option value='Just Exploring'>Just Exploring</option>
                <option value='Amateur'>Amateur</option>
                <option value='Hobby Artist'>Hobby Artist</option>
                <option value='Proffessional'>Proffessional</option>
              </Form.Select>
              <Form.Text>Give us an idea of where you are at in your career</Form.Text>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Company/Band</Form.Label>
              <Form.Control
                type='text'
                placeholder='Company'
                name='company'
                value={company}
                onChange={onChange}
              />
              <Form.Text>Could be your own company or one you work for or your band</Form.Text>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Website</Form.Label>
              <Form.Control
                type='text'
                placeholder='Website'
                name='website'
                value={website}
                onChange={onChange}
              />
              <Form.Text>Could be your own or a company/band website</Form.Text>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Location'
                name='location'
                value={location}
                onChange={onChange}
              />
              <Form.Text>City & state suggested (eg. Vadodara, Gujarat)</Form.Text>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Skills</Form.Label>
              <Form.Control
                type='text'
                placeholder='* Skills'
                name='skills'
                value={skills}
                onChange={onChange}
              />
              <Form.Text>Please use comma separated values (eg. Guitar, Flute, Tabla)</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>A short bio of yourself</Form.Label>
              <FloatingLabel controlId='floatingTextarea' label='Bio' className='mb-3'>
                <Form.Control
                  placeholder='A short bio of yourself'
                  name='bio'
                  value={bio}
                  onChange={onChange}
                />
                <Form.Text>Tell us a little about yourself</Form.Text>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Button
                variant='primary'
                type='button'
                onClick={() => toggleSocialInputs(!displaySocialInputs)}>
                Add Social Networks (optional)
              </Button>
            </Form.Group>
            <Form.Group>
              {displaySocialInputs && (
                <Fragment>
                  <Form.Group className='mb-3'>
                    <Form.Control
                      type='text'
                      placeholder='Twitter URL'
                      name='twitter'
                      value={twitter}
                      onChange={onChange}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Control
                      type='text'
                      placeholder='Facebook URL'
                      name='facebook'
                      value={facebook}
                      onChange={onChange}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Control
                      type='text'
                      placeholder='YouTube URL'
                      name='youtube'
                      value={youtube}
                      onChange={onChange}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Control
                      type='text'
                      placeholder='Linkedin URL'
                      name='linkedin'
                      value={linkedin}
                      onChange={onChange}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Control
                      type='text'
                      placeholder='Instagram URL'
                      name='instagram'
                      value={instagram}
                      onChange={onChange}
                    />
                  </Form.Group>
                </Fragment>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Form id='myForm'>
            <Button type='submit' id='myForm' variant='primary'>
              {edit ? 'Edit Profile' : 'Create Profile'}
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(ProfileForm);
