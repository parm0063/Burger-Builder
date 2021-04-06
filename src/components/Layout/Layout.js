import React, { Component } from 'react';
import Aux from '../../hoc/Auxx';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state ={
        handle: {
            showSideDrawer : true
        }
    }
    SidedrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        // this.setState({showSideDrawer: !this.state.showSideDrawer});
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }
    
    render() {
        return(
            <Aux>
                <Toolbar
                     isAuth={this.props.isAuthenticated}
                     drawerToggleClicked={this.sideDrawerToggleHandler}></Toolbar>
                <SideDrawer 
                     isAuth = {this.props.isAuthenticated}
                     open={this.state.showSideDrawer} closed={this.SidedrawerCloseHandler}></SideDrawer>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>

        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !==null
    }
}

export default connect(mapStateToProps)(Layout);