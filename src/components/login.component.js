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

        alert("Submit");
        //alert(this.state.user);
        
        axios.get("http://127.0.0.1:8000/api/customusers/?user="+this.state.user)
        .then(function (response) {
         console.log(response);
        
         alert(response.data[0].password)
        
        })
        .catch(function (error) {
         console.log(error);
        });

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>User</label>
                    <input type="email" className="form-control" value={this.state.user} onChange={this.userhandler} placeholder="Enter email" />
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
    goToConfig = () => {
    
        this.props.history.push("/qaconfig");
      };

}//class ends

export default withRouter(Login);