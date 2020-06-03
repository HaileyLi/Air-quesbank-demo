import React, { Component } from "react";
import './Database.css';
import ManageTable from "./ManageTable/ManageTable.jsx";


class Database extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className="database">
                <div className="hero">
                    <h1>Quesbank</h1>
                </div>
                <div className="manage-table">
                    <ManageTable data={this.props.data} saveData={this.props.saveData} />
                </div>

            </div>

        );
    }
}

export default Database;

