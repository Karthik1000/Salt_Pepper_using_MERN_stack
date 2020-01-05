import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { createMessage } from "../../actions/messages";
import { register } from "../../actions/auth_warehouse";
import PropTypes from "prop-types";
import "./register_warehouse.css";
import Navbar2 from "../layout/Navbar2";


const Register_Warehouse = ({
  setAlert,
  createMessage,
  register,
  isAuthenticated
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    locality: "",
    city: "",
    pincode: ""
  });

  const {
    name,
    email,
    password,
    password2,
    locality,
    city,
    pincode
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    var sixDigits = /\d{6}/;
    if (password !== password2) {
      // setAlert('Passwords donot match', 'danger');
      createMessage({
        passwordsNotMatch: "Passwords do not match "
      });
    } else if (
      isNaN(pincode) ||
      Math.max(Math.floor(Math.log10(Math.abs(pincode))), 0) + 1 !== 6
    ) {
      createMessage({
        pincodeError: "Please check your pincode "
      });
    } else {
      register({ name, email, password, locality, city, pincode });
      createMessage({
        registered: "Registered succesfully! "
      });
    }
  };

  if (isAuthenticated) {
    console.log("warehouse Registered Successfully");
  }
  return (
    <Fragment>
      <div className="register_restaurant_bg">
        <Navbar2/>
        <div className="row warreg_row1">
          <div className="col-lg-6"><img src="https://i.ibb.co/bKy9ZKH/warehouse-01.png" className="warimg animated fadeInLeft delay-1s" alt="warehouse-01" border="0"/></div>
          <div className="col-lg-6 resreg_row1col2">
            <div className="regreg_title">Register Warehouse</div>
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
                    className="resreg_text"
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <input
                    className="resreg_text"
                    type="text"
                    placeholder="locality"
                    name="locality"
                    value={locality}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="col-lg-6">
                  <input
                    className="resreg_text"
                    type="text"
                    placeholder="City"
                    name="city"
                    value={city}
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <input
                    className="resreg_text"
                    type="text"
                    placeholder="pincode"
                    name="pincode"
                    value={pincode}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="col-lg-6"></div>
              </div>

              <input
                type="submit"
                className="btn resreg_btn"
                value="Register"
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Register_Warehouse.propTypes = {
  setAlert: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth_warehouse.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, createMessage, register })(
  Register_Warehouse
);
