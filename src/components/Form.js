import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dispatchExpense } from '../actions';

let EXPENSE_ID = 0;
const ALIMENTAÇAO = 'Alimentação';
class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      spentValue: '',
      currency: 'USD',
      paymentMethod: 'Dinheiro',
      category: ALIMENTAÇAO,
      description: '',
    };
  }

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick = () => {
    const { spentValue, currency, paymentMethod, category, description } = this.state;
    const { sendExpense } = this.props;
    const newExpense = {
      id: EXPENSE_ID,
      value: spentValue,
      description,
      currency,
      method: paymentMethod,
      tag: category,
    };
    sendExpense(newExpense);
    this.setState({
      spentValue: '',
      currency: 'USD',
      paymentMethod: 'Dinheiro',
      category: ALIMENTAÇAO,
      description: '',
    });
    EXPENSE_ID += 1;
  }

  render() {
    const { spentValue, currency, paymentMethod, category, description } = this.state;
    const { currencies } = this.props;
    const METODOS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const CATEGORIAS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form>
        <label htmlFor="spentValue">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            id="spentValue"
            name="spentValue"
            value={ spentValue }
            onChange={ this.handleInput }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleInput }
          >
            {currencies
              .map((moeda) => <option key={ moeda }>{ moeda }</option>)}
          </select>
        </label>

        <label htmlFor="paymentMethod">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="paymentMethod"
            name="paymentMethod"
            value={ paymentMethod }
            onChange={ this.handleInput }
          >
            { METODOS.map((method) => <option key={ method }>{ method }</option>) }
          </select>
        </label>

        <label htmlFor="category">
          Categoria
          <select
            type="text"
            data-testid="tag-input"
            id="category"
            name="category"
            value={ category }
            onChange={ this.handleInput }
          >
            { CATEGORIAS
              .map((categoria) => <option key={ categoria }>{ categoria }</option>) }
          </select>
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleInput }
          />
        </label>

        <button
          type="button"
          id="addButton"
          name="addButton"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>

      </form>);
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  sendExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  sendExpense: (expense) => dispatch(dispatchExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
