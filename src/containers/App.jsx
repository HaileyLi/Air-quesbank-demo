import React, { Component } from "react";
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import HomePage from "./HomePage/components/HomePage.jsx";
import '@progress/kendo-theme-material/dist/all.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import MainNav from "../components/MainNav/MainNav.jsx";
import Account from "./Account/Account.jsx";
import Database from "./Database/Database.jsx";
import GeneratePaper from "./GeneratePaper/GeneratePaper";
import Management from "./Management/Management.jsx"
import { connect } from 'react-redux';
import { doFetchData, doSaveData } from "./Management/actions";
import Login from "./Login/Login.jsx";
import Bot from "./Bot/Bot.jsx"


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            bot: false
        };
    }

    componentDidMount() {
        this.props.fetchData();
    }

    isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    login = () => {
        this.setState({ login: true })
    }
    logout = () => {
        this.setState({ login: false })
    }
    botopen = () => {
        this.setState({ bot: true })
    }
    botclose = () => {
        this.setState({ bot: false })
    }

    render() {
        return (
            <div>
                {/* {!this.state.login ? <Login action={this.login} /> : */}
                <BrowserRouter>
                    <MainNav action={this.logout} />
                    {this.isEmpty(this.props.data) ? null :
                        <div className="content">
                            <Switch>
                                <Route path='/home' component={HomePage} />
                                <Route path='/db-manage' render={() => <Database data={this.props.data} saveData={this.props.saveData} />} />
                                <Route path='/generate-paper' render={() => <GeneratePaper data={this.props.data} saveData={this.props.saveData} />} />
                                <Route path='/account' component={Account} />
                                <Route path='/management' render={() => <Management data={this.props.data} saveData={this.props.saveData} />} />
                            </Switch>
                        </div>}
                    {!this.state.bot ?
                        <a className="bot-btn" onClick={this.botopen}><i className="fas fa-robot"></i></a>
                        :
                        <div>
                            <Bot />
                            <a className="bot-btn" onClick={this.botclose}><i className="fas fa-times"></i></a>
                        </div>
                    }
                </BrowserRouter>
                {/* } */}
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    data: state.data
});

const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch(doFetchData()),
    saveData: data => dispatch(doSaveData(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

