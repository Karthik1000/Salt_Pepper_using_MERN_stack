import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getQuantity, postQuantity } from "../../actions/warehouse";
import { getCurrentProfile, getProfiles } from "../../actions/profile";
import { getAllRecipes, getRecipe } from "../../actions/recipe";
import { postOrder } from "../../actions/order";
import { getIngredients } from "../../actions/ingredients";
import Navbar from "../layout/Navbar";
import "./cart.css";

export class Cart extends Component {
  static propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    recipe: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    getAllRecipes: PropTypes.func.isRequired,
    getProfiles: PropTypes.func.isRequired,
    getRecipe: PropTypes.func.isRequired,
    getIngredients: PropTypes.func.isRequired,
    ingredients: PropTypes.object.isRequired,
    warehouse: PropTypes.object.isRequired,
    getQuantity: PropTypes.func.isRequired,
    postQuantity: PropTypes.func.isRequired,
    postOrder: PropTypes.func.isRequired
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

    this.props.postOrder(upload, id, this.props.history);
  };

  render() {
    const profile = this.props.profile;
    const recipe = this.props.recipe;
    const ingredients = this.props.ingredients;
    const cart = this.props.cart;
    const cart_array = [];
    const ingred_arrays = [];
    const price_arrays = [];
    const total_array = [];
    var total_sum = 0;
    var count = 0;
    var temp_count = 0;
    var temp2_count = 0;
    var temp_ingred;
    var temp_price;
    var x;

    if (recipe.recipes) {
      if (profile.profile && profile.profile.cart && ingredients.ingredients) {
        for (var rec of recipe.recipes) {
          if (profile.profile.cart.includes(rec._id)) {
            cart_array.push(rec);

            var ingred_array = [];
            var price_array = [];
            var total = 0;
            for (var ingred of ingredients.ingredients) {
              if (ingred.title) {
                // console.log(ingred._id);
                if (rec.ingredient.includes(ingred.title)) {
                  ingred_array.push(ingred.title);

                  price_array.push(ingred.price);
                  total = total + ingred.price;
                }
              }
            }
            ingred_arrays.push(ingred_array);
            price_arrays.push(price_array);
            total_array.push(total);
            total_sum = total_sum + total;
          }
        }
      }
    }

    return (
      <Fragment>
        {profile.loading &&
        recipe.loading &&
        ingredients.loading &&
        !cart_array &&
        !ingred_arrays &&
        !price_arrays ? (
          <Spinner />
        ) : (
          <Fragment>
            <Navbar />
            <br />
            <br />
            <div className="outtop animated fadeInDown delay-1s">
              <div className="outtop_cont">
                Your Cart&nbsp;
                <span
                  className="fa fa-shopping-cart"
                  style={{ fontSize: "smaller" }}
                ></span>
              </div>
              <hr className="outhr1" />
            </div>
            <br />
            <br />
            {cart_array &&
            ingred_arrays &&
            price_arrays &&
            total_array &&
            total_sum ? (
              <Fragment>
                <div class="container">
                  <div
                    class="row animated fadeInUp delay-1s"
                    style={{ margin: "0px" }}
                  >
                    {cart_array.map(recipe => {
                      if (
                        recipe.title &&
                        ingred_arrays[count] &&
                        price_arrays[count] &&
                        total_array
                      ) {
                        var ingred = ingred_arrays[count];
                        var price = price_arrays[count];
                        // console.log(price);
                        var temp_count = 0;
                        return (
                          <Fragment>
                            <div class="col-lg-7">
                              <div class="row">
                                <div class="col-lg-12 outheaderbgy">
                                  <div class="outheader">Ingredients</div>

                                  <hr class="outhr" />
                                  <br />

                                  <div class="outingredcontent" id="myDIV">
                                    <div class="row">
                                      {ingred.map(ingred => (
                                        <div class="col-lg-3 outingredient">
                                          {ingred}
                                          <br />
                                          Rs.{price[temp_count++]}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-1"></div>
                            <div class="col-lg-4 headerbg left">
                              <div class="outheader3">Order summary</div>

                              <hr class="outhr3 leftmargin" />
                              <br />
                              <br />
                              <div class="row outrecname">
                                <div onclick="myFunction()" class="col-lg-6">
                                  {recipe.title}
                                </div>
                                <div class="col-lg-6 right">
                                  Rs.{total_array[count++]}
                                </div>
                              </div>
                              <br />

                              <div class="row outrecname ">
                                <div class="col-lg-6">Total</div>
                                <div class="col-lg-6 right">Rs.{total_sum}</div>
                              </div>
                              <br />
                              {total_sum ? (
                                <button
                                  class="outbtn"
                                  onClick={this.onSubmit.bind(
                                    this,
                                    recipe.title,
                                    total_sum,
                                    recipe._id
                                  )}
                                >
                                  {" "}
                                  Pay &nbsp;&nbsp;
                                  <span class="fas fa-arrow-right arrow"></span>
                                </button>
                              ) : (
                                <p>Pay </p>
                              )}
                            </div>
                          </Fragment>
                        );
                      }
                      // count = count + 1;
                      // temp_count = 0;
                      // temp2_count = 0;
                    })}
                    <div class="col-lg-7">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="outheader">Address</div>

                        <hr class="outhr" />
                        <br />
                        <div class="outaddress">
                          {profile.profile &&
                          profile.profile.address &&
                          profile.profile.address.locality ? (
                            <p>{profile.profile.address.locality}</p>
                          ) : (
                            ""
                          )}
                          <br />
                          <br />
                          {profile.profile &&
                          profile.profile.address &&
                          profile.profile.address.city ? (
                            <p>{profile.profile.address.city}</p>
                          ) : (
                            ""
                          )}
                          <br />
                          <br />
                          {profile.profile &&
                          profile.profile.address &&
                          profile.profile.address.pincode ? (
                            <p>{profile.profile.address.pincode}</p>
                          ) : (
                            ""
                          )}
                          <br />
                          <br />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <img
                          class="outimg1 animated fadeInUp delay-2s"
                          src="https://i.ibb.co/FzdPWpb/ingredients-01.png"
                        />
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <Spinner />
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
  cart: state.cart,
  ingredients: state.ingredients,
  warehouse: state.warehouse,
  order: state.warehouse
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getAllRecipes,
  getIngredients,
  getProfiles,
  getQuantity,
  postQuantity,
  postOrder
})(withRouter(Cart));
