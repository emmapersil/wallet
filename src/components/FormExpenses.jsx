import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, saveEditExpense } from '../actions';
import FormInput from './FormInput';
import SelectInput from './SelectInput';

class FormExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.importValuesToExpense = this.importValuesToExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendExp = this.sendExp.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
    this.importValuesToExpense();
  }

  importValuesToExpense() {
    const {
      expense: { value, currency, method, tag, description },
    } = this.props;
    this.setState({ value, currency, method, tag, description });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  sendExp() {
    const { value, currency, method, tag, description } = this.state;
    const { expense: { id, exchangeRates }, saveExpense } = this.props;
    saveExpense({ value, currency, method, tag, description, id, exchangeRates });
  }

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <FormInput
          title="Valor:"
          type="number"
          name="value"
          id="value-input"
          value={ value }
          handleChange={ this.handleChange }
        />
        <SelectInput
          title="Moeda:"
          name="currency"
          id="currency-input"
          idName="moeda"
          options={ currencies }
          handleChange={ this.handleChange }
        />
        <SelectInput
          title="Método de Pagamento:"
          name="method"
          id="method-input"
          idName="method"
          options={ ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] }
          handleChange={ this.handleChange }
        />
        <SelectInput
          title="Tag:"
          name="tag"
          id="tag-input"
          idName="tag"
          options={ ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'] }
          handleChange={ this.handleChange }
        />
        <FormInput
          title="Descrição:"
          type="text"
          name="description"
          id="description-input"
          value={ description }
          handleChange={ this.handleChange }
        />
        <button
        className='expense__btn'
        type="button"
        onClick={ () => this.sendExp() }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expense: state.wallet.expenseToChange,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(saveEditExpense(expense)),
  getCurrencies: () => dispatch(fetchCurrencies()),
});

FormExpenses.propTypes = {
  saveExpense: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf.isRequired,
  expense: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormExpenses);
