import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';

const MIN_PASSWORD_LENGTH = 6;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisable: true,
      redirect: false,
    };
  }

  // Codigo para validação de email tirada de:
  // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  verifyInputs = () => {
    this.setState({ isDisable: true });
    const { email, password } = this.state;
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      && password.length >= MIN_PASSWORD_LENGTH) {
      this.setState({ isDisable: false });
    }
  }

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.verifyInputs();
    });
  }

  effectLogin = () => {
    const { email } = this.state;
    const { dispatchEmail } = this.props;
    dispatchEmail(email);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { email, password, isDisable, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/carteira" />;
    }

    return (
      <form>
        <input
          data-testid="email-input"
          name="email"
          type="text"
          value={ email }
          onChange={ this.handleInput }
        />
        <input
          data-testid="password-input"
          name="password"
          type="password"
          value={ password }
          onChange={ this.handleInput }
        />
        <button
          type="button"
          onClick={ this.effectLogin }
          disabled={ isDisable }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
