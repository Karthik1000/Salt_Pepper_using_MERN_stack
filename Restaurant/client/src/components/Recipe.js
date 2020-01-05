import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './recipe.css';
import { postRecipe } from '../actions/recipe';
import { createMessage } from '../actions/messages';

export class Upload extends Component {
  state = {
    title: '',
    description: '',
    cuisine: '',
    images: [],
    token: ''
  };

  static propTypes = {
    postRecipe: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    recipe: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChange2 = e => {
    this.setState({ [e.target.name]: e.target.value });

    console.log(e.target.value);

    let files = e.target.files;
    var images = [];
    console.log(files.length);
    console.log('data file', files);

    for (var i = 0; i < files.length; i++) {
      // images.push(files[i]);
      console.log(images);
      console.log(files[i]);

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
      console.log(images);
    }
    this.setState({ image_content: images });
  };

  onSubmit = e => {
    e.preventDefault();
    const { title, description, cuisine, image_content, token } = this.state;

    const upload = {
      title,
      description,
      cuisine,
      images: image_content,
      token
    };
    // console.log(upload);

    if (title === '') {
      console.log('abcd');
      this.props.createMessage({
        titleRequired: 'Title required! '
      });
    } else if (cuisine === '') {
      this.props.createMessage({
        cuisineRequired: 'Cuisine required! '
      });
    } else if (description === '') {
      this.props.createMessage({
        procedureRequired: 'Procedure required! '
      });
    } else if (token === '') {
      this.props.createMessage({
        tokenRequired: 'Token required! '
      });
    } else {
      this.props.createMessage({
        uploaded: 'Uploaded Successfully'
      });
      this.props.postRecipe(upload);
    }
  };

  render() {
    const { title, description, cuisine, image, token } = this.state;
    return (
      <Fragment>
        <div className='uptop'>
          <div class='container'>
            <div class='uptop_cont animated zoomInDown delay-1s'>
              Hungry Hippo&nbsp;
              <span class='fas fa-hippo' style={{ fontSize: 'smaller' }}></span>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className='container'>
          <form onSubmit={this.onSubmit}>
            <div className='row'>
              <div className='col-lg-5'>
                <label className='label'>Recipe name</label>
                <input
                  type='text'
                  className='form-control col-10'
                  name='title'
                  onChange={this.onChange}
                  value={title}
                />
              </div>
              <div className='col-lg-5'>
                {' '}
                <label className='label'>Cuisine</label>
                <input
                  type='text'
                  className='form-control col-10'
                  name='cuisine'
                  onChange={this.onChange}
                  value={cuisine}
                />
              </div>
              <div className='col-lg-2'></div>
            </div>
            <br />
            <br />

            <br />
            <br />
            <div className='row'>
              <div className='col-lg-5'>
                <label className='label'>Description</label>
                <textarea
                  rows={20}
                  name='description'
                  style={{ height: '45vh' }}
                  className='form-control col-10'
                  onChange={this.onChange}
                  value={description}
                />
              </div>
              <div className='col-lg-5'>
                <div className='row'>
                  <div className='col-lg-12'>
                    <label className='label'>Token</label>
                    <input
                      type='text'
                      className='form-control col-10'
                      name='token'
                      onChange={this.onChange}
                      value={token}
                    />
                  </div>
                </div>
                <div className='row' style={{ marginTop: '50px' }}>
                  <div className='col-lg-12'>
                    <label className='label'>image</label>
                    <br />
                    <i className='fas fa-image fa-2x' />
                    &nbsp;&nbsp;&nbsp;
                    <input
                      type='file'
                      name='image'
                      accept='image/jpeg, image/jpg, image/png'
                      onChange={this.onChange2}
                      value={image}
                      multiple
                    />
                  </div>
                </div>
                <div className='row' style={{ marginTop: '50px' }}>
                  <div className='col-lg-12'>
                    <button
                      className='btn btn-outline-info btn-block'
                      type='submit'
                      style={{ width: '80%' }}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>

              <div className='col-lg-2'></div>
            </div>
          </form>
        </div>
        <br />
        <br />
        <br />
        <br />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  recipe: state.recipe
});

export default connect(mapStateToProps, {
  postRecipe,
  createMessage
})(Upload);
