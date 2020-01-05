import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getCurrentProfile, getProfiles } from "../../actions/profile";
import { getAllRecipes, getRecipe } from "../../actions/recipe";
import { getIngredients } from "../../actions/ingredients";
import Navbar from "../layout/Navbar";
import "./bookmark.css";

export class Bookmark extends Component {
  static propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    recipe: PropTypes.object.isRequired,
    bookmark: PropTypes.object.isRequired,
    getAllRecipes: PropTypes.func.isRequired,
    getProfiles: PropTypes.func.isRequired,
    getRecipe: PropTypes.func.isRequired,
    getIngredients: PropTypes.func.isRequired,
    ingredients: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getAllRecipes();
    this.props.getCurrentProfile();
    this.props.getAllRecipes();
    this.props.getIngredients();
    this.props.getProfiles();
  }

  // onClick = array => {
  //   const profile = this.props.profile;
  //   var max = 100000;
  //   var warehouse;
  //   if (
  //     profile.profile &&
  //     profile.profiles &&
  //     profile.profile.user &&
  //     profile.profile.address &&
  //     profile.profile.address.pincode
  //   ) {
  //     for (var i of profile.profiles) {
  //       // console.log(i);
  //       if (
  //         i.user &&
  //         i.user.user_type &&
  //         i.user.user_type == "warehouse" &&
  //         i.user.pincode
  //       ) {
  //         // console.log(i.user.pincode);
  //         if (
  //           Math.abs(i.user.pincode - profile.profile.address.pincode) <= max
  //         ) {
  //           max = i.user.pincode;
  //           // console.log(i);
  //           warehouse = i;
  //         }
  //       }
  //     }
  //     // console.log(array);
  //     for (var j of array) {
  //       // console.log(j);
  //       const updated_quantity = {
  //         recipe: j,
  //         quantity: j.available_quantity - 1,
  //         diff: -1
  //       };

  //       this.props.postQuantity(updated_quantity);
  //     }
  //   }
  // };

  onSubmit = (recipe, total, id) => {
    const upload = {
      recipe,
      total
    };
    console.log(upload);

    this.props.postOrder(upload, id, this.props.history);
  };

  render() {
    const profile = this.props.profile;
    const recipe = this.props.recipe;
    const ingredients = this.props.ingredients;
    const bookmark = this.props.bookmark;
    const bookmark_array = [];

    if (recipe.recipes) {
      if (
        profile.profile &&
        profile.profile.bookmarks &&
        ingredients.ingredients
      ) {
        for (var rec of recipe.recipes) {
          if (profile.profile.bookmarks.includes(rec._id)) {
            // console.log(rec._id);
            bookmark_array.push(rec);
            console.log(bookmark_array);
          }
        }
      }
    }

    return (
      <Fragment>
        {profile.loading && recipe.loading && ingredients.loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Navbar />
            <br />
            <br />
            <div className="outtop animated fadeInDown delay-1s">
              <div className="outtop_cont">
                Bookmarked Recipes&nbsp;
                <span
                  className="fa fa-bookmark"
                  style={{ fontSize: "smaller" }}
                ></span>
              </div>
              <hr className="outhr1" />
            </div>
            <br />
            <br />
            {/* {console.log(count)}
            {console.log(cart_array)}
            {console.log(ingred_arrays)}
            {console.log(price_arrays)}
            {console.log(total_array)}
            {console.log(total_sum)} */}
            {bookmark_array ? (
              <Fragment>
                {bookmark_array.map(
                  recipe => {
                    if (recipe.title && recipe.cuisine && recipe._id) {
                      return (
                        <Fragment>
                          <div className="container animated fadeInUp delay-2s">
                            <div className="row">
                              <div className="col-lg-1">
                                <img
                                  className="myrecsalt"
                                  src="https://i.ibb.co/XYztVzv/salt-02.png"
                                />
                              </div>
                              <div className="col-lg-11">
                                <div className="rectitle">
                                  <Link id="book_view_rec" to={`/recipe/${recipe._id}`}>
                                    {" "}
                                    {recipe.title}{" "}
                                  </Link>
                                  &nbsp;
                                </div>

                                <div>
                                  <div className="reccuisine">
                                    {recipe.cuisine}
                                  </div>

                                  <p
                                    onClick={this.props.getRecipe.bind(
                                      this,
                                      recipe._id
                                    )}
                                  ></p>
                                </div>
                              </div>
                            </div>
                            <br />
                            <hr className="myrechr2" />
                          </div>
                        </Fragment>
                      );
                    }
                  }
                  // count = count + 1;
                  // temp_count = 0;
                  // temp2_count = 0;
                )}
              </Fragment>
            ) : (
              ""
            )}{" "}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  recipe: state.recipe,
  bookmark: state.bookmark,
  ingredients: state.ingredients
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getAllRecipes,
  getIngredients,
  getProfiles,
  getRecipe
})(withRouter(Bookmark));
