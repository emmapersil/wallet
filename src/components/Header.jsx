import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      <div>
        <header>
          <p data-testid="email-field">{user}</p>
          <p data-testid="total-field">{this.totalExpenses()}</p>
          <p data-testid="header-currency-field">&apos;BRL&apos;</p>
        </header>
      </div>
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
