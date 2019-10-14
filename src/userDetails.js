import React, { Component, Fragment } from 'react';

class UserDetails extends Component {
  allUsers = [];
  state = {
    user: null,
    first_name: '',
    last_name: ''
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
    var temp;
    var userFound = this.allUsers.filter(user => {
      return user.id == id;
    });
    console.log('user found', userFound);
    userFound = userFound[0];
    temp = {
      Company: userFound['company_name'],
      City: userFound['city'],
      State: userFound['state'],
      Zip: userFound['zip'],
      Email: userFound['email'],
      Web: userFound['web'],
      Age: userFound['age']
    };
    this.setState({ first_name: userFound['first_name'] });
    this.setState({ last_name: userFound['last_name'] });
    this.setState({ user: temp });
  }

  render() {
    const { user, first_name, last_name } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <i className="fa fa-arrow-left" onClick={() => this.props.history.push('/users')} />Data view
        </header>
        <div className="detail-container">
          <h3>{user && first_name + ' ' + last_name}</h3>
          {user &&
            Object.keys(user).map((key, index) => {
              return (
                <div className="row userItem" key={index}>
                  <div className="col-sm-6 text-left">{key}</div>
                  <div className="col-sm-6 text-right">{user[key]}</div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default UserDetails;
