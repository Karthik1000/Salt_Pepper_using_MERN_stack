import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfiles } from '../../actions/profile';
import { getAllRecipes, getRecipe } from '../../actions/recipe';
import { getAllResRecipes } from '../../actions/resrecipe';
import { getOptions } from '../../actions/options';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';
import './dashboard.css';

export class Dashboard extends Component {
  static propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getAllRecipes: PropTypes.func.isRequired,
    getAllResRecipes: PropTypes.func.isRequired,
    getOptions: PropTypes.func.isRequired,
    getRecipe: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getProfiles();
    this.props.getAllRecipes();
    this.props.getAllResRecipes();
    this.props.getOptions();
  }
  render() {
    const profile = this.props.profile;
    const recipe = this.props.recipe;
    const resrecipe = this.props.resrecipe;
    const options = this.props.options;

    const cuisine_array = [];
    const fav_cuisine_array = [];
    const following_array = [];

    if (profile.profile && profile.profile.following) {
      const following = profile.profile.following;
      for (var x of following) {
        following_array.push(x._id);
      }
    }

    if (
      profile.profile &&
      profile.profile.user &&
      profile.profile.user.fav_cuisines &&
      options.options
    ) {
      for (var i of profile.profile.user.fav_cuisines) {
        fav_cuisine_array.push(i._id);
      }

      for (i of options.options) {
        if (fav_cuisine_array.includes(i._id)) {
          cuisine_array.push(i.title);
        }
      }
    }

    return (
      <Fragment>
        <Fragment>
          {profile.loading && recipe.loading && resrecipe.loading ? (
            <Spinner />
          ) : profile.profile && recipe.recipes ? (
            <Fragment>
              <Navbar />
              <br />
              <div className='dashboard_bg animated fadeInDown delay-1s'>
                <div className='pasta'>
                  <div className='row center Drow1'>
                    <div className='col-lg-6 Drow1col1'></div>
                    <div className='col-lg-6 Drow1col2'></div>
                  </div>
                  <div className='row center Drow2'>
                    <div className='col-lg-4 Drow2col1'>
                      <Link to='/uploadRecipe' id='uploadrec_dash'>
                        Upload
                        <br /> &nbsp;Recipe&nbsp;
                        <span className='fa fa-plus'></span>
                      </Link>
                    </div>
                    <div className='col-lg-3 Drow2col2'></div>
                    <div className='col-lg-3 Drow2col3'></div>
                    <div className='col-lg-3 Drow2col4'></div>
                  </div>
                </div>

                <p>
                  <br />
                  <div className='container' style={{ textAlign: 'center' }}>
                    <i className='fas fa-user'></i> Welcome{' '}
                    {profile.profile &&
                    profile.profile.user &&
                    profile.profile.user.name ? (
                      profile.profile.user.name
                    ) : (
                      <Spinner />
                    )}
                  </div>
                </p>
                {/* <div className='row center karla Drow3'>
                  <div className='col-lg-2 Drowcol1'>
                    <span
                      class='fa fa-filter'
                      style={{ fontSize: 'small' }}
                    ></span>
                    &nbsp;Filter
                  </div>
                  <div className='col-lg-2 Drowcol2'>Your Picks</div>
                  <div className='col-lg-2 Drowcol3'>BlogSpot</div>
                  <div className='col-lg-2 Drowcol4'>Following</div>
                  <div className='col-lg-2 Drowcol5'>
                    <Link to='/uploadRecipe' className='dashupload'>
                      Upload Recipe
                    </Link>
                    &nbsp;
                    <span
                      className='fa fa-plus'
                      style={{ fontSize: '11px' }}
                    ></span>
                  </div>
                </div> */}
                <br />
                <br />
                <br />
                <div className='row animated fadeInUp delay-2s'>
                  {recipe.recipes ? (
                    recipe.recipes.map(rec => (
                      <Fragment>
                        {rec.user &&
                        rec.title &&
                        rec.cuisine &&
                        rec._id &&
                        profile.profile &&
                        profile.profile.user &&
                        profile.profile.user._id ? (
                          (following_array.includes(rec.user._id) ||
                            cuisine_array.includes(rec.cuisine)) &&
                          rec.user._id !== profile.profile.user._id ? (
                            <div className='col-lg-3'>
                              <div
                                style={{
                                  margin: 'auto',
                                  overflow: 'hidden',
                                  width: '70%',
                                  borderRadius: '15px'
                                }}
                              >
                                {rec.images ? (
                                  <div>
                                    {rec.images.map(image => (
                                      <Fragment>
                                        <div>
                                          <img
                                            className='dash_img2'
                                            src={image}
                                          />
                                        </div>
                                      </Fragment>
                                    ))}
                                  </div>
                                ) : (
                                  ''
                                )}{' '}
                                <div>
                                  <img
                                    className='dot dash_avatar'
                                    src={rec.user.avatar}
                                  />
                                </div>
                                <div className='dash_rc_bg'>
                                  <div className='dash_rc_c1'>
                                    by {rec.user.name} &nbsp;&nbsp;&nbsp;
                                  </div>
                                  <br />
                                  <div
                                    className='dash_rc_c2'
                                    onClick={this.props.getRecipe.bind(
                                      this,
                                      rec._id
                                    )}
                                  >
                                    <Link
                                      id='dash_link_rec'
                                      to={`/recipe/${rec._id}`}
                                    >
                                      {' '}
                                      {rec.title}{' '}
                                    </Link>{' '}
                                    <br />
                                    {rec.cuisine}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ''
                          )
                        ) : (
                          <Spinner />
                        )}
                      </Fragment>
                    ))
                  ) : (
                    <Spinner />
                  )}
                </div>
                <div
                  style={{ fontFamily: 'Futura Md BT', fontSize: 'xx-large' }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp; Restaurant Recipes
                </div>
                <br />
                <br />
                <br />
                <div className='row'>
                  {resrecipe.resrecipes ? (
                    resrecipe.resrecipes.map(rec => (
                      <Fragment>
                        {rec.user &&
                        rec.title &&
                        rec.cuisine &&
                        rec._id &&
                        rec.user.name ? (
                          <div className='col-lg-3'>
                            <div
                              style={{
                                margin: 'auto',
                                overflow: 'hidden',
                                width: '70%',
                                borderRadius: '15px'
                              }}
                            >
                              {rec.images ? (
                                <div>
                                  {rec.images.map(image => (
                                    <Fragment>
                                      <div>
                                        <img
                                          className='dash_img2'
                                          src={image}
                                        />
                                      </div>
                                    </Fragment>
                                  ))}
                                </div>
                              ) : (
                                ''
                              )}{' '}
                              <div>
                                <img
                                  className='dot dash_avatar'
                                  src={rec.user.avatar}
                                />
                              </div>
                              <div className='dash_rc_bg'>
                                <div className='dash_rc_c1'>
                                  by {rec.user.name} &nbsp;&nbsp;&nbsp;
                                </div>
                                <br />
                                <div
                                  className='dash_rc_c2'
                                  onClick={this.props.getRecipe.bind(
                                    this,
                                    rec._id
                                  )}
                                >
                                  <Link id='dash_link_rec' to={`/pay`}>
                                    {' '}
                                    Buy{' '}
                                  </Link>{' '}
                                  <br />
                                  {rec.cuisine}
                                  {rec.title}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Spinner />
                        )}
                      </Fragment>
                    ))
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </Fragment>
          ) : (
            <Spinner />
          )}
        </Fragment>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  recipe: state.recipe,
  resrecipe: state.resrecipe,
  options: state.options
});

export default connect(mapStateToProps, {
  getProfiles,
  getAllRecipes,
  getAllResRecipes,
  getOptions,
  getRecipe
})(Dashboard);
