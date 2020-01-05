import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profile';
import { editFollow } from '../../actions/profile';
import { createMessage } from '../../actions/messages';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
// import Header_1 from '../home_page/Header_1';
import './search_users.css';

export class Search_Users extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired,
    editFollow: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getProfiles();
  }

  constructor() {
    super();
    this.state = {
      search: ''
    };
  }

  OnFollow = prof => {
    const current = this.props.profile.profile;

    if (prof.user) {
      if (prof.user._id === current.user._id) {
        console.log('abcde');
        this.props.createMessage({
          cannotfollow: 'You cannot follow yourself'
        });
      } else {
        const flwing = prof.user;
        const follower = current.user;

        const f_id = flwing._id;
        const f_array = [];
        console.log(f_id);
        console.log('xyz');

        current.following.map(flw => f_array.push[flw._id]);

        if (f_array.includes(f_id)) {
          this.props.createMessage({
            alreadyFollowing: 'Already following'
          });
        } else {
          prof.followers.push(follower);
          current.following.push(flwing);
          this.props.createMessage({
            Follow: 'Successfully followed ' + flwing.name
          });

          this.props.editFollow(prof);
          this.props.editFollow(current);
        }
      }
    }
  };

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  //   filterByGenre = e => {
  //     let p = false;
  //     console.log(e.target.value);
  //     if (e.target.value == 'false') {
  //       p = false;
  //     }
  //     if (e.target.value == 'true') {
  //       p = true;
  //     }
  //     this.setState({ [e.target.name]: p });
  //   };

  render() {
    let filteredUsers = [];
    const profile = this.props.profile;

    if (this.props.profile && this.props.profile.profiles) {
      for (let i = 0; i < this.props.profile.profiles.length; i++) {
        // console.log(
        //   this.props.profile.profiles[i].cuisine.replace(/ /g, '').toLowerCase()
        // );
        if (
          this.props.profile.profiles[i].user &&
          this.props.profile.profiles[i].user.name &&
          this.props.profile.profiles[i].user.email &&
          this.state[
            this.props.profile.profiles[i].user.name
              .replace(/ /g, '')
              .toLowerCase()
          ]
        ) {
          filteredUsers = [...filteredUsers, this.props.profile.profiles[i]];
        }
      }
    }

    if (filteredUsers.length === 0) {
      filteredUsers = this.props.profile.profiles.filter(allwork => {
        return allwork.user && allwork.user.name && allwork.user.email
          ? allwork.user.name
              .toLocaleLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
              allwork.user.email
                .toLocaleLowerCase()
                .indexOf(this.state.search) !== -1
          : '';
      });
    }

    if (filteredUsers.length) {
      filteredUsers = filteredUsers.filter(allwork => {
        return allwork.user && allwork.user.name && allwork.user.email
          ? allwork.user.name
              .toLocaleLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
              allwork.user.email
                .toLocaleLowerCase()
                .indexOf(this.state.search) !== -1
          : '';
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
              placeholder='Search Users'
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
              className='searchres_text'
              style={{}}
            />
          </div>
        </div>
        <div className='container animated fadeInUp delay-2s'>
          <div className='viewrectop_cont'></div>
          <div className='row'>
            {filteredUsers.map(prof =>
              prof.user ? (
                prof.user !== null ? (
                  <div className='col-lg-3' style={{ marginTop: '3%' }}>
                    <div className='card' style={{ width: '80%' }}>
                      {prof.user ? (
                        <img
                          src={prof.user.avatar}
                          alt=''
                          className='round-img'
                        />
                      ) : (
                        ''
                      )}
                      <div className='karla' style={{ padding: '12px' }}>
                        {prof.user ? (
                          <div>
                            <Link id='black' to={`/profile/${prof.user._id}`}>
                              {prof.user.name}
                            </Link>
                          </div>
                        ) : (
                          ''
                        )}
                        <br />
                        {prof.user ? (
                          <div className='small'>{prof.user.email}</div>
                        ) : (
                          ''
                        )}
                        <br />

                        <button
                          className='btn btn-warning'
                          onClick={this.OnFollow.bind(this, prof)}
                        >
                          {' '}
                          Follow{' '}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  ' '
                )
              ) : (
                ''
              )
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  getProfiles,
  editFollow,
  createMessage
})(Search_Users);
