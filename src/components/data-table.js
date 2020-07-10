import React, { Component } from 'react';
import { withRouter  } from 'react-router-dom';
import axios from 'axios';
import MyTable from "./qaconndetails.component";

class DataTable extends Component {

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.qaconnid}
                </td>
                <td>
                    {this.props.obj.systemtype}
                </td>
                <td>
                    {this.props.obj.ipaddress}
                </td>
                <td>
                    {this.props.obj.port}
                </td>
                <td>
                    {this.props.obj.adminuser}
                </td>
                <td>
                    {this.props.obj.adminpass}
                </td>
                <td>
                    {this.props.obj.sysid}
                </td>
                <td>
                    {this.props.obj.client}
                </td>
                <td>
                    {this.props.obj.githuburl}
                </td>
                <td>
                    {this.props.obj.triggerrate}
                </td>
                <td>
                    {this.props.obj.triggeruom}
                </td>
                <td>
                    <button
                        onClick={() => this.editItem(this.props.obj)}
                        className=""
                        >
                        {" "}
                        Edit{" "}
                    </button>
                    <button
                        onClick={() => this.deleteItem(this.props.obj)}
                        className=""
                        >
                        {" "}
                        Delete{" "}
                    </button>
                </td>
            </tr>
        );
    }//render ends

    editItem = item => {
    
        alert("Edit for ID: " + item.id);
        this.props.history.push("/qaconfig");
        /*
        this.props.history.push({
            pathname: '/',
            data: item.id
        });
        */
        /*
        axios
          .delete(`http://127.0.0.1:8000/api/todos/${item.id}`)
          .then(res => this.refreshList());
        */
      };

      deleteItem = item => {
    
        alert("Deleting for ID: " + item.id);
        
        axios
          .delete(`http://127.0.0.1:8000/api/qaconfigs/${item.id}`)
          //.then(res => new MyTable().refreshList());
        
      };

}//class ends

export default withRouter(DataTable);