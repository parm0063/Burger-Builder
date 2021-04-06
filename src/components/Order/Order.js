import React from 'react';
import classes from './Order.css';

const order = (props) => {/*turn ingredients into array*/

    const ingredients= [];
    for(let key in props.ingredients) {
        console.log(key, "byeeee");
        console.log(props.ingredients[key]);
        // ingredients.push(key +  '(' + props.ingredients[key] + ')' ); my wayyyyy
        ingredients.push({
            name: key,
            amount:props.ingredients[key]
        })

    }
    const ingredientOutput = ingredients.map(igKey => {
        return <span
                   style={{
                       textTransform: 'capitalize',
                       display: 'inline-block',
                       margin: '0 8px',
                       border:'1px solid #ccc',
                       padding:'5px'
                   }}
                   key={igKey.name}>{igKey.name} ({igKey.amount})</span>
        
    });

    return (
        <div className={classes.Order}>
        <span className={classes.Span}> Ingredients:{ingredientOutput} </span>
        <p> Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>

    )
};

export default order;