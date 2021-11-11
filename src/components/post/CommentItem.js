import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteComment } from '../../redux/actions/post';
import { Container, Image, Button } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Container style={{ width: '20vh', height: '20vh', margin: 0 }}>
      <Link to={`/profile/${user}`}>
        <Image src={avatar} alt='' roundedCircle style={{ width: '100%' }} />
        <h6 style={{ textAlign: 'center' }}>{name}</h6>
      </Link>
    </Container>
    <Container>
      <p>{text}</p>
      <p>Posted on {formatDate(date)}</p>
      {!auth.loading && user === auth.user._id && (
        <Button
          onClick={() => deleteComment(postId, _id)}
          type='button'
          variant='outline-danger'
          style={{ border: 'none' }}>
          <DeleteIcon />
        </Button>
      )}
    </Container>
    {/* <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>Posted on {formatDate(date)}</p>
      {!auth.loading && user === auth.user._id && (
        <button onClick={() => deleteComment(postId, _id)} type='button' className='btn btn-danger'>
          <i className='fas fa-times' />
        </button>
      )}
    </div> */}
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
