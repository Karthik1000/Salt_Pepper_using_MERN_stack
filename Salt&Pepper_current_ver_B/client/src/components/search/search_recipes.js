import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllRecipes, getRecipe } from '../../actions/recipe';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import './search_recipes.css';

export class Search_Recipe extends Component {
  static propTypes = {
    recipe: PropTypes.object.isRequired,
    getAllRecipes: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getAllRecipes();
  }

  constructor() {
    super();
    this.state = {
      search: '',
      southindian: false,
      northindian: false,
      chinese: false,
      japanese: false,
      mexican: false,
      french: false,
      italian: false,
      middleeastern: false
    };
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  filterByGenre = e => {
    let p = false;
    console.log(e.target.value);
    if (e.target.value == 'false') {
      p = false;
    }
    if (e.target.value == 'true') {
      p = true;
    }
    this.setState({ [e.target.name]: p });
  };

  render() {
    let filteredRecipes = [];

    if (this.props.recipe && this.props.recipe.recipes) {
      for (let i = 0; i < this.props.recipe.recipes.length; i++) {
        console.log(
          this.props.recipe.recipes[i].cuisine.replace(/ /g, '').toLowerCase()
        );
        if (
          this.state[
            this.props.recipe.recipes[i].cuisine.replace(/ /g, '').toLowerCase()
          ]
        ) {
          filteredRecipes = [...filteredRecipes, this.props.recipe.recipes[i]];
        }
      }
    }

    if (filteredRecipes.length === 0) {
      filteredRecipes = this.props.recipe.recipes.filter(allwork => {
        return (
          allwork.title
            .toLocaleLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1
        );
      });
    }

    if (filteredRecipes.length) {
      filteredRecipes = filteredRecipes.filter(allwork => {
        return (
          allwork.title
            .toLocaleLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1
        );
      });
    }
    return (
      <Fragment>
        <Navbar />
        <br />
        <br />

        <div className='viewrectop animated fadeInDown delay-1s'>
          <div className='viewrectop_cont'>
            <span className='fas fa-search'></span>&nbsp;
            <input
              type='text'
              placeholder='Search Recipe/Cuisine'
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
              className='searchres_text'
              style={{}}
            />
          </div>
        </div>

        <br />
        <br />
        <br />
        <div className='container karla animated fadeInUp delay-2s'>
          <div style={{ marginLeft: '25px' }}>
            <div className='dropright'>
              <button
                className='btn btn-warning dropdown-toggle'
                type='button'
                id='dropdownMenuButton'
                color='white'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
                style={{ marginLeft: '2%' }}
              >
                <span class='fa fa-filter' style={{ fontSize: 'small' }}></span>
                &nbsp;&nbsp;Select Cuisine
              </button>
              <br />
              <br />
              <br />
              <div
                className='dropdown-menu scrollable-menu'
                id='search_res'
                aria-labelledby='dropdownMenuButton'
              >
                <div className='dropdown-item'>
                  <input
                    type='checkbox'
                    name='southindian'
                    value={!this.state['southindian']}
                    onChange={this.filterByGenre}
                  />
                  &nbsp; South Indian
                </div>
                <div className='dropdown-divider' />
                <div className='dropdown-item'>
                  <input
                    type='checkbox'
                    name='northindian'
                    value={!this.state['northindian']}
                    onChange={this.filterByGenre}
                  />
                  &nbsp; North Indian
                </div>
                <div className='dropdown-divider' />
                <div className='dropdown-item'>
                  <input
                    type='checkbox'
                    name='mexican'
                    value={!this.state['mexican']}
                    onChange={this.filterByGenre}
                  />
                  &nbsp; Mexican
                </div>
                <div className='dropdown-divider' />
                <div className='dropdown-item'>
                  <input
                    type='checkbox'
                    name='italian'
                    value={!this.state['italian']}
                    onChange={this.filterByGenre}
                  />
                  &nbsp; Italian
                </div>
                <div className='dropdown-divider' />
                <div className='dropdown-item'>
                  <input
                    type='checkbox'
                    name='french'
                    value={!this.state['french']}
                    onChange={this.filterByGenre}
                  />
                  &nbsp; French
                </div>
                <div className='dropdown-divider' />
                <div className='dropdown-item'>
                  <input
                    type='checkbox'
                    name='middleeastern'
                    value={!this.state['middleeastern']}
                    onChange={this.filterByGenre}
                  />
                  &nbsp; Middle Eastern
                </div>
                <div className='dropdown-divider' />
                <div className='dropdown-item'>
                  <input
                    type='checkbox'
                    name='chinese'
                    value={!this.state['chinese']}
                    onChange={this.filterByGenre}
                  />
                  &nbsp; Chinese
                </div>
                <div className='dropdown-divider' />
                <div className='dropdown-item'>
                  <input
                    type='checkbox'
                    name='japanese'
                    value={!this.state['japanese']}
                    onChange={this.filterByGenre}
                  />
                  &nbsp; Japanese
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className='row search_row'>
            {filteredRecipes.map(allwork => (
              <div className='col-lg-3'>
                <div
                  style={{
                    margin: 'auto',
                    overflow: 'hidden',
                    width: '80%',
                    borderRadius: '15px'
                  }}
                >
                  <div>
                    {allwork.images ? (
                      <div>
                        {allwork.images.map(image => (
                          <Fragment>
                            <div>
                              <img className='dash_img2' src={image} />
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    ) : (
                      ''
                    )}{' '}
                  </div>
                  <div>
                    <img
                      className='dot dash_avatar'
                      src={allwork.user.avatar}
                    />
                  </div>

                  <div className='dash_rc_bg'>
                    <div className='dash_rc_c1'>
                      by {allwork.user.name} &nbsp;&nbsp;&nbsp;
                    </div>
                    <br />
                    <div
                      className='dash_rc_c2'
                      onClick={this.props.getRecipe.bind(this, allwork._id)}
                    >
                      <Link id='dash_link_rec' to={`/recipe/${allwork._id}`}>
                        {' '}
                        {allwork.title}{' '}
                      </Link>{' '}
                      <br />
                      {allwork.cuisine}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  recipe: state.recipe
});

export default connect(mapStateToProps, { getAllRecipes, getRecipe })(
  Search_Recipe
);
