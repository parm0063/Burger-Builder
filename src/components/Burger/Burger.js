import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients) //convert object into array
        .map(igKey => {
            return [...Array(props.ingredients[igKey])]  
            .map((_,i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} /> //igKey=salad nd all..... i is index
            })                                                           // return [...Array(props.ingredients[igKey])] //give array with 2 [ , ] elements empty spaces 
        })
        .reduce((arr,el) => {
            return arr.concat(el)             //arr=previous array el=current array, output => []=> bv bdhha array ne ek ma kare che 
        }, []); 
        // console.log(transformedIngredients);

        if(transformedIngredients.length === 0) {
            transformedIngredients = <p>Please Start Adding Ingredients!</p>
        }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;