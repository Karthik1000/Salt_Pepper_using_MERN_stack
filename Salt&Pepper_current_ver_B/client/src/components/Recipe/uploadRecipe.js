import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { postRecipe } from "../../actions/recipe";
import { getOptions } from "../../actions/options";
import { getIngredients, postIngredient } from "../../actions/ingredients";
import { createMessage } from "../../actions/messages";
import Navbar from "../layout/Navbar";
import "./uploadrecipe.css";

export class Upload extends Component {
  state = {
    title: "",
    description: "",
    cuisine: "",
    diet: "",
    calories: 0,
    images: [],
    video: "",
    ingredient_string: ""
  };

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getOptions();
    this.props.getIngredients();
  }

  static propTypes = {
    postRecipe: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    getIngredients: PropTypes.func.isRequired,
    getOptions: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    ingredients: PropTypes.object.isRequired,
    postIngredient: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChange2 = e => {
    this.setState({ [e.target.name]: e.target.value });

    let files = e.target.files;
    var images = [];

    for (var i = 0; i < files.length; i++) {
      // images.push(files[i]);

      let reader = new FileReader();
      reader.readAsDataURL(files[i]);

      // var cryptojs = require('crypto-js');

      reader.onload = e => {
        //console.log("img data", e.target.result)
        //  var x = cryptojs.enc.Base64.parse(e.target.result);
        //   console.log(x);
        // var  y = x.toString(cryptojs.enc.Utf8);

        // console.log(y);
        images.push(e.target.result);
        // this.setState({ image_content: e.target.result });
        // console.log(this.state.image_content);
      };
    }
    this.setState({ image_content: images });
  };

  // onChange3 = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  //   console.log(e.target.value);
  // };

  onSubmit = e => {
    e.preventDefault();
    const {
      title,
      description,
      cuisine,
      diet,
      calories,
      image_content,
      video,
      ingredient_string
    } = this.state;

    var ingred = ingredient_string.split(";");
    var ingredient = [];
    var ingred_trim;
    var check = [];
    // var quantity_trim = [];
    var quantity = [];

    const ingreds = this.props.ingredients;
    if (ingreds.ingredients) {
      for (var i of ingreds.ingredients) {
        if (i.title) {
          check.push(i.title.toLowerCase().replace(/ +/g, ""));
        }
      }
      if (check) {
      }
      for (var i of ingred) {
        var temp = i.split(",");
        ingredient.push(temp[0]);
        ingred_trim = temp[0].toLowerCase().replace(/ +/g, "");

        if (check && !check.includes(ingred_trim)) {
          var ingred_upload = {
            title: temp[0]
          };

          this.props.postIngredient(ingred_upload);
        }
        quantity.push(temp[1]);
        // quantity_trim.push(temp[1].toLowerCase().replace(/ +/g, ''));
      }
    }
    // if (check) {
    //   console.log(check);
    // }
    // for (var i of ingred) {
    //   var temp = i.split(',');
    //   ingredient.push(temp[0]);
    //   ingred_trim = temp[0].toLowerCase().replace(/ +/g, '');
    //   console.log(ingred_trim);
    //   if (check && !check.includes(ingred_trim)) {
    //     var ingred_upload = {
    //       title: temp[0]
    //     };
    //     // this.props.postIngredient(ingred_upload);
    //   }
    //   quantity.push(temp[1]);
    //   // quantity_trim.push(temp[1].toLowerCase().replace(/ +/g, ''));
    // }

    const upload = {
      title,
      description,
      cuisine,
      diet,
      calories,
      images: image_content,
      video,
      ingredient,
      quantity
    };

    // console.log(title);

    var letters = /^[0-9a-zA-Z]+$/;

    if (title == "") {
      this.props.createMessage({
        titleRequired: "Title required! "
      });
    } else if (cuisine === "") {
      this.props.createMessage({
        cuisineRequired: "Cuisine required! "
      });
    } else if (diet === "") {
      this.props.createMessage({
        dietRequired: "Diet required! "
      });
    } else if (calories === 0) {
      this.props.createMessage({
        caloriesRequired: "Calories required! "
      });
    } else if (description === "") {
      this.props.createMessage({
        procedureRequired: "Procedure required! "
      });
    } else {
      this.props.createMessage({
        uploaded: "Uploaded Successfully!"
      });

      this.props.postRecipe(upload);
    }
  };

  render() {
    const {
      title,
      description,
      cuisine,
      diet,
      calories,
      image,
      video,
      ingredient_string
    } = this.state;

    const options = this.props.options;
    var ingred = [];
    var quantity = [];
    var name;
    var amount;
    var click = false;

    return (
      <Fragment>
        <Navbar />
        <br />
        <br />
        <div class="uptop animated fadeInDown delay-1s">
          <div class="uptop_cont">
            Upload recipe&nbsp;
            <span class="fas fa-scroll" style={{ fontSize: "smaller" }}></span>
          </div>
          <hr class="uphr1" />
        </div>
        <br />
        <br />
        <div className="container animated fadeInUp delay-2s karla">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-lg-1"></div>
              <div className="col-lg-5">
                <label className="label">Title</label>
                <input
                  type="text"
                  className="form-control col-10"
                  name="title"
                  onChange={this.onChange}
                  value={title}
                />
              </div>
              <div className="col-lg-5">
                {" "}
                <label className="label">Cuisine</label>
                <select
                  className="form-control col-10"
                  name="cuisine"
                  onChange={this.onChange}
                  value={cuisine}
                >
                  <option value="" selected disbled hidden>
                    Choose
                  </option>
                  {options.options
                    ? options.options.map(opt => (
                        <option value={opt.title}>{opt.title}</option>
                      ))
                    : ""}
                </select>
              </div>

              <div className="col-lg-1"></div>
            </div>
            <br />
            <div className="row">
              <div className="col-lg-1"></div>
              <div className="col-lg-5">
                {" "}
                <label className="label">Diet</label>
                <select
                  className="form-control col-10"
                  name="diet"
                  onChange={this.onChange}
                  value={diet}
                >
                  <option value="" selected disbled hidden>
                    Choose
                  </option>
                  <option value="Veg" selected="selected">
                    Vegetarian
                  </option>
                  <option value="Non-Veg">Non Vegetarian</option>
                </select>
              </div>
              <div className="col-lg-5">
                <label className="label">Calories</label>
                <input
                  type="text"
                  className="form-control col-10"
                  name="calories"
                  onChange={this.onChange}
                  value={calories}
                />
              </div>
              <div className="col-lg-1"></div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col-lg-1"></div>
              <div className="col-lg-5">
                <label className="label">Ingredients</label>
                <div>
                  <textarea
                    rows={10}
                    name="ingredient_string"
                    value={ingredient_string}
                    onChange={this.onChange}
                    style={{height:"inherit"}}
                    className="form-control col-10"
                    placeholder="use comma as a seperator for ingredient and quantity and a semicolon to distinguish each pair. For example paneer,250 grams; oil, 2 tablespoons. "
                  />
                  <br />
                </div>
              </div>
              <div className="col-lg-5">
                <label className="label">Procedure</label>
                <textarea
                  rows={20}
                  name="description"
                  className="form-control col-10"
                  onChange={this.onChange}
                  value={description}
                />
              </div>
              <div className="col-lg-1"></div>
            </div>
            <div>
              <br />
              <br />
              <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-5">
                  <i className="fa fa-file-image fa-2x" />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="file"
                    name="image"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={this.onChange2}
                    value={image}
                    multiple
                  />
                </div>

                <div className="col-lg-5">
                  <button
                    className="btn btn-warning"
                    type="submit"
                    style={{width:"80%"}}
                  >
                    Upload
                  </button>
                </div>
                <div className="col-lg-1"></div>

                <br />
                <br />
                <br />
              </div>
              <br />
              <br />
              <br />
              <br />
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  options: state.options,
  ingredients: state.ingredients
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  postRecipe,
  getOptions,
  getIngredients,
  postIngredient,
  createMessage
})(Upload);
