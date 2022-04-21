import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormExpenses from '../components/FormExpenses';
import WalletForm from '../components/WalletForm';
import ExpenseTable from '../components/ExpenseTable';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './wallet.css';

class Wallet extends React.Component {
  render() {
    const { editExpense } = this.props;
    return (
      <div className='container wallet__container'>
          <Header />
        <div className='wallet-form__container'>
          {(editExpense) ? <FormExpenses /> : <WalletForm />}
          <ExpenseTable />
        </div>
        <Footer />
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
