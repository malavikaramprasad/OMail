import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class StripePayments extends Component{
    render() {
        return(
            <StripeCheckout name="OMail" description="$5 for 5 email credits"
                            token={token => this.props.handleToken(token)}
                   stripeKey={process.env.REACT_APP_STRIPE_KEY}
                   amount={500}>
                <button className="btn"> Add Credits </button>
            </StripeCheckout>
        )

    }
}


export default connect(null,actions)(StripePayments);