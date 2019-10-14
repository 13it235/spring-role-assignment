import React, { Component } from 'react';
import Axios from 'axios';
import './App.css';
import Search from './layout/search';
import Pagination from './layout/pagination';

class Dashboard extends Component {
  state = {
    searchedName: '',
    users: [],
    currentUsers: [],
    currentPage: null,
    totalPages: null
  };

  componentDidMount() {
    Axios.get('http://demo9197058.mockable.io/users')
      .then(response => {
        if (response.status === 200) {
          this.setState({ users: response.data });
          localStorage.setItem('users', JSON.stringify(response.data));
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  handleSearch = value => {
    console.log('in app search value', value);
    const { users } = this.state;
    const lowercasedFilter = value.toLowerCase();
    const filteredData = users.filter(user => {
      // return Object.keys(item).some(key => item[key].toLowerCase().includes(lowercasedFilter));
      return user['first_name'].toLowerCase().includes(lowercasedFilter);
    });
    console.log('filteredData', filteredData);
    this.setState({ users: filteredData });
  };

  onPageChanged = data => {
    const { users } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentUsers = users.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentUsers, totalPages });
  };

  goToDetails(id) {
    this.props.history.push(`/user/${id}`);
  }

  render() {
    const { users, currentUsers, currentPage, totalPages } = this.state;
    const totalUsers = users.length;

    if (totalUsers === 0) return null;

    return (
      <div className="App">
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
                currentUsers.map(user => {
                  return (
                    <tr key={user.id} onClick={() => this.goToDetails(user.id)}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.company_name}</td>
                      <td>{user.city}</td>
                      <td>{user.state}</td>
                      <td>{user.zip}</td>
                      <td>{user.email}</td>
                      <td>{user.web}</td>
                      <td>{user.age}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="paginate-container">
          <Pagination totalRecords={totalUsers} pageLimit={5} pageNeighbours={1} onPageChanged={this.onPageChanged} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
