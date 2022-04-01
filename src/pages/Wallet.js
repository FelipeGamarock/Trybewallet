import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatchCurrencies } = this.props;
    dispatchCurrencies();
  }

  render() {
    return (
      <div>
        <Header />
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
