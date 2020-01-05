import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import './navbar.css';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Fragment>
      <div
        className='navbar fixed-top navbar-expand-lg navbar-dark karla'
        id='nav_white'
        style={{ backgroundColor: '#000000' }}
      >
        <div className='nav-item dropdown'>
          <a
            className='nav-link dropdown-toggle'
            href='#'
            id='navbarDropdown'
            role='button'
            data-toggle='dropdown'
          >
            Search
          </a>
          <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
            <Link to='/searchRecipes' className='dropdown-item'>
              Search Recipes
            </Link>

            <Link to='/searchUsers' className='dropdown-item'>
              Search Users
            </Link>
          </div>
        </div>

        <div className='nav-item nav-link active'>
          <Link to='/uploadRecipe' id='nav_white'>
            Upload
          </Link>
        </div>
        <div className='nav-item nav-link active'>
          <Link to='/bookmarks' id='nav_white'>
            Bookmarks
          </Link>
        </div>
        <div className='nav-item nav-link active'>
          <a href='/dashboard'>
            <img
              src='https://i.ibb.co/mvYK8k6/Nav-logo-01.png'
              alt='Nav-logo-01'
              border='0'
              style={{ width: '50%' }}
            />
          </a>
        </div>
        <div className='nav-item nav-link active'>
          <Link to='/myRecipes' id='nav_white'>
            My Recipes
          </Link>
        </div>
        <div className='nav-item nav-link active'>
          <Link to='/cart' id='nav_white'>
            Cart
          </Link>
        </div>
        <div className='nav-item dropdown'>
          <a
            className='nav-link dropdown-toggle'
            href='#'
            id='navbarDropdown'
            role='button'
            data-toggle='dropdown'
          >
            Hey you!
          </a>
          <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
            <Link to='/myprofile' className='dropdown-item'>
              Profile
            </Link>

            <a onClick={logout} href='/login' className='dropdown-item'>
              logout
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <div
      className='navbar fixed-top navbar-expand-lg navbar-dark'
      style={{ backgroundColor: '#000000' }}
    >
      <div className='nav-item nav-link active'>
        <Link to='/register'>Register</Link>
      </div>
      <div className='nav-item nav-link active'>
        <a href='/dashboard'>
          <img
            src='https://i.ibb.co/mvYK8k6/Nav-logo-01.png'
            alt='Nav-logo-01'
            border='0'
            style={{ width: '22%' }}
          />
        </a>
      </div>

      <div className='nav-item nav-link active'>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );

  return (
    <Fragment>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { logout })(Navbar);
