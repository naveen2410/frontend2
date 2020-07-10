import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter  } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: "",
            password: "",
            
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    userhandler = (event) => {
        this.setState({
            user: event.target.value
        })
    }
    passwordhandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }


    handleSubmit = (event) => {

        var pass = this.state.password
        var issuccess = "0";

        axios.get("http://127.0.0.1:8000/api/customusers/?user="+this.state.user)
        .then(res => this.goToConfig(res.data))
        .catch(function (error) {
         console.log(error);
        });

        event.preventDefault()

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>User</label>
                    <input type="text" className="form-control" value={this.state.user} onChange={this.userhandler} placeholder="Enter User" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={this.state.password} onChange={this.passwordhandler} placeholder="Enter password" />
                  
                </div>

                <button type="submit" className="btn btn-primary btn-block" >Submit</button>
                <p className="forgot-password text-right">
                     <a href="#"></a>
                </p>
            </form>
        );
    }//render ends

    //onclick function call
    goToConfig = (data) => {
        
        if(data[0].password == this.state.password){

            alert("Successfully Signed In");
            this.props.history.push("/table");
            
         }else{
             alert("Login Failed");
             this.props.history.push("/sign-in");
         }
        
      };

}//class ends

export default withRouter(Login);