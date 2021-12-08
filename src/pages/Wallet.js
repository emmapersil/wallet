import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormExpenses from '../components/FormExpenses';
import WalletForm from '../components/WalletForm';
import ExpenseTable from '../components/ExpenseTable';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { editExpense } = this.props;
    return (
      <div>
        <Header />
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
