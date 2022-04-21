import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../actions';
import Footer from '../components/Footer';
import './login.css';

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
    const { login } = this.props;
    const six = 6;
    const buttonDisabled = !(email.includes('@') && email.endsWith('.com')
    && password.length >= six);

    return (
      <form className='login__form'>
        <h1>Wallet</h1>
        <div className='container form__container'>
          <div className='form__item'>
          <label htmlFor="email-input">
            E-mail:
            <input
              id="email-input"
              className='input'
              data-testid="email-input"
              type="email"
              name="email"
              placeholder="seuemail@email.com"
              onChange={ this.handleChange }
            />
          </label>
          </div>

          <div className='form__item'>
          <label htmlFor="password-input">
            Senha:
            <input
              id="password-input"
              className='input'
              data-testid="password-input"
              type="password"
              name="password"
              placeholder="******"
              onChange={ this.handleChange }
            />
          </label>
          </div>

          <div className='form__item'>
          <Link to="/carteira">
            <button
              className={ buttonDisabled ? 'btn-disabled' : 'btn'}
              type="button"
              onClick={ () => login(email) }
              disabled={ buttonDisabled }
            >
              Entrar
            </button>
          </Link>
          </div>
        </div>
        <Footer />
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
