import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.totalExpenses = this.totalExpenses.bind(this);
  }

  totalExpenses() {
    const { expenses } = this.props;
    const totalField = expenses.reduce((acc, curr) => {
      const { ask } = curr.exchangeRates[curr.currency];
      return acc + curr.value * ask;
    }, 0);

    return totalField.toFixed(2);
  }

  render() {
    const { user } = this.props;

    return (
      <header>
        <div className="container header__container">
          <div className="email__field">
            <h2 data-testid="email-field">{user}</h2>
          </div>
          <div className='balance__field'>
            <h3 data-testid="total-field">{this.totalExpenses()} <small>BRL</small>
            </h3>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
