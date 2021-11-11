import React, { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../redux/actions/post';
import CreateIcon from '@mui/icons-material/Create';

const PostForm = ({ edit, addPost }) => {
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSubmit = (e) => {
    e.preventDefault();
    addPost({ text }, edit);
    setText('');
    handleClose();
  };
  return (
    <div>
      <Button style={{ margin: '1rem' }} variant='primary' onClick={handleShow}>
        {edit ? 'Edit Post' : 'Create Post'}
        <CreateIcon style={{ marginLeft: '1rem' }} />
      </Button>
      <Modal show={show} onHide={handleClose} onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? 'Edit Post' : 'Create Post'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='myPostForm'>
            <Form.Group>
              <Form.Label>Create a Post</Form.Label>
              <FloatingLabel controlId='floatingTextarea' label='Create a Post' className='mb-3'>
                <Form.Control
                  placeholder='Create a Post'
                  name='text'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
                <Form.Text>Write Something</Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Form id='myPostForm'>
            <Button type='submit' id='myForm' variant='primary'>
              {edit ? 'Edit Post' : 'Create Post'}
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
