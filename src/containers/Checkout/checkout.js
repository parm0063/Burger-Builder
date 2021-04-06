import { Component } from 'react';
import { connect } from 'react-redux';

import React from 'react';
// import Burger from '../../../components/Burger/Burger';
// import Aux from '../../../hoc/Auxx';
import Checkoutsummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
// import * as actions from '../../store/actions/index';

class Checkout extends Component {

    // componentWillMount() {
    //     this.props.onInitPurchase();
    // }
    // state={
    //     ingredients: null,
    //     price: 0,
    //     orders:null
    // }

    //REMOVE AFTER REDUX
    // componentWillMount() {// EXTRACT QUERY PARAMS
    //     // console.log(this.props);
    //     const query = new URLSearchParams(this.props.history.location.search);
    //     console.log(query);
    //     // console.log(this.props.history.location.search); //?bacon=1&salad=1...
    //     const ingredients= {};
    //     let price=0;
    //     for (let param of query.entries()) {
    //         // console.log(param); // ["bacon", 1] ["salad", 1]...
    //         // console.log(ingredients);
    //         if(param[0] === 'price') {
    //             price = param[1];
    //         }
    //         else {
    //             ingredients[param[0]] = +param[1]; //convert array to object
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    cancelHandler = () => {
        // console.log("cancelledddd");
        this.props.history.goBack();

    }
    continueHandler = () => {
        // console.log(this.props);
        this.props.history.replace('/checkout/contact-data');

    }

    render() {
        let summary = <Redirect to="/" />
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
            <div>
                {purchasedRedirect}
                <Checkoutsummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.cancelHandler}
                    checkoutContinued={this.continueHandler}
                ></Checkoutsummary>
                <Route path={this.props.match.path + '/contact-data'}
                       component={ContactData} ></Route>
            </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased    
    }
}

export default connect(mapStateToProps)(Checkout);