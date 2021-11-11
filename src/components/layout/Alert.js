import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = ({ alerts }) =>
  alerts.map((alert) => {
    let notify;
    if (alert.alertType === 'success') {
      notify = () => toast.success(alert.msg, { toastId: alert.id });
    } else if (alert.alertType === 'danger') {
      notify = () => toast.error(alert.msg, { toastId: alert.id });
    }
    notify();
    return (
      <ToastContainer
        key={alert.id}
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    );
  });

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
