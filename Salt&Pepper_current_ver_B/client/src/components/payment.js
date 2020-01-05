import React, { Component } from 'react';

import PaypalExpressBtn from 'react-paypal-express-checkout';

export class Paypal extends Component {
  render() {
    const onSuccess = payment => {
      console.log(JSON.stringify(payment));
    };
    const onCancel = data => {
      console.log(JSON.stringify(data));
    };

    const onError = err => {
      console.log(JSON.stringify(err));
    };

    let env = 'sandbox';
    let currency = 'USD';
    let total = 42;

    const client = {
      sandbox:
        'ATeQVB83-C5ZVfQd76kENAP9RfCf9BZj6FTmjA1sVSZnC8yipa4N-q1Pju1YxEr2sDltCJ7FkrBfwWiX', // sandbox client ID
      production:
        'ASxRpZ8USrOSXc2Ww3CWBUXVcWFj-H3oaxL3u7cEtIA9tZFI6IiPYaTiNoovL6UyqenPHOoDQODqyIj7' // production client ID
    };

    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: 'large',
            color: 'blue',
            shape: 'rect',
            label: 'checkout'
          }}
        />
      </div>
    );
  }
}

export default Paypal;
