import React, { Component } from "react";
import './Management.css';
import {
    Chart,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem
} from '@progress/kendo-react-charts';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import randomColor from "randomcolor";
import TestTypeGrid from "./TestTypeGrid";
import { AssertionError } from "assert";


class Management extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quesbank: props.data.quesbank,
            textbook: props.data.textbook,
            mode: props.data.mode,
            questionType: props.data.questionType,
            textbookEditID: null,
            modeEditID: null,
            questionTypeEditID: null,
            generatePaper: props.data.generatePaper,
            testType: props.data.testType
        };
    }

    saveEdit = (e) => {
        if (e.target === e.currentTarget) {
            this.setState({ textbookEditID: null });
        }

        console.log(this.state)
        const data = this.state;
        delete data["textbookEditID"];
        delete data["modeEditID"];
        delete data["questionTypeEditID"];


        if (this.checkListsValid()) this.props.saveData(data);
        else alert("has duplicates or empty string")


    };

    checkListsValid = () => {
        var questionTypeNameArr = this.state.questionType.map(item => item.questionTypeName);
        var questionTypeNameDuplicates = ((new Set(questionTypeNameArr)).size !== questionTypeNameArr.length);
        if (!questionTypeNameDuplicates) return false
        for (var i = 0; i < questionTypeNameArr.length; i++) {
            if (questionTypeNameArr[i] == "") return false
        }

        var textbookNameArr = this.state.textbook.map(item => item.textbookName);
        var textbookNameDuplicates = ((new Set(textbookNameArr)).size !== textbookNameArr.length);
        if (!textbookNameDuplicates) return false
        for (var i = 0; i < textbookNameArr.length; i++) {
            if (textbookNameArr[i] == "") return false
        }

        var modeNameArr = this.state.mode.map(item => item.modeName);
        var modeNameDuplicates = ((new Set(modeNameArr)).size !== modeNameArr.length);
        if (!modeNameDuplicates) return false
        for (var i = 0; i < modeNameArr.length; i++) {
            if (modeNameArr[i] == "") return false
        }

        return true
    }

    textbookrowClick = (e) => {
        this.setState({
            textbookEditID: e.dataItem.textbookID
        });
    };
    moderowClick = (e) => {
        this.setState({
            modeEditID: e.dataItem.modeID
        });
    };
    questionTyperowClick = (e) => {
        this.setState({
            questionTypeEditID: e.dataItem.questionTypeID
        });
    };

    closeEdit = (e) => {
        if (e.target === e.currentTarget) {
            this.setState({
                textbookEditID: null,
                modeEditID: null,
                questionTypeEditID: null
            });
        }
    };

    textbookitemChange = (e) => {
        const data = this.state.textbook;
        const index = data.findIndex(d => d.textbookID === e.dataItem.textbookID);
        data[index] = { ...data[index], [e.field]: e.value };
        this.setState({
            textbook: data
        });
    };
    modeitemChange = (e) => {
        const data = this.state.mode;
        const index = data.findIndex(d => d.modeID === e.dataItem.modeID);
        data[index] = { ...data[index], [e.field]: e.value };
        this.setState({
            mode: data
        });
    };
    questionTypeitemChange = (e) => {
        const data = this.state.questionType;
        const index = data.findIndex(d => d.questionTypeID === e.dataItem.questionTypeID);
        data[index] = { ...data[index], [e.field]: e.value };
        this.setState({
            questionType: data
        });
    };

    textbookaddRecord = () => {
        const newRecord = { textbookID: this.state.textbook.length + 1, textbookName: "edit textbook" };
        const data = this.state.textbook;
        data.unshift(newRecord);
        this.setState({
            textbook: data,
            textbookEditID: newRecord.textbookID
        });
    };
    modeaddRecord = () => {
        const newRecord = { modeID: this.state.mode.length + 1, modeName: "edit mode" };
        const data = this.state.mode;
        data.unshift(newRecord);
        this.setState({
            mode: data,
            modeEditID: newRecord.modeID
        });
    };
    questionTypeaddRecord = () => {
        const newRecord = { questionTypeID: this.state.questionType.length + 1, questionTypeName: "edit type" };
        const data = this.state.questionType;
        data.unshift(newRecord);
        this.setState({
            questionType: data,
            questionTypeEditID: newRecord.questionTypeID
        });
    };

    render() {
        const questionNum = this.props.data.quesbank.length;
        const questionTypes = this.props.data.questionType.map(item => {
            var list = this.props.data.quesbank.filter(q => q.questionType === item.questionTypeName);
            var len = list.length;
            var value = len / questionNum;
            var type = item.questionTypeName;
            return (
                {
                    category: type,
                    value: value
                }
            )
        })
        const modes = this.props.data.mode.map(item => {
            var list = this.props.data.quesbank.filter(q => q.mode === item.modeName);
            var len = list.length;
            var value = len / questionNum;
            var type = item.modeName;
            return (
                {
                    category: type,
                    value: value
                }
            )
        })

        const textbooks = this.props.data.textbook.map(item => {
            var list = this.props.data.quesbank.filter(q => q.textbook === item.textbookName);
            var len = list.length;
            var value = len / questionNum;
            var type = item.textbookName;
            return (
                {
                    category: type,
                    value: value
                }
            )
        })

        return (
            <div className="management-container" onClick={this.closeEdit}>
                <div className="hero">
                    <h1>Management</h1>
                </div>
                <div className="ops">
                    <button title="Save" className="k-button" onClick={this.saveEdit} >Save Tags</button>
                </div>
                <div>
                    <div className="tag-management">

                        <Grid
                            data={this.state.textbook.map((item) =>
                                Object.assign({
                                    inEdit: item.textbookID === this.state.textbookEditID
                                }, item)
                            )}
                            editField="inEdit"

                            onRowClick={this.textbookrowClick}
                            onItemChange={this.textbookitemChange}
                            className="textbook-tag"
                            scrollable="none"
                        >
                            <GridToolbar>
                                <div onClick={this.closeEdit}>
                                    <button title="Add new" className="k-button k-primary" onClick={this.textbookaddRecord} >
                                        Add new</button>
                                </div>
                            </GridToolbar >
                            <Column field="textbookName" title="Manage Textbook Tag" />
                        </Grid >
                    </div>

                    <div className="tag-management">
                        <Grid
                            data={this.state.mode.map((item) =>
                                Object.assign({
                                    inEdit: item.modeID === this.state.modeEditID
                                }, item)
                            )}
                            editField="inEdit"

                            onRowClick={this.moderowClick}
                            onItemChange={this.modeitemChange}
                            className="textbook-tag"
                            scrollable="none"
                        >
                            <GridToolbar>
                                <div onClick={this.closeEdit}>
                                    <button title="Add new" className="k-button k-primary" onClick={this.modeaddRecord} >
                                        Add new</button>
                                </div>
                            </GridToolbar >
                            <Column field="modeName" title="Manage Mode Tag" />
                        </Grid >
                    </div>

                    <div className="tag-management">
                        <Grid
                            data={this.state.questionType.map((item) =>
                                Object.assign({
                                    inEdit: item.questionTypeID === this.state.questionTypeEditID
                                }, item)
                            )}
                            editField="inEdit"

                            onRowClick={this.questionTyperowClick}
                            onItemChange={this.questionTypeitemChange}
                            className="textbook-tag"
                            scrollable="none"
                        >
                            <GridToolbar>
                                <div onClick={this.closeEdit}>
                                    <button title="Add new" className="k-button k-primary" onClick={this.questionTypeaddRecord} >
                                        Add new</button>
                                </div>
                            </GridToolbar >
                            <Column field="questionTypeName" title="Manage questionType Tag" />
                        </Grid >
                    </div>
                </div>
                <div>
                    <div className="stats">
                        <h2>Textbook Statistics</h2>
                        <Chart seriesColors={this.props.data.textbook.map(item => randomColor())}>
                            <ChartLegend position="top" />
                            <ChartSeries>
                                <ChartSeriesItem type="pie" data={textbooks} field="value" categoryField="category" />
                            </ChartSeries>
                        </Chart>
                    </div>

                    <div className="stats">
                        <h2>Mode Statistics</h2>
                        <Chart seriesColors={this.props.data.mode.map(item => randomColor())}>
                            <ChartLegend position="top" />
                            <ChartSeries>
                                <ChartSeriesItem type="pie" data={modes} field="value" categoryField="category" />
                            </ChartSeries>
                        </Chart>
                    </div>
                    <div className="stats">
                        <h2>Question Type Statistics</h2>
                        <Chart seriesColors={this.props.data.questionType.map(item => randomColor())}>
                            <ChartLegend position="top" />
                            <ChartSeries>
                                <ChartSeriesItem type="pie" data={questionTypes} field="value" categoryField="category" />
                            </ChartSeries>
                        </Chart>
                    </div>
                </div>
                <TestTypeGrid></TestTypeGrid>

            </div>
        );
    }
}

export default Management;

