import React, { Component } from "react";

import { ComboBox, DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';
import grid from "../../../Data/grid.json";

class PaperFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textbook: props.data.textbook.map(item => item.textbookName),
            mode: props.data.mode.map(item => item.modeName),
            testType: props.data.testType.map(item => item.testTypeName),
            questionType: props.data.questionType.map(item => item.questionTypeName),
            test: undefined
        };
    }
    selectType = (e) => {
        var target = e.target;
        var value = target.value;
        this.setState({ test: value })
    }
    showObject = (obj) => {
        var result = "";
        for (var p in obj) {
            if (obj.hasOwnProperty(p) && p !== "testType") {
                result += p + ":" + obj[p] + ",";
            }
        }
        return result;
    }
    render() {
        var obj = grid;
        if (this.state.test !== undefined) {
            obj = obj.filter(item => item.testType === this.state.test);
        }
        return (
            <div>
                <h1>Step 1: Select filters that you want to apply to the exam paper</h1>
                <div className="row">
                    <div className="m-3">
                        <DropDownList
                            label="Test Type"
                            name="testType"
                            data={this.state.testType}
                            onChange={(event) => { this.props.handleChange(event); this.selectType(event); }}
                            onBlur={(event) => { this.props.handleChange(event); this.selectType(event); }} />
                        {this.state.test === undefined ? null :
                            <div>
                                <a>{this.state.test} will contain - &nbsp;</a>
                                {this.showObject(obj[0])}
                            </div>
                        }

                    </div>

                    <div className="m-3">
                        <DropDownList
                            label="Mode"
                            name="mode"
                            data={this.state.mode}
                            onChange={this.props.handleChange}
                            onBlur={this.props.handleChange} />
                    </div>
                    <div className="m-3">
                        <MultiSelect label="TextBook" data={this.state.textbook} style={{ width: '50%' }} />
                        {/* <DropDownList
                            label="Text Book"
                            name="textbook"
                            data={this.state.textbook}
                            onChange={this.props.handleChange}
                            onBlur={this.props.handleChange} /> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default PaperFilter;
