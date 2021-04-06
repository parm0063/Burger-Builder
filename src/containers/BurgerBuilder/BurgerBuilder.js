import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandling/witherrorhandler';
// import { addIngredient } from '../../store/actions/burgerBuilder';
// import Checkout from './Checkout/checkout';
// import orderSummary from '../../components/Burger/OrderSummary/OrderSummary';
// import Orders from '../Orders/Orders';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        // ingredients: null,
        // totalPrice: 4,
        purchasing: false
        // loading:false,
        // error: false
    }

    componentDidMount () {
        console.log(this.props); 
        this.props.onInitIngredients();
    }


    updatePurchaseState (ingredients) {  //ingredients=updateingredients nichethi j made che ene
        // const ingredients = {...this.state.ingredients};
        console.log(ingredients);
        // console.log(ingredients);
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum,el) => {
            return sum+el;
        },0);
        console.log(sum);
        return sum > 0; // logic: if salad:0, meat: 0 to eni value if 0 hoy to disable nd 0 thi vadhare hoy bdhu add thaine to enable
    }

    //removing after use of react redux

    // addIngredientHandler = (type) => {
    //     console.log('hello');
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;

    //     const updatedIngredients ={...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //     // console.log(updatedIngredients);

    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice+ priceAddition;

    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     console.log('bye');
    //     const oldCount=this.state.ingredients[type];
    //     if(oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;

    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;

    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler= () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onAuthRedirect('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler =() => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
//PASSING QUERY PARAMS => UPAR AVE EE..... FOR THI ITERARATE THASE ND KEY PCHI = VALUE MADSE UPAR
//remove after redux
    // const queryParams = [];
    // for( let i in this.state.ingredients) {
    //     queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('price=' + this.state.totalPrice);

    // const queryString = queryParams.join('&');

    this.props.onInitPurchase();

    this.props.history.push('/checkout');
    }


    render() {
        const disabledInfo = {...this.props.ings};
        // console.log(disabledInfo);
        for(let key in disabledInfo) {
            // console.log(key);
            // console.log(disabledInfo[key]);
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        // const disabledButton = {...this.props.ings};

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;


        if(this.props.ings) { //not null jo to
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}></Burger>
                    <BuildControls
                       ingredientAdded={this.props.onIngredientAdded}
                       ingredientRemoved = {this.props.onIngredientRemoved}
                       disabled={disabledInfo}
                       price={this.props.price}
                       purchasable = {this.updatePurchaseState(this.props.ings)}
                       ordered = {this.purchaseHandler}
                       isAuth={this.props.isAuthenticated}>
                    </BuildControls>
                </Aux>);
            orderSummary = 
            <OrderSummary 
                ingredients={this.props.ings}
                clickcancel={this.purchaseCancelHandler}
                clickcontinue={this.purchaseContinueHandler}
                price={this.props.price}>
            </OrderSummary>
        }
        // if(this.state.loading) {
        //     orderSummary = <Spinner></Spinner>
        // }not important after asynchronus and redux use
        //{salad:true, meat: false}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalclosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }

}

const mapStateToProps = state => {// returns a javascript object where we define which property hold which state
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !==null
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) =>  dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onAuthRedirect: (path) => dispatch(actions.authRedirectPath(path))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));