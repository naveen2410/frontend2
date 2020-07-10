import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import { withRouter  } from 'react-router-dom';

class QAConfig extends Component {
    constructor(props) {
        super(props)

        this.state = {
            qaconnid: "",
            systemtype: "",
            ipaddress: "",
            port: "",
            adminuser: "",
            adminpass: "",
            sysid: "",
            client: "",
            githuburl: "",
            triggerrate: "",
            triggeruom: "",
            ABAPdisabled: false,
            UI5disabled: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    qaconnidhandler = (event) => {
        this.setState({
            qaconnid: event.target.value
        })
    }
    systemtypehandler = (event) => {
        if(event.target.value == "ABAP")
        {
            this.setState({UI5disabled:true,ABAPdisabled:false});
        }
        if(event.target.value == "UI5")
        {
            this.setState({UI5disabled:false,ABAPdisabled:true});
        }
        if(event.target.value == "MII")
        {
            this.setState({UI5disabled:true,ABAPdisabled:true});
        }
        this.setState({        
            systemtype: event.target.value
        })

    }
    ipaddresshandler = (event) => {
        this.setState({
            ipaddress: event.target.value
        })
    }
    porthandler = (event) => {
        this.setState({
            port: event.target.value
        })
    }

    
    adminuserhandler = (event) => {
        this.setState({
            adminuser: event.target.value
        })
    }

    adminpasshandler = (event) => {
        this.setState({
            adminpass: event.target.value
        })
    }
    sysidhandler = (event) => {
        this.setState({
            sysid: event.target.value
        })
    }
    clienthandler = (event) => {
        this.setState({
            client: event.target.value
        })
    }
    githuburlhandler = (event) => {
        this.setState({
            githuburl: event.target.value
        })
    }
    triggerratehandler = (event) => {
        this.setState({
            triggerrate: event.target.value
        })
    }
    triggeruomhandler = (event) => {
        this.setState({
            triggeruom: event.target.value
        })
    }


    handleSubmit = (event) => {

        if (this.state.systemtype == "" || 
            this.state.ipaddress == "" || 
            this.state.port == "" || 
            this.state.adminuser == "" || 
            this.state.adminpass == "")
        {
            alert("Please fill required field/s")
        }
        else {
            //call api to register
            //start

        //alert(this.state.qaconnid);
        this.state.sysid = (this.state.sysid=="" ?  null : this.state.sysid );
        this.state.client = (this.state.client=="" ?  null : this.state.client );
        this.state.githuburl = (this.state.githuburl=="" ?  null : this.state.githuburl );
        //this.state.qaconnid = (this.state.qaconnid=="" ?  null : this.state.qaconnid );
        //alert(this.state.qaconnid);

            var apiBaseUrl = "http://127.0.0.1:8000/api";
            var self = this;
            var payload={
                "qaconnid": this.state.qaconnid,
                "systemtype": this.state.systemtype,
                "ipaddress": this.state.ipaddress,
                "port": this.state.port,
                "adminuser": this.state.adminuser,
                "adminpass": this.state.adminpass,
                "sysid": this.state.sysid,
                "client": this.state.client,
                "githuburl": this.state.githuburl,
                "triggerrate": this.state.triggerrate,
                "triggeruom": this.state.triggeruom
      
            }
            axios.post(apiBaseUrl+'/qaconfigs/', payload)
            .then(res => this.goToConfigDetails(res))
            .catch(function (error) {
             console.log(error);
            });

            //end
            //alert(`${this.state.systemtype} Registered Successfully !!!!`)
            
        }
        console.log(this.state);
        
        event.preventDefault()
        //this.goToConfigDetails()
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>System Configuration Details</h3>

            <table>
                <tr>
                <td>
                    <div className="form-group">
                    <label>System Type</label>
                    <select defaultValue={this.state.systemtype} onChange={this.systemtypehandler} >
                    <option value="">Select</option>
                        <option value="MII">SAP MII</option>
                        <option value="ABAP">SAP ABAP</option>
                        <option value="UI5">SAP UI5</option>
                    </select>
                
                
                </div>
                    </td>
                    <td>
                    <div className="form-group">
                    <label>Connection Name</label>
                    <input type="text" className="form-control" value={this.state.qaconnid} maxLength={50}  onChange={this.qaconnidhandler} placeholder="Connection Name" />

                </div>
                    </td>
                    
                    
                </tr>


                <tr>
                    <td>
                    <div className="form-group">
                    <label>IP Address</label>
                    <input type="text" className="form-control" value={this.state.ipaddress} maxLength={15} onChange={this.ipaddresshandler} placeholder="IP Address" />
                </div>
                    </td>
                    <td>
                    <div className="form-group">
                    <label>Port</label>
                    <input type="number" className="form-control" value={this.state.port} maxLength={5}  onChange={this.porthandler} placeholder="Port" />
                </div>
                    </td>
                </tr>
                
                
                <tr>
                    <td>
                    <div className="form-group">
                    <label>Admin User</label>
                    <input type="text" className="form-control" value={this.state.adminuser} maxLength={25}  onChange={this.adminuserhandler} placeholder="Admin User" />
                </div>
                    </td>
                    <td>
                    <div className="form-group">
                    <label>Admin Password</label>
                    <input type="password" className="form-control" value={this.state.adminpass} maxLength={25}  onChange={this.adminpasshandler} placeholder="Admin Password" />
                </div>
                    </td>
                </tr>
                
                
                <tr>
                    <td>
                    <div className="form-group">
                        <label>System ID</label>
                        <input 
                            disabled= {(this.state.ABAPdisabled)? "disabled" : ""}
                            type="number" 
                            className="form-control"
                            value={this.state.sysid} 
                            maxLength={2}  
                            onChange={this.sysidhandler} 
                            placeholder="System ID"
                        />
                    </div>
                    </td>
                    <td>
                    <div className="form-group">
                        <label>Client</label>
                        <input
                            disabled= {(this.state.ABAPdisabled)? "disabled" : ""}
                            type="number" 
                            className="form-control" 
                            value={this.state.client} 
                            maxLength={3}  
                            onChange={this.clienthandler} 
                            placeholder="Client" 
                        />
                    </div>
                    </td>
                </tr>
                
                
                <tr>
                    <td>
                    <div className="form-group">
                        <label>Github URL</label>
                        <input 
                            disabled= {(this.state.UI5disabled)? "disabled" : ""}
                            type="text" 
                            className="form-control" 
                            value={this.state.githuburl} 
                            maxLength={25}  
                            onChange={this.githuburlhandler} 
                            placeholder="Github URL" 
                        />
                    </div>
                    </td>
                    
                </tr>
                
                
                <tr>
                <td>
                    <div className="form-group">
                    <label>Trigger Rate</label>
                    <input type="number" className="form-control" value={this.state.triggerrate} maxLength={3}  onChange={this.triggerratehandler} placeholder="Trigger Rate" />
                </div>
                    </td>
                    <td>
                    <div className="form-group">
                    <label>Trigger UOM</label>
                    <select defaultValue={this.state.triggeruom} onChange={this.triggeruomhandler} >
                    <option value="">Select</option>
                        <option value="H">H</option>
                        <option value="M">M</option>
                        <option value="S">S</option>
                    </select>
                </div>
                    </td>
                    
                </tr>
            </table>



                <button type="submit" className="btn btn-primary btn-block" >Save</button>
                <button  className="btn btn-primary btn-block" onClick={() => this.goToConfigDetailsPage()}>View QA Connection</button>
            </form>
        );
    }//render ends

    goToConfigDetails = (data) => {
    
        if(data.qaconnid != ""){

            alert("Successfully COnfigured");
            this.props.history.push("/table");
            
        }
        
    };
    goToConfigDetailsPage = () => {
    
        this.props.history.push("/table");
        
    };

}//class ends
export default withRouter(QAConfig);