
import React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { ComboBox, DropDownList } from '@progress/kendo-react-dropdowns';


export default class DialogContaincer extends React.Component {
    editor = null;
    textarea = null;

    constructor(props) {
        super(props);
        this.state = {
            questionID: this.props.dataItem.questionID,
            questionType: this.props.dataItem.questionType || "",
            textbook: this.props.dataItem.textbook || "",
            lesson: this.props.dataItem.lesson || 0,
            mode: this.props.dataItem.mode || "",
            labels: this.props.dataItem.labels || [],
            question: this.props.dataItem.question || "",
            answer: this.props.dataItem.answer || "",
            data: this.props.data
        };
    }
    handleSubmit(event) {
        event.preventDefault();
    }

    handleChange = (event) => {
        const target = event.target;
        var value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        if (name === "labels") {
            value = value.split(',')
            console.log(value)
            this.setState({
                [name]: value
            });
        }
    }

    save = () => {
        const data = this.state.data;
        const question = this.state;
        delete question["data"];
        const questionIDlist = data.quesbank.map(item => item.questionID);

        data.quesbank = this.props.data.quesbank.map((item) => {
            if (item.questionID === question.questionID) {
                return question
            }
            return item
        })

        if (!questionIDlist.includes(question.questionID)) {
            data.quesbank.push(question)
        }

        this.props.saveData(data)
        this.props.close();

    }
    delete = (dataItem) => {
        const data = this.state.data;
        const question = this.state;

        data.quesbank = this.props.data.quesbank.filter(item => item.questionID !== question.questionID);
        if (window.confirm("I confirmed that I want to delete this question.")) {
            this.props.saveData(data)
            this.props.close();
        }
    }

    render() {
        return (
            <Dialog
                onClose={this.props.cancel}
            >
                <form >
                    <div style={{ marginBottom: '1rem' }}>
                        <label>
                            QuestionType<br />
                            <ComboBox
                                name="questionType"
                                data={this.props.questionType.map(item => item.questionTypeName)}
                                value={this.state.questionType}
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                onBlur={(e) => {
                                    this.handleChange(e);
                                }} />
                        </label>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>
                            Textbook<br />
                            <ComboBox
                                name="textbook"
                                data={this.props.textbook.map(item => item.textbookName)}
                                value={this.state.textbook}
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                onBlur={(e) => {
                                    this.handleChange(e);
                                }} />
                        </label>
                    </div><br />
                    <div style={{ marginBottom: '1rem' }}>
                        <label>
                            Lesson<br />
                            <NumericTextBox
                                name="lesson"
                                value={this.state.lesson}
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                onBlur={(e) => {
                                    this.handleChange(e);
                                }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>
                            Mode<br />
                            <DropDownList
                                name="mode"
                                data={this.props.mode.map(item => item.modeName)}
                                value={this.state.mode}
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                onBlur={(e) => {
                                    this.handleChange(e);
                                }} />
                        </label>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>
                            Labels<br />
                            <Input
                                type="text"
                                name="labels"
                                value={this.state.labels}
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                onBlur={(e) => {
                                    this.handleChange(e);
                                }}
                            />
                        </label>
                    </div>
                    <hr />
                    <div style={{ marginBottom: '1rem' }} className="question-input">
                        <label>
                            Question<br />
                            <textarea
                                name="question"
                                value={this.state.question}
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                onBlur={(e) => {
                                    this.handleChange(e);
                                }}
                            />


                        </label>
                    </div>
                    <div style={{ marginBottom: '1rem' }} className="answer-input">
                        <label>
                            Answer<br />
                            <Input
                                type="text"
                                name="answer"
                                value={this.state.answer}
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                onBlur={(e) => {
                                    this.handleChange(e);
                                }}
                            />
                        </label>
                    </div>

                </form>
                <DialogActionsBar>
                    <button
                        className="k-button"
                        onClick={this.props.close}
                    >
                        Cancel
                            </button>
                    <button
                        className="k-button"
                        onClick={this.delete}
                    >
                        Delete
                            </button>
                    <button
                        className="k-button k-primary"
                        onClick={this.save}
                    >
                        Save
                            </button>
                </DialogActionsBar>
            </Dialog>
        );
    }
}
