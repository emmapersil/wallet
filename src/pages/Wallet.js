import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormExpenses from '../components/FormExpenses';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brl: 'BRL',
      total: 0,
    };
    this.sum = this.sum.bind(this);
  }

  sum() {
    const { walletUser } = this.props;
    const total = walletUser.reduce((acc, curr) => (
      acc + (Number(curr.value) * curr.exchangeRates[curr.currency].ask)
    ), 0);
    return total.toFixed(2);
  }

  render() {
    const { brl, total } = this.state;
    const { email } = this.props;
    return (
      <div>
        <header>
          <p
            data-testid="email-field"
          >
            {`E-mail: ${email}`}
          </p>
          <h4
            data-testid="total-field"
          >
            {`Total: ${total}`}
          </h4>
          <h4
            data-testid="header-currency-field"
          >
            {brl}
          </h4>
        </header>
        <FormExpenses />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  walletUser: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  walletUser: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Wallet);
