import React, { Component, Fragment } from 'react';
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
    if (value.length > 0) {
      const { users } = this.state;
      const lowercasedFilter = value.toLowerCase();
      const filteredData = users.filter(user => {
        // return Object.keys(item).some(key => item[key].toLowerCase().includes(lowercasedFilter));
        return user['first_name'].toLowerCase().includes(lowercasedFilter);
      });
      console.log('filteredData', filteredData);
      const currentUsers = filteredData.slice(0, 0 + 5);
      this.setState({ currentUsers });
    }
  };

  onPageChanged = data => {
    const { users } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentUsers = users.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentUsers, totalPages });
  };

  compareBy(key) {
    return function(a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }

  onSort(key) {
    let arrayCopy = [...this.state.users];
    arrayCopy.sort(this.compareBy(key));
    const currentUsers = arrayCopy.slice(0, 0 + 5);
    this.setState({ users: arrayCopy, currentUsers });
  }

  goToDetails(id) {
    this.props.history.push(`/user/${id}`);
  }

  render() {
    const { users, currentUsers, currentPage, totalPages } = this.state;
    const totalUsers = users.length;

    if (totalUsers === 0) return null;

    return (
      <div className="App">
        <header className="App-header">
          <i className="fa fa-bars" />
          Data view
        </header>
        <span>
          <Search placeholder="Search by first name" onSearch={this.handleSearch} />
          <Fragment>{currentPage * 5 - 5 + 1 + '-' + currentPage * 5 + ' of ' + totalUsers}</Fragment>
        </span>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th onClick={() => this.onSort('first_name')}>
                  <i className="fa fa-caret-down" />First Name
                </th>
                <th onClick={() => this.onSort('last_name')}>
                  <i className="fa fa-caret-down" />Last Name
                </th>
                <th onClick={() => this.onSort('company_name')}>
                  <i className="fa fa-caret-down" />Company Name
                </th>
                <th onClick={() => this.onSort('city')}>
                  <i className="fa fa-caret-down" />City
                </th>
                <th onClick={() => this.onSort('state')}>
                  <i className="fa fa-caret-down" />State
                </th>
                <th onClick={() => this.onSort('zip')}>
                  <i className="fa fa-caret-down" />Zip
                </th>
                <th onClick={() => this.onSort('email')}>
                  <i className="fa fa-caret-down" />Email
                </th>
                <th onClick={() => this.onSort('web')}>
                  <i className="fa fa-caret-down" />Web
                </th>
                <th onClick={() => this.onSort('age')}>
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
