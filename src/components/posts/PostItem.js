import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { Container, Image, Button } from 'react-bootstrap';
import { addLike, removeLike, deletePost } from '../../redux/actions/post';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4rem' }}>
      <Container style={{ width: '20vh', height: '20vh', margin: 0 }}>
        <Link to={`/profile/${user}`}>
          <Image src={avatar} alt='' roundedCircle style={{ width: '100%' }} />
          <h6 style={{ textAlign: 'center' }}>{name}</h6>
        </Link>
      </Container>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          margin: 0
        }}>
        <p>{text}</p>
        <p>Posted on {formatDate(date)}</p>

        {showActions && (
          <Container>
            <Button
              onClick={() => addLike(_id)}
              type='button'
              variant='outline-secondary'
              style={{ border: 'none' }}>
              <ThumbUpIcon />
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </Button>
            <Button
              onClick={() => removeLike(_id)}
              type='button'
              variant='outline-secondary'
              style={{ border: 'none' }}>
              <ThumbDownIcon />
            </Button>
            <Link to={`/posts/${_id}`}>
              <Button type='button' variant='secondary' style={{ border: 'none' }}>
                Discussion{' '}
                {comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
              </Button>
            </Link>
            {!auth.loading && user === auth.user._id && (
              <Button
                onClick={() => deletePost(_id)}
                type='button'
                variant='outline-danger'
                style={{ border: 'none' }}>
                <DeleteIcon />
              </Button>
            )}
          </Container>
        )}
      </Container>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);
