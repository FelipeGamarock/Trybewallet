import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmail, expenses } = this.props;
    const total = (expenses.length > 0
      ? expenses.reduce((acc, curr) => {
        acc += curr.value * parseFloat(curr.exchangeRates[curr.currency].ask);
        return acc;
      }, 0)
      : 0);
    return (
      <header>
        <h2 data-testid="email-field">{ userEmail }</h2>
        <p data-testid="total-field">{total.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>);
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
