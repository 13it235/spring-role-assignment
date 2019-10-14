import React, { Component, Fragment } from 'react';

class UserDetails extends Component {
  allUsers = [];
  state = {
    user: null
  };

  componentDidMount() {
    let ifUsersExist = JSON.parse(localStorage.getItem('users'));
    if (ifUsersExist) {
      // this.setState({ allUsers: ifUsersExist }); [].concat.apply([], ifUsersExist)
      this.allUsers = Array.prototype.concat.apply([], ifUsersExist);
      this.getUser(this.props.match.params.id);
    } else this.props.history.push('/');
  }

  getUser(id) {
    const userFound = this.allUsers.filter(user => {
      return user.id == id;
    });
    console.log('user found', userFound);
    this.setState({ user: userFound[0] });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="detail-container">
        <h5>{user && user.first_name + ' ' + user.last_name}</h5>
        {user &&
          Object.keys(user).map((key, index) => {
            return (
              <div className="row" key={index}>
                <div className="col-sm-6 text-left">{key}</div>
                <div className="col-sm-6 text-right">{user[key]}</div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default UserDetails;
