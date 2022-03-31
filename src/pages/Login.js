import React from 'react';
import { Redirect } from 'react-router';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisable: false,
      redirect: false,
    };
  }

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  effectLogin = () => {
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

export default Login;
