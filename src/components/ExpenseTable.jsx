import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeExpense, deleteExpense } from '../actions';
import './expenseTable.css';

class ExpensesTable extends React.Component {
  constructor() {
    super();

    this.listExpenses = this.listExpenses.bind(this);
  }

  listExpenses() {
    const { expenses, removeExpense, editExpense } = this.props;
    return expenses.map((
      { description, currency, method, tag, value, id, exchangeRates },
    ) => {
      const { ask, name } = exchangeRates[currency];
      return (
        <tr key={ id }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{value}</td>
          <td>{name}</td>
          <td>{parseFloat(ask).toFixed(2)}</td>
          <td>{(value * ask).toFixed(2)}</td>
          <td>Real</td>
          <td>
            <button
              className='table__btn'
              type="button"
              data-testid="edit-btn"
              onClick={ () => editExpense(id) }
              >
                Editar
              </button>
            <button
              className='table__btn'
              type="button"
              data-testid="delete-btn"
              onClick={ () => removeExpense(id) }
              >
                Deletar
              </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className='table__container'>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {this.listExpenses()}
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(deleteExpense(id)),
  editExpense: (id) => dispatch(changeExpense(id)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editExpense: state.wallet.editExpense,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  removeExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
