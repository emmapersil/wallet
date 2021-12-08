import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userLogin from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    if (name === 'email') {
      this.setState({ email: value });
    } else if (name === 'password') {
      this.setState({ password: value });
    }
  }

  render() {
    const { email, password } = this.state;
    const { saveUser, history } = this.props;
    const six = 6;
    const buttonDisabled = !(email.includes('@') && email.endsWith('.com')
    && password.length >= six);

    return (
      <div>
        <form>
          <label htmlFor="email-input">
            Insira o e-mail:
            <input
              id="email-input"
              data-testid="email-input"
              type="email"
              name="email"
              placeholder="seuemail@email.com"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-input">
            <input
              id="password-input"
              data-testid="password-input"
              type="password"
              name="password"
              placeholder="******"
              onChange={ this.handleChange }
            />
          </label>
          <input
            type="button"
            value="Entrar"
            disabled={ buttonDisabled }
            onClick={ () => {
              saveUser(email);
              history.push('/carteira');
            } }
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  saveUser: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
