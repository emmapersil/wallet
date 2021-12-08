import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormExpenses from '../components/FormExpenses';
import WalletForm from '../components/WalletForm';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  render() {
    const { editExpense } = this.props;
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
        {(editExpense) ? <FormExpenses /> : <WalletForm />}
        <ExpenseTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editExpense: state.wallet.editExpense,
});

Wallet.propTypes = {
  editExpense: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
