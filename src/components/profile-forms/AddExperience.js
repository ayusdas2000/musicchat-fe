import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { addExperience } from '../../redux/actions/profile';

const AddExperience = ({ addExperience }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    company: '',
    contract: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });
  const { company, contract, location, from, to, current, description } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    handleClose();
    addExperience(formData);
  };
  return (
    <div>
      <Button variant='primary' onClick={handleShow}>
        Add Experience
      </Button>
      <Modal show={show} onHide={handleClose} scrollable={true} onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Add any musician/vocalist positions that you have had in the past</p>
          <Form id='myExperienceForm'>
            <Form.Text>* = required field</Form.Text>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='* Position Title'
                name='contract'
                value={contract}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='* Company'
                name='company'
                value={company}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Location'
                name='location'
                value={location}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>From Date</Form.Label>
              <Form.Control type='date' name='from' value={from} onChange={onChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Check
                type='checkbox'
                name='current'
                checked={current}
                value={current}
                label='Current Job'
                onChange={() => {
                  setFormData({ ...formData, current: !current });
                }}
              />{' '}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='date'
                name='to'
                value={to}
                onChange={onChange}
                disabled={current}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                as='textarea'
                name='description'
                cols='30'
                rows='5'
                placeholder='Job Description'
                value={description}
                onChange={onChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Form id='myExperienceForm'>
            <Button type='submit' id='myExperienceForm' variant='primary'>
              Save Changes
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(AddExperience);
