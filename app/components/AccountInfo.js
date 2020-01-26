import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AccountInfo extends Component {

  render() {
    const { user } = this.props;
    return (
      <>
        <h1>Account Information</h1>
        <>
          {
            user ?
              (
                <div>
                  <h2>First name: {user.firstName}</h2>
                  <h2>Last name: {user.lastName}</h2>
                  <h2>Email: {user.email}</h2>
                  <Link to='/orders'>View orders</Link>
                </div>
              ) : (
                <h2>Loading...</h2>
              )
          }
        </>
      </>
    )
  }
}

const mapState = ({ user }) => {
  return {
    user
  }
}

export default connect(mapState)(AccountInfo)