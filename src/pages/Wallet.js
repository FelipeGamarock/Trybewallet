import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Form from '../components/Form';
import ExpensesTable from '../components/ExpensesTable';

import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatchCurrencies } = this.props;
    await dispatchCurrencies();
  }

  render() {
    return (
      <div>
        <Header />
        <Form />
        <ExpensesTable />
      </div>);
  }
}

Wallet.propTypes = {
  dispatchCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(null, mapDispatchToProps)(Wallet);
