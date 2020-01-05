import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { getMyRecipes, deleteRecipe, getRecipe } from '../../actions/recipe';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';
import './myrecipes.css';

export class myRecipes extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getMyRecipes();
  }

  static propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getMyRecipes: PropTypes.func.isRequired,
    getRecipe: PropTypes.func.isRequired,
    deleteRecipe: PropTypes.func.isRequired,
    recipe: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };

  OnDelete = id => {
    this.props.deleteRecipe(id);

    for (var i = 0; i < this.props.recipe.myrecipes.length; i++) {
      if (this.props.recipe.myrecipes[i]._id == id) {
        this.props.recipe.myrecipes.splice(i, 1);
      }
    }

    // this.setState({ flag: 1 });
  };

  render() {
    const recipe = this.props.recipe;

    return (
      <Fragment>
        {recipe.loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Navbar />
            <br />
            <br />
            <div className='myrectop animated fadeInDown delay-1s'>
              <div className='myrectop_cont'>Your Recipes</div>
              <hr className='myrechr1' />
            </div>
            <img
              className='myrecimg1 animated slideInRight delay-1s'
              src='https://i.ibb.co/DGq3gsS/chef-02.png'
            />
            <br />
            <br />
            <div className='myrecbot animated fadeInUp delay-1s'>
              {recipe.myrecipes ? (
                recipe.myrecipes.map(rec => (
                  <div className='container'>
                    <div className='row'>
                      <div className='col-lg-1'>
                        <img
                          className='myrecsalt'
                          src='https://i.ibb.co/XYztVzv/salt-02.png'
                        />
                      </div>
                      <div className='col-lg-11'>
                        <div className='rectitle'>
                          {rec.title} &nbsp;
                          <button
                            onClick={this.OnDelete.bind(this, rec._id)}
                            className='btn btn-danger btn-sm'
                          >
                            <i className='fa fa-trash-alt' />
                          </button>
                        </div>
                        {rec.title && rec.cuisine && rec._id ? (
                          <div>
                            <div className='reccuisine'>{rec.cuisine}</div>

                            <p
                              onClick={this.props.getRecipe.bind(this, rec._id)}
                            >
                              <Link to={`/recipe/${rec._id}`}>
                                {' '}
                                View Recipe
                              </Link>
                            </p>

                            <br />
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <br />
                    <hr className='myrechr2' />
                  </div>
                ))
              ) : (
                <Spinner />
              )}
            </div>
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

export default connect(mapStateToProps, {
  getCurrentProfile,
  getMyRecipes,
  getRecipe,
  deleteRecipe
})(myRecipes);
