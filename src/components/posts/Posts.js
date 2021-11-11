import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../redux/actions/post';
import { Card, Container } from 'react-bootstrap';
import PostForm from './PostForm';
import PostItem from './PostItem';

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <div style={{ margin: '4rem' }}>
      <Card style={{ backgroundColor: '#ffcf09', borderRadius: 10 }}>
        <Card.Body>
          <h1 style={{ textAlign: 'center' }}>Posts</h1>
          <p style={{ textAlign: 'center' }}>Welcome to the community of musicians</p>
          <PostForm edit={false} />
          <Container className='posts'>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
