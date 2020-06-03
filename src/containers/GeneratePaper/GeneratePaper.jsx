import React, { Component } from "react";
import './GeneratePaper.css';
import PaperTypeNav from "./PaperTypeNav/PaperTypeNav.jsx";
import PaperStepper from "./PaperStepper/PaperStepper.jsx";


class GeneratePaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className="generate-paper">
                <div className="hero">
                    <h1>Generate Paper</h1>
                </div>
                <div className="filter-req">
                    <PaperStepper data={this.props.data} saveData={this.props.saveData} />
                </div>
            </div>
        );
    }
}

export default GeneratePaper;

