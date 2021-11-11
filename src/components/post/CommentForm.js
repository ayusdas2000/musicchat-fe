import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../redux/actions/post';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div>
      <div>
        <h3>Leave a Comment</h3>
      </div>
      <Form
        style={{ width: '30rem' }}
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}>
        <Form.Group controlId='exampleForm.ControlTextarea1'>
          <FloatingLabel controlId='floatingTextarea' label='Comment Here' className='mb-3'>
            <Form.Control
              as='textarea'
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Button variant='primary' type='submit' style={{ margin: '1rem' }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
