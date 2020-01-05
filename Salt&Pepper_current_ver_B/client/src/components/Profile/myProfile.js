import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getCurrentProfile } from "../../actions/profile";
import { getMyRecipes } from "../../actions/recipe";
import Navbar from "../layout/Navbar";
import "./myprofile.css";

export class myProfile extends Component {
  static propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    recipe: PropTypes.object.isRequired,
    getMyRecipes: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getMyRecipes();
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
            <div className="myprotop">
              <div className="myprotopcont">Profile</div>
              <hr className="myprohr1" />
            </div>
            <div style={{ zIndex: "1" }} className="">
              <img
                className="myproimg1 animated fadeInDown delay-1s"
                src="https://i.ibb.co/LRXSQ97/profile-01.png"
              />
              {recipe.myrecipes ? (
                <div className="myprofloatrec">
                  Recipes
                  <br /> {Object.keys(recipe.myrecipes).length}{" "}
                </div>
              ) : (
                <p></p>
              )}
              {/* <div className='myprofloatrec'>Recipes</div> */}
              <div className="myprofloatbook">
                Bookmared <br />
                Recipes
              </div>
              {profile.profile && profile.profile.followers ? (
                <div className="myprofloatfol">
                  Followers
                  <br /> {profile.profile.followers.length}
                </div>
              ) : (
                <p></p>
              )}
              {/* <div className='myprofloatfol'>Followers</div> */}
              {profile.profile && profile.profile.following ? (
                <div className="myprofloatblog">
                  Following
                  <br /> {profile.profile.following.length}
                </div>
              ) : (
                <p></p>
              )}
              {/* <div className='myprofloatfoling'>Following</div> */}
            </div>
            <img
              className="myproimg2 animated slideInLeft delay-1s"
              src="https://i.ibb.co/4msJvRB/hat-01.png"
            />
            <img
              className="myproimg3 animated slideInRight delay-1s"
              src="https://i.ibb.co/3ds02bp/spatula-01.png"
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
            <br />
            <br />

            <Fragment>
              <div className="myprobot">
                <div
                  className="row animated fadeInUp delay-1s"
                  style={{ margin: "0px", fontSize: "large" }}
                >
                  <div className="col-lg-1"></div>
                  <div className="col-lg-5">
                    <div className="row" style={{ textAlign: "left" }}>
                      <div className="col-lg-12 myprocolhead">
                        Details
                        <hr className="myprohr2" />
                      </div>
                    </div>
                    
                    <div className="row" style={{ textAlign: "left" }}>
                      <div className="col-lg-6">
                        {profile.profile &&
                        profile.profile.user &&
                        profile.profile.user.name ? (
                          <div>
                            name <br />
                            {profile.profile.user.name}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-lg-6">
                        {" "}
                        {profile.profile &&
                        profile.profile.user &&
                        profile.profile.user.email ? (
                          <div>
                            email
                            <br />
                            {profile.profile.user.email}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <br/>
                    <div className="row" style={{ textAlign: "left" }}>
                      <div className="col-lg-6">
                        {profile.profile && profile.profile.dob ? (
                          <div>
                            dob
                            <br /> {profile.profile.dob}
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </div>
                      <div className="col-lg-6">
                        {recipe.myrecipes ? (
                          <div>
                            Recipes uploaded:{" "}
                            {Object.keys(recipe.myrecipes).length}{" "}
                          </div>
                        ) : (
                          <p></p>
                        )}
                        <br />
                      </div>
                    </div>
                    <br/>
                    <div className="row" style={{ textAlign: "left" }}>
                      <div className="col-lg-6">
                        {profile.profile && profile.profile.mobile ? (
                          <div>
                            mobile
                            <br /> {profile.profile.mobile}
                          </div>
                        ) : (
                          <p> </p>
                        )}
                      </div>
                      <div className="col-lg-6">
                        <Link to="/profile">
                          <button className="btn btn-warning">edit</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="row">
                      <div className="col-lg-6 myprocolhead">
                        Followers
                        <hr className="myprohr3" />
                      </div>
                      <div className="col-lg-5 myprocolhead">
                        Following
                        <hr className="myprohr4" />
                      </div>
                      
                    </div>
                    <div className="row">
                      <div className="col-lg-5 myprofolllist">
                     
                        <br />
                        {profile.profile && profile.profile.followers ? (
                          <div>
                            followers: {profile.profile.followers.length}<br/>
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </div>
                      <div className="col-sm-2"></div>
                      <div className="col-lg-5 myprofolllist">
                      
                        <br />
                        {profile.profile && profile.profile.following ? (
                          <div>
                            following: {profile.profile.following.length}<br/>
                          </div>
                          
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1"></div>
                </div>
              </div>
            </Fragment>
          </Fragment>
        )}
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
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  recipe: state.recipe
});

export default connect(mapStateToProps, { getCurrentProfile, getMyRecipes })(
  myProfile
);
