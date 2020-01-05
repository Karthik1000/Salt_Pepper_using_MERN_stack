import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import './get.css';
import Spinner from './spinner';

export class Output extends Component {
  render() {
    const nutritionist = this.props.nutritionist;

    return (
      <Fragment>
        {nutritionist.loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <div className='uptop'>
              <div class='container'>
                <div class='uptop_cont'>
                  <Link to='/'>
                    Dr.Eats&nbsp;
                    <span
                      class='fas fa-stethoscope'
                      style={{ fontSize: 'smaller' }}
                    ></span>
                  </Link>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className='container'>
              <div className='docrec'>
                Meals
                <hr className='dochr1' />
              </div>
              <br />
              <br />
              <div className='myrecbot renner'>
                {nutritionist.recipes
                  ? nutritionist.recipes.map(rec => (
                      <div className='card shadow p-3 mb-5 bg-white rounded'>
                        <div>
                          {rec.title &&
                          rec.cuisine &&
                          rec.calories &&
                          rec.diet ? (
                            <div>
                              <span>{rec.title}</span> &nbsp;&nbsp;
                              <span
                                className='fas fa-circle'
                                style={{ fontSize: '1vh' }}
                              ></span>
                              &nbsp;&nbsp;
                              <span className='reccuisine'>{rec.cuisine}</span>
                              &nbsp;&nbsp;
                              <span
                                className='fas fa-circle'
                                style={{ fontSize: '1vh' }}
                              ></span>
                              &nbsp;&nbsp;
                              <span>{rec.diet}</span>
                              &nbsp;&nbsp;
                              <span
                                className='fas fa-circle'
                                style={{ fontSize: '1vh' }}
                              ></span>
                              &nbsp;&nbsp;
                              <span>{rec.calories} Calories</span>
                            </div>
                          ) : (
                            console.log('nothing')
                          )}
                        </div>

                        <br />
                      </div>
                    ))
                  : ''}
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  nutritionist: state.nutritionist
});

export default connect(mapStateToProps, null)(Output);
