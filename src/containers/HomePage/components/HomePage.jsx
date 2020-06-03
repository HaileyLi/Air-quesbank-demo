import React, { Component } from "react";
import './HomePage.css';
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import Clock from 'react-live-clock';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curTime: new Date().toLocaleString()
        }
    }

    render() {
        return (
            <div className="home-page">
                <div className="home-page-bg"></div>
                <div className="todo">
                    <h1 className="cur-time"><Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Hong_Kong'} /></h1>
                    {/* https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */}
                    <h1 className="morning">Good Morning,teacher</h1>
                    <h2>What is your main focus for today?</h2>
                    <AddTodo />
                    <VisibleTodoList />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default HomePage;

