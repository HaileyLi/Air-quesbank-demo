import React, { Component } from "react";
import '@progress/kendo-theme-material/dist/all.css';
import { Route } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Button } from '@progress/kendo-react-buttons';

class MainNav extends Component {
    render() {
        return (
            <Route render={({ location, history }) => (
                <React.Fragment>
                    <SideNav
                        onSelect={(selected) => {
                            const to = '/' + selected;
                            if (location.pathname !== to) {
                                history.push(to);
                            }
                        }}
                    >
                        <SideNav.Toggle />
                        <SideNav.Nav defaultSelected="home">

                            <NavItem eventKey="home">
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', lineHeight: "2" }} />
                                </NavIcon>
                                <NavText>
                                    Home Page
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="db-manage">
                                <NavIcon>
                                    <i className="fa fa-database" style={{ fontSize: '1.75em', lineHeight: "2" }}></i>
                                </NavIcon>
                                <NavText>
                                    Database Management
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="generate-paper">
                                <NavIcon>
                                    <i className="fas fa-print" style={{ fontSize: '1.75em', lineHeight: "2" }}></i>
                                </NavIcon>
                                <NavText>
                                    Generate Paper
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="management">
                                <NavIcon>
                                    <i className="fas fa-chart-pie" style={{ fontSize: '1.75em', lineHeight: "2" }}></i>
                                </NavIcon>
                                <NavText>
                                    Management
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="account" className="account">
                                <NavIcon>
                                    <i className="fas fa-chess-knight" style={{ fontSize: '1.75em', lineHeight: "2" }}></i>
                                </NavIcon>
                                <NavText>
                                    Teacher Account
                            </NavText>
                            </NavItem>
                            <Button onClick={this.props.action} primary={true} className="log-out">Log<br />out</Button>
                        </SideNav.Nav>
                    </SideNav>

                </React.Fragment>
            )}
            />

        );
    }
}

export default MainNav;

