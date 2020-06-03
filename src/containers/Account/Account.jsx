import React, { Component } from "react";
import './Account.css';

class Account extends Component {
    render() {
        return (
            <div className="account-container">
                <div className="bg"></div>
                <div className="aireng"></div>
                <h1>This application is for teachers only.</h1>
                <h2>I assume you can view this page because you work in Air English Institution.</h2>
                <p>Sponsor: <a href="http://airenglish.cn" target="_blank" rel="noopener noreferrer">Air English</a></p>
            </div>
        );
    }
}

export default Account;

