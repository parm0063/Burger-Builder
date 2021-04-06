import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxx';

const withErrorHandler = (WrappedComponent, axios) => { //take wrappedcomp as an input
    return class extends Component {
        state = {
            error: null
        }

        // componentDidMount () { //best place for fetching data
        //     axios.interceptors.request.use(req => {
        //         this.setState({error: null});
        //         return req;
        //     })
        //     axios.interceptors.response.use(res=>res, error => {
        //         this.setState({error: error});

        //     })

        // }

        //not working so use will mount

        componentWillMount () { //called before the child component render
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.resInterceptor= axios.interceptors.response.use(res=>res, error => {
                this.setState({error: error});
            })

        }

        //for ex we don't need any component like burgerbuilder then this use.

        componentWillUnmount() { //use when component isn't required anymore
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                <Modal show= {this.state.error}
                    modalclosed={this.errorConfirmHandler}>
                       {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props}></WrappedComponent>
                </Aux>
            )
        }
    }
        
}
export default withErrorHandler;

