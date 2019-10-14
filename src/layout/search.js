import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './style/search.css';

class Search extends Component {
  render() {
    const { placeholder, onSearch } = this.props;
    return (
      <Fragment>
        <input
          placeholder={placeholder}
          onChange={e => {
            onSearch(e.target.value);
          }}
        />
      </Fragment>
    );
  }
}

Search.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string
};

export default Search;
