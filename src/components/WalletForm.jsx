import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchExchange } from '../actions';
import FormInput from './FormInput';
import SelectInput from './SelectInput';

class WalletForm extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      id: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendExp = this.sendExp.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  sendExp() {
    const { value, currency, method, tag, description, id } = this.state;
    const { saveExpense } = this.props;
    saveExpense({ value, currency, method, tag, description, id });
    this.setState({ id: id + 1, value: 0, description: '' });
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
          Adicionar despesa
        </button> 
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(fetchExchange(expense)),
  getCurrencies: () => dispatch(fetchCurrencies()),
});

WalletForm.propTypes = {
  saveExpense: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
