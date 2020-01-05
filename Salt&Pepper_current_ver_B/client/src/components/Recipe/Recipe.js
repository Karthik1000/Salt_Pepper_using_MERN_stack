import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { Link } from "react-router-dom";
import { getMyRecipes, deleteRecipe, getRecipe } from "../../actions/recipe";
import { AddToCart } from "../../actions/cart";
import { Bookmark } from "../../actions/bookmark";
import Spinner from "../layout/Spinner";
import "./recipe.css";
import Navbar from "../../components/layout/Navbar";
import { createMessage } from "../../actions/messages";

export class Recipe extends Component {
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
    profile: PropTypes.object.isRequired,
    createMessage: PropTypes.func.isRequired
  };

  addToCart = recipe => {
    const profile = this.props.profile.profile;
    if (profile && profile.cart) {
      profile.cart.push(recipe._id);
    }
    this.props.AddToCart(profile);
    this.props.createMessage({
      addToCart: "Added to cart"
    });
  };

  Bookmark = recipe => {
    const profile = this.props.profile.profile;
    if (profile && profile.bookmarks) {
      profile.bookmarks.push(recipe._id);
    }
    this.props.Bookmark(profile);
    this.props.createMessage({
      bookmark: "Bookmarked Recipe"
    });
  };

  render() {
    const recipe = this.props.recipe;
    const profile = this.props.profile;
    var count = 0;

    return (
      <Fragment>
        {recipe.loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {recipe.recipe &&
            recipe.recipe.title &&
            recipe.recipe.description ? (
              <Fragment>
                <Navbar />
                <br />
                <div class="viewrectop animated fadeInDown delay-2s">
                  <div class="viewrectop_cont">
                    {" "}
                    {recipe.recipe && recipe.recipe.title ? (
                      <span> {recipe.recipe.title} </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <hr class="viewrechr1" />
                </div>
                <br />
                <div class="viewrecbot animated fadeInUp delay-2s">
                  <div class="row" style={{ margin: "0px" }}>
                    <div class="col-lg-3"></div>
                    <div class="col-lg-2 viewrow1col1">
                      {recipe.recipe && recipe.recipe.cuisine ? (
                        <span>{recipe.recipe.cuisine}</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div class='col-lg-2 viewrow1col2'>
                      {/* {recipe.recipe &&
                      recipe.recipe.user &&
                      recipe.recipe.user.name ? (
                        <div>By {recipe.recipe.user.name}</div>
                      ) : (
                        ''
                      )} */}
                    </div>
                    <div class="col-lg-2 viewrow1col3">
                      {recipe.recipe && recipe.recipe.diet ? (
                        <span>{recipe.recipe.diet}</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div class="col-lg-3"></div>
                  </div>
                  <br />
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-9 viewrecingredcontainer1">
                        <div class="viewrecingred">Ingredients</div>
                        <hr class="viewrechr2" />
                        <br />
                        <div class="viewrecingredcont">
                          {recipe.recipe &&
                          recipe.recipe.ingredient &&
                          recipe.recipe.quantity ? (
                            <div>
                              {recipe.recipe.ingredient.map(ingred => (
                                <span>
                                  {ingred}-{recipe.recipe.quantity[count++]}
                                  ,&nbsp;&nbsp;
                                </span>
                              ))}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div class="col-lg-3" style={{ textAlign: "center" }}>
                        {recipe.recipe ? (
                          <button
                            class="viewrecbtn"
                            onClick={this.addToCart.bind(this, recipe.recipe)}
                          >
                            <span class="fa fa-shopping-cart"></span>
                            &nbsp;&nbsp;Add recipe to cart
                          </button>
                        ) : (
                          ""
                        )}
                        <br />
                        <br />
                        <button
                          class="viewrecbtn"
                          onClick={this.Bookmark.bind(this, recipe.recipe)}
                        >
                          <span class="fa fa-bookmark"></span>
                          &nbsp;&nbsp;Bookmark Recipe
                        </button>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <span class="viewrecdate">
                          {recipe.recipe && recipe.recipe.calories ? (
                            <span>{recipe.recipe.calories}&nbsp;Calories</span>
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div style={{ textAlign: "center" }}>
                    <img
                      src="https://i.ibb.co/2MY7HgJ/flourish-01.png"
                      alt="flourish-01"
                      border="0"
                      class="viewrecimg1"
                    />
                  </div>

                  <br />
                  <br />
                  <div class="container">
                    <div
                      id="mycarousel"
                      class="carousel slide"
                      data-ride="carousel"
                    >
                     
                      <div class="carousel-inner">
                        {recipe.recipe && recipe.recipe.images ? (
                          <div>
                            {recipe.recipe.images.map(image => (
                              <Fragment>
                                <div class="carousel-item active">
                                  <img class="viewrecimgs" src={image} />
                                </div>
                                <div class="carousel-item active">
                                  <img class="viewrecimgs" src={image} />
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}{" "}
                      </div>
                    
                    </div>
                  </div>
                  <br />
                  <br />
                  <div style={{ textAlign: "center" }}>
                    <img
                      src="https://i.ibb.co/2MY7HgJ/flourish-01.png"
                      alt="flourish-01"
                      border="0"
                      class="viewrecimg1"
                    />
                  </div>
                  <br />
                  <br />
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-9 viewrecingredcontainer2">
                        <div class="viewrecingred">Procedure</div>
                        <hr class="viewrechr2" />
                        <br />
                        <div class="viewrecingredcont">
                          {recipe.recipe && recipe.recipe.description ? (
                            <div>{recipe.recipe.description}</div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div style={{ textAlign: "center" }}>
                          <img
                            src="https://i.ibb.co/44cxH2P/start-cooking-01.png"
                            class="viewrecimg2 animated slideInRight delay-3s"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </Fragment>
            ) : (
              <Spinner />
            )}
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
  deleteRecipe,
  getRecipe,
  AddToCart,
  createMessage,
  Bookmark
})(Recipe);
