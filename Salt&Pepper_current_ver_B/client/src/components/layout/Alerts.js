import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
      if (error.msg.message)
        alert.error(`Message: ${error.msg.message.join()}`);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      if (error.msg.username) alert.error(error.msg.username.join());
    }

    if (message !== prevProps.message) {
      if (message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
      if (message.cuisinesSelected) {
        alert.info(message.cuisinesSelected);
      }
      if (message.pincodeError) {
        alert.error(message.pincodeError);
      }
      if (message.bookmark) {
        alert.info(message.bookmark);
      }
      if (message.Follow) {
        alert.info(message.Follow);
      }
      if (message.titleRequired) {
        alert.info(message.titleRequired);
      }
      if (message.cuisineRequired) {
        alert.info(message.cuisineRequired);
      }
      if (message.dietRequired) {
        alert.info(message.dietRequired);
      }
      if (message.caloriesRequired) {
        alert.info(message.caloriesRequired);
      }
      if (message.procedureRequired) {
        alert.info(message.procedureRequired);
      }
      if (message.registered) {
        alert.success(message.registered);
      }
      if (message.uploaded) {
        alert.success(message.uploaded);
      }
      if (message.payment) {
        alert.success(message.payment);
      }
      if (message.cannotfollow) {
        alert.info(message.cannotfollow);
      }
      if (message.alreadyFollowing) {
        alert.info(message.alreadyFollowing);
      }
      if (message.addToCart) {
        alert.info(message.addToCart);
      }
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
