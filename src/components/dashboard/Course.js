import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCourse } from '../../redux/actions/profile';
import formatDate from '../../utils/formatDate';

const Course = ({ course, deleteCourse }) => {
  const courses = course.map((crc) => (
    <tr key={crc._id}>
      <td>{crc.institute}</td>
      <td className='hide-sm'>{crc.certificate}</td>
      <td>
        {formatDate(crc.from)} - {crc.to ? formatDate(crc.to) : 'Now'}
      </td>
      <td>
        <button onClick={() => deleteCourse(crc._id)} className='btn btn-danger'>
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      <h2 className='my-2'>Course Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Institute</th>
            <th className='hide-sm'>Certificate</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{courses}</tbody>
      </table>
    </div>
  );
};

Course.propTypes = {
  course: PropTypes.array.isRequired,
  deleteCourse: PropTypes.func.isRequired
};

export default connect(null, { deleteCourse })(Course);
