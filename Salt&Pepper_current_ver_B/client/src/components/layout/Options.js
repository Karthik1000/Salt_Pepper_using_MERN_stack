import React, { useEffect, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOptions, postOptions } from '../../actions/options';
import { setAlert } from '../../actions/alert';
import { createMessage } from '../../actions/messages';
import './options.css';
import Navbar from './Navbar';

const Options = ({
  postOptions,
  getOptions,
  createMessage,
  auth,
  options: { options },
  onSubmit,
  postsuccess
}) => {
  useEffect(() => {
    getOptions();
  }, []);
  const selected_cuisines = {
    user_id: auth.user,
    selected: []
  };

  onSubmit = e => {
    e.preventDefault();
    postOptions(selected_cuisines);
    createMessage({
      cuisinesSelected: 'Your favourite cuisines have been noted!'
    });
    // return <Redirect to='/dashboard' />;
  };

  const onChange = function(id) {
    if (document.getElementById(id).checked === true) {
      for (var i = 0; i < options.length; i++) {
        if (options[i].title === id) {
          if (!selected_cuisines.selected.includes(options[i])) {
            selected_cuisines.selected.push(options[i]);
          }
        }
      }
    } else if (document.getElementById(id).checked === false) {
      for (i = 0; i < options.length; i++) {
        if (options[i].title === id) {
          if (selected_cuisines.selected.includes(options[i])) {
            const index = selected_cuisines.selected.indexOf(options[i]);
            selected_cuisines.selected.splice(index);
          }
        }
      }
    }
  };

  return (
    <Fragment>
      {
        <Fragment>
          <div className='cuisine_bg' style={{ minHeight: '100vh' }}>
            <div class='row cuisinetoprow'>
              <div class='col-lg-4 cuisinelogo'>
                <img
                  class='cuisinelogocont'
                  src='https://i.ibb.co/H7TfPXB/Logo-01.png'
                />
              </div>

              <div class='col-lg-4 cusinerow1col2'>
                <span class='cuisineheadfutura'>
                  Follow your favorite cuisines
                </span>
                <hr class='cuisinehr1' />
              </div>
              <div class='col-lg-4 cuisinenext'>
                <Link className='nextattri' to='/dashboard'>
                  Next&nbsp;&nbsp;
                  <i class='fas fa-arrow-right' style={{ fontSize: '70%' }}></i>
                </Link>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className='container'>
              <form onSubmit={onSubmit}>
                <div class='row'>
                  {options ? (
                    options.map(option => (
                      <div
                        className='col-lg-3'
                        style={{ paddingBottom: '70px' }}
                      >
                        <div class='cuisinerow2col1cont'>
                          <div
                            class='recipe'
                            style={{ overflow: 'hidden' }}
                            id='MyElement'
                          >
                            <img
                              style={{ width: '120%' }}
                              src='https://i.ibb.co/jg42fmy/28-KITCHEN1-article-Large.jpg'
                            />
                            <label style={{ width: '93%' }}>
                              <div
                                className='row'
                                style={{ paddingTop: '10px' }}
                              >
                                <div className='col-lg-10'>
                                  <div class='cuisinekarla'>{option.title}</div>
                                </div>
                                <div className='col-lg-2'>
                                  <input
                                    id={option.title}
                                    name={option.title}
                                    type='checkbox'
                                    class='cuisineinput'
                                    value={option.title}
                                    onChange={onChange.bind(this, option.title)}
                                  ></input>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h4>No cuisines </h4>
                  )}

                  <button className='cuisinesavebtn' type='submit'>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

Options.propTypes = {
  getOptions: PropTypes.func.isRequired,
  postOptions: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  postsuccess: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  options: state.options,
  postsuccess: state.postsuccess
});

export default connect(mapStateToProps, {
  getOptions,
  postOptions,
  createMessage
})(Options);
