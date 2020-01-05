import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { getRecipesByUserID } from '../../actions/recipe';
import Navbar from '../layout/Navbar';
import './myprofile.css';

export class ProfileByID extends Component {
  static propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    recipe: PropTypes.object.isRequired,
    getRecipesByUserID: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProfileById(id);
    this.props.getRecipesByUserID(id);
  }

  render() {
    const profile = this.props.profile;
    const recipe = this.props.recipe;
    return (
      <Fragment>
        <Navbar />
        <br />
        <br />
        {profile.loading && recipe.loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <div className='myprotop'>
              <div className='myprotopcont'>Profile</div>
              <hr className='myprohr1' />
            </div>
            <div style={{ zIndex: '1' }}>
              <img
                className='myproimg1'
                src='https://i.ibb.co/LRXSQ97/profile-01.png'
              />
              {recipe.myrecipes ? (
                <div className='myprofloatrec'>
                  Recipes
                  <br /> {Object.keys(recipe.recipes).length}{' '}
                </div>
              ) : (
                <p></p>
              )}
              <div className='myprofloatbook'>
                Bookmared <br />
                Recipes
              </div>
              {profile.profile && profile.profile.followers ? (
                <div className='myprofloatfol'>
                  Followers
                  <br /> {profile.profile.followers.length}
                </div>
              ) : (
                <p></p>
              )}
              {profile.profile && profile.profile.following ? (
                <div className='myprofloatfoling'>
                  Following
                  <br /> {profile.profile.following.length}
                </div>
              ) : (
                <p></p>
              )}
              <div className='myprofloatblog'>Blogs</div>
              <div className='myprofloatfav'>Favourite Ingredients</div>
            </div>
            <img
              className='myproimg2'
              src='https://i.ibb.co/4msJvRB/hat-01.png'
            />
            <img
              className='myproimg3'
              src='https://i.ibb.co/3ds02bp/spatula-01.png'
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <Fragment>
              <div className='myprobot'>
                <div className='row' style={{ margin: '0px' }}>
                  <div className='col-lg-1'></div>
                  <div className='col-lg-5'>
                    <div className='row'>
                      <div className='col-lg-12 myprocolhead'>
                        Details
                        <hr className='myprohr2' />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-6'>
                        {profile.profile &&
                        profile.profile.user &&
                        profile.profile.user.name ? (
                          <div>name: {profile.profile.user.name}</div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className='col-lg-6'>
                        {' '}
                        {profile.profile &&
                        profile.profile.user &&
                        profile.profile.user.email ? (
                          <div>email: {profile.profile.user.email}</div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-6'>
                        {profile.profile && profile.profile.dob ? (
                          <div>dob: {profile.profile.dob}</div>
                        ) : (
                          <p></p>
                        )}
                      </div>
                      <div className='col-lg-6'>
                        {recipe.myrecipes ? (
                          <div>
                            Recipes uploaded:{' '}
                            {Object.keys(recipe.recipes).length}{' '}
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-6'>
                        {profile.profile && profile.profile.mobile ? (
                          <div>mobile: {profile.profile.mobile}</div>
                        ) : (
                          <p> </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-5'>
                    <div className='row'>
                      <div className='col-lg-6 myprocolhead'>
                        Followers
                        <hr className='myprohr3' />
                      </div>
                      <div className='col-lg-6 myprocolhead'>
                        Following
                        <hr className='myprohr4' />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-6 myprofolllist'>
                        Search
                        <br />
                        {profile.profile && profile.profile.followers ? (
                          <div>
                            followers: {profile.profile.followers.length}
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </div>
                      <div className='col-lg-6 myprofolllist'>
                        Search
                        <br />
                        {profile.profile && profile.profile.following ? (
                          <div>
                            following: {profile.profile.following.length}
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-1'></div>
                </div>
              </div>
            </Fragment>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  recipe: state.recipe
});

export default connect(mapStateToProps, { getProfileById, getRecipesByUserID })(
  ProfileByID
);
