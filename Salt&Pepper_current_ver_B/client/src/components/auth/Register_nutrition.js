import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth_nutritionist";
import { createMessage } from "../../actions/messages";
import PropTypes from "prop-types";
import "./register_nutrition.css";
import Navbar2 from "../layout/Navbar2";

const Register_nutrition = ({
  setAlert,
  createMessage,
  register,
  isAuthenticated
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      // setAlert('Passwords do not match', 'danger');
      createMessage({
        passwordsNotMatch: "Passwords do not match "
      });
    } else {
      register({ name, email, password });
      createMessage({
        registered: "Registered succesfully! "
      });
    }
  };

  return (
    <Fragment>
      <Navbar2 />
      <div className="register_restaurant_bg">
        <Navbar2 />
        <div className="row nutreg_row1">
          <div className="col-lg-6">
          
            <img
              src="https://i.ibb.co/QcXs4rR/nutrition-01.png"
              className="animated bounceInUp delay-1s nutreg_img"
              alt="restaurant-01"
              border="0"
            />
          </div>
          <div className="col-lg-6 resreg_row1col2">
            <div className="regreg_title">Register Nutritionist</div>
            <hr class="resreghr1" />
            <form className="form karla" onSubmit={e => onSubmit(e)}>
              <div className="row">
                <div className="col-lg-6">
                  <input
                    className="resreg_text"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="col-lg-6">
                  <input
                    className="resreg_text"
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <input
                    className="resreg_text"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="col-lg-6">
                  <input
                    type="password"
                    className="resreg_text"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>

              <input className="btn resreg_btn" type="submit" value="Register" />
            </form>
          </div>
        </div>
        <br />
        <br /> <br />
        <br />
      </div>
      
        
        <br />
        {/* <div>
          <form className="karla" onSubmit={e => onSubmit(e)}>
            <input
              className="resreg_text"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
            />
            <input
              className="resreg_text"
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
            <input
              className="resreg_text"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
            />

            <input
              type="password"
              className="resreg_text"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={e => onChange(e)}
            />
            <br />
            <input className="reg_btn" type="submit" value="Register" />
          </form>
        </div> */}
    </Fragment>
  );
};

Register_nutrition.propTypes = {
  setAlert: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth_nutritionist.isAuthenticated
});

export default connect(mapStateToProps, {
  setAlert,
  createMessage,
  register,
  createMessage
})(Register_nutrition);
