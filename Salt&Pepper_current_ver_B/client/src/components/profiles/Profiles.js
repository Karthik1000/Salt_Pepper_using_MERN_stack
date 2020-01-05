import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import { editFollow } from '../../actions/profile';
import { createMessage } from '../../actions/messages';

export class Profiles extends Component {
  static propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    editFollow: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getProfiles();
  }

  OnFollow = prof => {
    const current = this.props.profile.profile;

    if (prof.user) {
      if (prof.user._id === current.user._id) {
        this.props.createMessage({
          cannotfollow: 'You cannot follow yourself'
        });
      } else {
        const flwing = prof.user;
        const follower = current.user;

        if (current.following.includes(flwing)) {
          this.props.createMessage({
            alreadyFollowing: 'Already following'
          });
        } else {
          prof.followers.push(follower);
          current.following.push(flwing);

          this.props.editFollow(prof);
          this.props.editFollow(current);
        }
      }
    }
  };

  render() {
    const profile = this.props.profile;
    return (
      <Fragment>
        {profile.loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1 className='large text-primary'>Users</h1>
            <div>
              {profile.profiles ? (
                profile.profiles.map(prof =>
                  prof.user ? (
                    prof.user !== null ? (
                      <div className='profile bg-light'>
                        {prof.user ? (
                          <img
                            src={prof.user.avatar}
                            alt=''
                            className='round-img'
                          />
                        ) : (
                          ''
                        )}
                        <div>
                          {prof.user ? <h2>{prof.user.name}</h2> : ''}
                          {prof.user ? <p>{prof.user.email}</p> : ''}
                          {prof.dob ? <p>{prof.dob}</p> : ''}
                          {prof.user ? (
                            <Link to={`/profile/${prof.user._id}`}>
                              View Profile
                            </Link>
                          ) : (
                            ''
                          )}
                          <button onClick={this.OnFollow.bind(this, prof)}>
                            {' '}
                            Follow{' '}
                          </button>
                        </div>
                      </div>
                    ) : (
                      ' '
                    )
                  ) : (
                    ''
                  )
                )
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
  profile: state.profile
});

export default connect(mapStateToProps, {
  getProfiles,
  editFollow,
  createMessage
})(Profiles);
