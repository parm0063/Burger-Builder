import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/spinner';
import withErrorHandler from '../../../hoc/withErrorHandling/witherrorhandler';
import * as burgerBuilderActions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        // name:'',
        // email:'',
        // address: {
        //     street: '',
        //     postalcode: ''
        // },

        orderForm: {
            name:{
                elementType: 'input',
                elementConfig: {//html attributes
                    type:'text',
                    placeholder: 'Your Name'                
                },
                value: '',
                validation: {
                    required:true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: 'Your Street'                
                },
                value: '',
                validation: {
                    required:true
                },
                valid: false,
                touched: false
            },
            ZipCode: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: 'ZIP Code'                
                },
                value: '',
                validation: {
                    required:true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: 'Country'                
                },
                value: '',
                validation: {
                    required:true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder: 'Email'                
                },
                value: '',
                validation: {
                    required:true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                              {value: 'cheapest', displayValue: 'cheapest'}
                            ]                
                },
                value: 'fastest',
                validation: {},
                valid: true
            } //transform this object into array loop through
        },
        formIsValid : false,
    }
    // componentDidMount() {
    //     // console.log(this.props);
    // }

    checkValidity= (value, rules) => {
        console.log(rules);
        let isValid = true;
        // if(!rules) {
        //     return true;
        // } 2nd wayyyy

        if(rules.required) {
            isValid = value.trim() !== '' && isValid; //no space logic
        }
        // console.log(isValid, "check for valid"); //giving true or false

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        // this.setState({loading: true});
        const formData ={};
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier]= this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            // orderForm: this.props.orders,
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId:this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);


        // axios.post('/orders.json', order) //.json npoint only for firebase
        // .then(response => {
        //     this.setState({loading: false});
        //     this.props.history.push('/');
        // })
        // .catch(error => {
        //     this.setState({loading: false});
        // })
        // console.log(this.props.ingredients);
        // this.props.history.push('/');


    }

    inputChangeHandler =(event, inputIdentifier)=> {
        // console.log(event.target.value);
        // console.log(inputIdentifier);
        //notes: pehla orderForm ni copy lai lidhi ena pchi eni value lidhi [inputidentifier] em karine pchi eni value lidhi...
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        // console.log(updatedForm);
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        // console.log(updatedFormElement);
        updatedFormElement.value= event.target.value;
        updatedFormElement.valid= this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        // console.log(updatedFormElement); //set pchi we are getting value...
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        // console.log(updatedFormElement);

        let formValid = true;
        for(inputIdentifier in updatedOrderForm) {
            formValid = updatedOrderForm[inputIdentifier].valid && formValid;
            console.log(updatedOrderForm[inputIdentifier]);
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formValid});
        console.log(formValid);
    }

    render() {
        const formElements = [];
        for(let key in this.state.orderForm) {
            // console.log(this.state.orderForm[key]); //name: {valuess}
            formElements.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(formElement=> (
                    <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangeHandler(event, formElement.id)}
                    invalidInput = {!formElement.config.valid }
                    shouldValidate ={formElement.config.validation}
                    touched={formElement.config.touched}
                    />
                ))}
                <Button btnType="Success" disabled = {!this.state.formIsValid}> ORDER</Button>
            </form>
        );
        if(this.props.loading) {
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4> Enter your contact Data</h4>
                {form}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(burgerBuilderActions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
