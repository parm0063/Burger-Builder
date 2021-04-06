import React from 'react';
import Aux from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button';
// import Spinner from '../../UI/Spinner/spinner';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)  //conver array ma => [salad, bacon,..] key madi
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span 
                        style={{textTransform: 'capitalize'}}>
                            {igKey} : {props.ingredients[igKey]}
                    </span>
                </li>);
        });
    return (
        <Aux>
            <h3> Your Order </h3>
            <p> A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p> Continue to Checkout? </p>
            <Button btnType="Danger" clicked={props.clickcancel}> CANCEL</Button>
            <Button btnType="Success" clicked={props.clickcontinue}> CONTINUE </Button>
        </Aux>
    )

}

export default orderSummary;