import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCourse } from '../../redux/actions/profile';

const AddCourse = ({ addCourse }) => {
  const [formData, setFormData] = useState({
    institute: '',
    certificate: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const { institute, certificate, fieldofstudy, from, to, description, current } = formData;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    handleClose();
    addCourse(formData);
  };
  return (
    <div>
      <>
        <Button variant='primary' onClick={handleShow}>
          Add Course
        </Button>

        <Modal show={show} onHide={handleClose} scrollable={true} onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Add any Institute or bootcamp that you have attended</p>
            <Form id='myCourseForm'>
              <Form.Text>* = required field</Form.Text>
              <Form.Group className='mb-3'>
                <Form.Control
                  type='text'
                  placeholder='* Institute or Bootcamp'
                  name='institute'
                  value={institute}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Control
                  type='text'
                  placeholder='Certificate'
                  name='certificate'
                  value={certificate}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Control
                  type='text'
                  placeholder='Field of Study'
                  name='fieldofstudy'
                  value={fieldofstudy}
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
                  label='Currently Pursuing '
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
                  placeholder='Course Description'
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
              <Button type='submit' id='myCourseForm' variant='primary'>
                Save Changes
              </Button>
            </Form>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};
AddCourse.propTypes = {
  addCourse: PropTypes.func.isRequired
};

export default connect(null, { addCourse })(AddCourse);
