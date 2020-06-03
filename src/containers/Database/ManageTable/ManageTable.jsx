
import React, { Component } from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import DialogContainer from './DialogContainer.jsx';
import cellWithEditing from './cellWithEditing.jsx';
import "./ManageTable.css";
import uuidv1 from 'uuid';

import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';

import { Button } from '@progress/kendo-react-buttons';

class ManageTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quesbank: props.data.quesbank,
            textbook: props.data.textbook,
            mode: props.data.mode,
            questionType: props.data.questionType,
            questionInEdit: undefined,
            questionTypeList: this.props.data.questionType.map(item => item.questionTypeName),
            primary: this.props.data.questionType.map(item => false),
            showAll: true,
            selectedType: ""
        };
    }
    edit = (dataItem) => {
        this.setState({ questionInEdit: dataItem });
    }



    close = () => {
        this.setState({ questionInEdit: undefined });
    }

    insert = () => {
        this.setState({
            questionInEdit: {
                questionID: uuidv1()
            }
        });
    }

    dialogTitle() {
        return `${this.state.questionInEdit.questionID === undefined ? 'Add' : 'Edit'} question`;
    }

    handleClick = (i) => {
        if (i === -1) {
            var primary = this.state.primary.map(item => false);
            this.setState({
                showAll: true,
                primary: primary
            })
        }
        else {
            var primary = this.state.primary.map((item, index) => {
                if (index === i) {
                    return true;
                }
                return false;
            })
            this.setState({
                primary: primary,
                showAll: false,
                selectedType: this.state.questionTypeList[i]
            })
        }
    }
    render() {

        if (this.state.showAll == true) {
            var quesbank = this.props.data.quesbank;
        } else {
            const choosedType = this.state.selectedType;
            var quesbank = this.props.data.quesbank.filter(item => item.questionType === choosedType);
        }
        return (
            <div >

                <div className="sub-nav">
                    <Paper>
                        <MenuList>
                            <Button onClick={() => { this.handleClick(-1) }} primary={this.state.showAll}>ALL QUESTIONS</Button>
                            {this.state.questionTypeList.map((item, i) => {
                                return (
                                    <Button onClick={() => { this.handleClick(i) }} key={i} primary={this.state.primary[i]}>{item}</Button>
                                )
                            })}
                        </MenuList>
                    </Paper>
                </div>
                <Grid
                    data={quesbank}
                    scrollable="none"
                >
                    <GridToolbar>
                        <button
                            onClick={this.insert}
                            className="k-button"
                        >
                            Add New
                        </button>
                    </GridToolbar>
                    <Column field="question" title="Question" width="600px" />
                    <Column field="answer" title="Answer" />
                    <Column field="textbook" title="TextBook" />
                    <Column field="lesson" title="Lesson" />
                    <Column field="mode" title="Mode" />
                    <Column field="labels" title="Labels" />
                    <Column
                        title="Edit"
                        cell={cellWithEditing(this.edit, this.remove)}
                    />
                </Grid>
                {this.state.questionInEdit &&
                    <DialogContainer
                        dataItem={this.state.questionInEdit}
                        close={this.close}
                        saveData={this.props.saveData}
                        textbook={this.state.textbook}
                        mode={this.state.mode}
                        questionType={this.state.questionType}
                        data={this.props.data} />}
            </div>
        );
    }


}


export default ManageTable