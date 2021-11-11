import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PostItem from '../posts/PostItem';
import { Spinner, Button, Card } from 'react-bootstrap';
import { getPost } from '../../redux/actions/post';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <div style={{ margin: '4rem' }}>
      <Card style={{ backgroundColor: '#ffcf09', borderRadius: 10 }}>
        <Card.Body>
          <Link to='/posts'>
            <Button style={{ marginBottom: '2rem' }}>Back To Posts</Button>
          </Link>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <div>
            {post.comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
