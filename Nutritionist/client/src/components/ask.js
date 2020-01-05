import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postInfo } from '../actions/nutritionist';
import { createMessage } from '../actions/messages';
import './ask.css';
export class Post extends Component {
  state = {
    diet: '',
    maxcal: 0,
    mincal: 0,
    token: ''
  };

  //   componentDidMount() {
  //     this.props.getCurrentProfile();
  //     this.props.getOptions();
  //     this.props.getIngredients();
  //   }

  static propTypes = {
    postInfo: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    nutritionist: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { diet, maxcal, mincal, token } = this.state;

    const upload = {
      diet,
      maxcal,
      mincal,
      token
    };
    console.log(upload);

    if (diet === '') {
      this.props.createMessage({
        dietRequired: 'Diet required! '
      });
    } else if (maxcal === 0) {
      this.props.createMessage({
        maxcalRequired: 'Max calories required! '
      });
    } else if (mincal === 0) {
      this.props.createMessage({
        mincalRequired: 'Min calories required! '
      });
    } else if (token === '') {
      this.props.createMessage({
        tokenRequired: 'Token required! '
      });
    } else {
      this.props.createMessage({
        uploaded: 'Uploaded Successfully'
      });
      this.props.postInfo(upload, this.props.history);
    }
  };

  render() {
    const { diet, maxcal, mincal, token } = this.state;

    return (
      <Fragment>
        <div className='uptop'>
          <div class='container'>
            <div class='uptop_cont animated rotateIn delay-1s'>
              Dr.Eats&nbsp;
              <span
                class='fas fa-stethoscope'
                style={{ fontSize: 'smaller' }}
              ></span>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className='container renner'>
          <form onSubmit={this.onSubmit}>
            <div className='row'>
              <div className='col-lg-5'>
                <label className='label'>Diet</label>
                <select
                  className='form-control col-10'
                  name='diet'
                  onChange={this.onChange}
                  value={diet}
                >
                  <option value='' selected disbled hidden>
                    Choose
                  </option>
                  <option value='Veg'>Vegetarian</option>
                  <option value='Non-Veg'>Non Vegetarian</option>
                </select>
              </div>
              <div className='col-lg-5'>
                {' '}
                <label className='label'>Min Calories</label>
                <input
                  type='number'
                  className='form-control col-10'
                  name='mincal'
                  onChange={this.onChange}
                  value={mincal}
                />
              </div>
              <div className='col-lg-2'></div>
            </div>
            <br />
            <br />
            <div className='row'>
              <div className='col-lg-5'>
                {' '}
                <label className='label'>Max Calories</label>
                <input
                  type='number'
                  className='form-control col-10'
                  name='maxcal'
                  onChange={this.onChange}
                  value={maxcal}
                />
              </div>
            </div>

            <br />
            <br />
            <div className='row'>
              <div className='col-lg-5'>
                <label className='label'>Token</label>
                <input
                  type='text'
                  className='form-control col-10'
                  name='token'
                  onChange={this.onChange}
                  value={token}
                />
              </div>
              <div className='col-lg-5 docbtn_1'>
                <button className='btn btn-danger' type='submit'>
                  Submit
                </button>
              </div>
              <div className='col-lg-2'></div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  nutritionist: state.nutritionist
});

export default connect(mapStateToProps, {
  postInfo,
  createMessage
})(withRouter(Post));
