import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <div className='landing_bg'>
        <div className='row row1'>
          <div className='col-lg-6 row1col1 animated zoomInLeft delay-1s'>
            <img className='logo' src='https://i.ibb.co/H7TfPXB/Logo-01.png' />
          </div>

          <div className='col-lg-6 row1col2 animated zoomInRight delay-1s'>
            <span className='futura'>Welcome</span>
            <br />
            <br />
            <span className='karla'></span>Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt magna volutpat. Ut wisi enim ad minim veniam, quis nostrud
            exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
            commodo consequat. Duis autem vel eum iriure dolor in hendrerit in
            vulputate velit esse molestie consequat,
          </div>
        </div>

        <div className='row karla row2 animated zoomInDown delay-2s'>
          <div className='col-lg-6 row2col1'>
            <div class='dropdown show'>
              <a
                class='btn dropdown-toggle signupbtn'
                href='#'
                role='button'
                id='dropdownMenuLink'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                Sign up
              </a>

              <div
                class='dropdown-menu resreg_white'
                aria-labelledby='dropdownMenuLink'
              >
                <Link to='/register' class='dropdown-item'>
                  Sign up as User
                </Link>

                <div class='dropdown-divider'></div>

                <Link to='/register_restaurant' class='dropdown-item'>
                  Sign up as Restaurant
                </Link>

                <div class='dropdown-divider'></div>

                <Link to='/register_warehouse' class='dropdown-item'>
                  Sign up as Warehouse
                </Link>

                <div class='dropdown-divider'></div>

                <Link to='/register_nutrition' class='dropdown-item'>
                  Sign up as Nutritionist
                </Link>
              </div>
            </div>
          </div>
          <div className='col-lg-6 row2col2'>
            <Link to='/login'>
              <button className='loginbtn'>Login</button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
