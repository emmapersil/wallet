import React from 'react';
import PropTypes from 'prop-types';
import './selectInput.css';

class SelectInput extends React.Component {
  render() {
    const { title, name, id, options, handleChange, idName, value } = this.props;
    return (
      <div className='container select__container'>
        <label htmlFor={ idName }>
          {title}
        </label>
        <select
          data-testid={ id }
          name={ name }
          value={ value }
          id={ idName }
          onChange={ (event) => handleChange(event) }
        >
          {options.map((oneOption) => (
            <option
              value={ oneOption }
              key={ oneOption }
              data-testid={ oneOption }
            >
              {oneOption}

            </option>
          ))}
        </select>
      </div>
    );
  }
}

SelectInput.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  idName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SelectInput;
