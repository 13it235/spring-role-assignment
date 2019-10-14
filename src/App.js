import React, { Component } from 'react';
import Axios from 'axios';
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Search from './layout/search';
import Pagination from './layout/pagination';
import UserDetails from './userDetails';
import Dashboard from './dashboard';

class App extends Component {
  // state = {
  //   searchedName: '',
  //   users: [],
  //   currentUsers: [],
  //   currentPage: null,
  //   totalPages: null
  // };

  // componentDidMount() {
  //   Axios.get('http://demo9197058.mockable.io/users')
  //     .then(response => {
  //       console.log('users', response);
  //       if (response.status === 200) {
  //         this.setState({ users: response.data });
  //         localStorage.setItem('users', JSON.stringify(response.data));
  //       }
  //     })
  //     .catch(error => {
  //       console.log('error', error);
  //     });
  // }

  // handleSearch = value => {
  //   console.log('in app search value', value);
  //   const { users } = this.state;
  //   const lowercasedFilter = value.toLowerCase();
  //   const filteredData = users.filter(user => {
  //     // return Object.keys(item).some(key => item[key].toLowerCase().includes(lowercasedFilter));
  //     return user['first_name'].toLowerCase().includes(lowercasedFilter);
  //   });
  //   console.log('filteredData', filteredData);
  //   this.setState({ users: filteredData });
  // };

  // onPageChanged = data => {
  //   const { users } = this.state;
  //   const { currentPage, totalPages, pageLimit } = data;

  //   const offset = (currentPage - 1) * pageLimit;
  //   const currentUsers = users.slice(offset, offset + pageLimit);

  //   this.setState({ currentPage, currentUsers, totalPages });
  // };

  // componentWillUnmount() {
  //   this.setState({ users: [], currentUsers: [] });
  // }

  render() {
    // const { users, currentUsers, currentPage, totalPages } = this.state;
    // const totalUsers = users.length;

    // if (totalUsers === 0) return null;

    return (
      <BrowserRouter>
        {/* <div className="App">
          <header className="App-header">Data view</header>
          <Search placeholder="Search by first name" onSearch={this.handleSearch} />
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>
                    <i className="fa fa-caret-down" />First Name
                  </th>
                  <th>
                    <i className="fa fa-caret-down" />Last Name
                  </th>
                  <th>
                    <i className="fa fa-caret-down" />Company Name
                  </th>
                  <th>
                    <i className="fa fa-caret-down" />City
                  </th>
                  <th>
                    <i className="fa fa-caret-down" />State
                  </th>
                  <th>
                    <i className="fa fa-caret-down" />Zip
                  </th>
                  <th>
                    <i className="fa fa-caret-down" />Email
                  </th>
                  <th>
                    <i className="fa fa-caret-down" />Web
                  </th>
                  <th>
                    <i className="fa fa-caret-down" />Age
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 &&
                  currentUsers.map((user, id) => {
                    return (
                      <tr key={id}>
                        {/* <Link to={`users/${id}`}>
                        <td>
                          <Link to={`/${id}`}>{user.first_name}</Link>
                        </td>
                        <td>{user.last_name}</td>
                        <td>{user.company_name}</td>
                        <td>{user.city}</td>
                        <td>{user.state}</td>
                        <td>{user.zip}</td>
                        <td>{user.email}</td>
                        <td>{user.web}</td>
                        <td>{user.age}</td>
                        {/* </Link> 
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="paginate-container">
            <Pagination totalRecords={totalUsers} pageLimit={5} pageNeighbours={1} onPageChanged={this.onPageChanged} />
          </div>
        </div> */}
        {/* <Redirect /> */}
        <Route exact path="/">
          <Redirect to="/users" />
        </Route>
        <Route path={`/users`} component={Dashboard} />
        <Route path={`/users/:id`} component={UserDetails} />
      </BrowserRouter>
    );
  }
}

export default App;
