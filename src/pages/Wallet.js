import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brl: 'BRL',
      total: 0,
    };
  }

  render() {
    const { brl, total } = this.state;
    const { email } = this.props;
    return (
      <div>
        <header>
          <p
            data-testid="email-field"
          >
            {`E-mail: ${email}`}
          </p>
          <h4
            data-testid="total-field"
          >
            {`Total: ${total}`}
          </h4>
          <h4
            data-testid="header-currency-field"
          >
            {brl}
          </h4>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
