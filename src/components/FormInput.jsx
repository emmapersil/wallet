import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormInput extends Component {
  render() {
    const { title, type, name, id, value, handleChange } = this.props;
    return (
      <div>
        <label htmlFor={ name }>
          {title}
        </label>
        <input
          type={ type }
          name={ name }
          data-testid={ id }
          value={ value }
          onChange={ (event) => handleChange(event) }
        />
      </div>
    );
  }
}

FormInput.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default FormInput;
