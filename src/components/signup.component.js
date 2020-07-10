import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter  } from 'react-router-dom';
import axios from 'axios';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: "",
            nameError: "",
            lastName: "",
            email: "",
            emailError: '',
            password: "",
            passwordError: '',
            role: "",
            cc: "",
            phone: "",
            phonenumber: "",
            isUserAvailable:true,

        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    userhandler = (event) => {
        this.setState({
            user: event.target.value
        })
    }
    firsthandler = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }
    lasthandler = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }
    emailhandler = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    passwordhandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    rolehandler = (event) => {
        this.setState({
            role: event.target.value
        })
    }

    ccdhandler = (event) => {
        this.setState({
            cc: event.target.value
        })
    }

    phonehandler = (event) => {
        this.setState({
            phone: event.target.value
        })
    }




    nameValidator() {
        if (this.state.firstName == "" || this.state.lastName == "") {
            this.setState({ nameError: "Name field can't be empty" })

        }
        else {
            this.setState({ nameError: "" })
        }
    }

    emailValidator() {
        if (this.state.email == "") {
            this.setState({ emailError: "email field can't be empty" })
        }
        else {
            this.setState({ emailError: "" })
        }
    }

    passwordValidator() {
        if (this.state.password == "") {
            this.setState({ passwordError: "email field can't be empty" })
        }
        else {
            this.setState({ passwordError: "" })
        }
    }

    phoneValidator() {
        if(!isValidPhoneNumber(this.state.phonenumber))
         alert("Invalid Phone Number");
    }

    usernameValidator = () => {
        axios.get("http://127.0.0.1:8000/api/customusers/?user="+this.state.user)
        .then(res => this.checkuser(res.data))
        .catch(function (error) {
         console.log(error);
        });
    }

    checkuser = (data) => {
        alert("checkuser");
        if(data[0] == undefined){
            alert("No Response");
            this.setState({
                isUserAvailable: false
            })
        }
        else if(data[0].user == this.state.user){
            alert("Got User");
            this.setState({
                isUserAvailable: true
            })
         }
         else{
            alert("No User");
            this.setState({
                isUserAvailable: false
            })
         }
      };

    handleSubmit = (event) => {

        var res = "";
        //this.usernameValidator();

        /*axios.get("http://127.0.0.1:8000/api/customusers/?user="+this.state.user)
        .then(res => this.checkuser(res.data))
        .catch(function (error) {
         console.log(error);
        });
*/

        /*alert(this.state.isUserAvailable);
        if(this.state.isUserAvailable)
        {
            alert("Username already exists");
        }
        else*/ 
        if (this.state.firstName == "" || this.state.lastName == "" || this.state.email == "" || this.state.password == "")
        {
            
                alert("Please fill required field/s")
        }
        else if(!isValidPhoneNumber(this.state.phonenumber)){
            alert("Invalid Phone Number");
        }
        else {
            //call api to register
            //start

            var apiBaseUrl = "http://127.0.0.1:8000/api";
            var self = this;
            var payload={
                "user": this.state.user,
                "password": this.state.password,
                "firstname": this.state.firstName,
                "lastname": this.state.lastName,
                "email": this.state.email,
                "role": this.state.role,
                "countrycode": "+",
                "phone": this.state.phonenumber

      
            }
            axios.post(apiBaseUrl+'/customusers/', payload)
            .then(res => this.goToLogin(res))
            .catch(function (error) {
             console.log(error);
             alert("Please Check Values or Change Username");
            });

            //end
            //alert(`${this.state.firstName} ${this.state.lastName}  Registered Successfully !!!!`)
             
            
        }
        console.log(this.state);
        console.log(res);
        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            password: '',
            gender: "",
        })
        event.preventDefault()
        //this.goToLogin()
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <table>
                <tr>
                <td>
                        <div className="form-group">
                    <label>User Name</label>
                    <input type="text" className="form-control" value={this.state.user} maxLength={20} onBlur={() => this.nameValidator()} onChange={this.userhandler} placeholder="User name" />

                </div> 
                        </td>
                        
                        <td>
                        <div className="form-group">
                    <label>Role</label>
                    
                    <select defaultValue={this.state.selectValue} onChange={this.rolehandler} >
                    <option value="">Select</option>
                        <option value="QAAdmin">QAAdmin</option>
                        <option value="QALogger">QALogger</option>
                        <option value="QAAnalyser">QAAnalyser</option>
                    </select>

                </div>
                        </td>

                       
                       
                    </tr>
                    <tr>
                        <td>
                        <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" value={this.state.firstName} maxLength={20} onBlur={() => this.nameValidator()} onChange={this.firsthandler} placeholder="First name" />

                </div> 
                        </td>
                        <td>
                        <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" value={this.state.lastName} maxLength={20} onBlur={() => this.nameValidator()} onChange={this.lasthandler} placeholder="Last name" />
                </div>   
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" value={this.state.email} maxLength={50} onBlur={() => this.emailValidator()} onChange={this.emailhandler} placeholder="Enter email" />
                </div>
                        </td>
                        <td>
                        <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={this.state.password} maxLength={15} onBlur={() => this.passwordValidator()} onChange={this.passwordhandler} placeholder="Enter password" />
                </div>
                        </td>
                    </tr>
                    
                    
                    <tr>
                        <td>
                        <div className="form-group">
                    <label>Phone Number</label>
                    <form id="phoneflagid">
                        <PhoneInput 
                            international
                            defaultCountry="IN"
                            value={this.state.phonenumber}
                            onChange={value => this.setState({phonenumber:value})}
                            
                            
                        />
                  
                    </form>
                </div>
                        </td>
                        </tr>
                </table>

                <button type="submit" className="btn btn-primary btn-block" >Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered?
                    <Link className="navbar-brand" to={"/sign-in"}>sign in.</Link>
                </p>
            </form>
        );
    }//render ends
    goToLogin = (data) => {
    
        //alert(data.user);
        if(data.user != ""){

            alert("Successfully Registered");
            this.props.history.push("/sign-in");
            
        }

      };
}//class ends
export default withRouter(SignUp);