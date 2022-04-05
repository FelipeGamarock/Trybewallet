import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      spentValue: '',
      currency: '',
      paymentMethod: '',
      category: '',
      description: '',
    };
  }

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const { spentValue, currency, paymentMethod, category, description } = this.state;
    const { currencies } = this.props;
    const METODOS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const CATEGORIAS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    console.log(currencies);
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

      </form>);
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Form);
