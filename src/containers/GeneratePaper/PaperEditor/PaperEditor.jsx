
import React, { Component } from 'react';
import { Editor, EditorTools, EditorUtils } from '@progress/kendo-react-editor';
import { log } from 'util';
import grid from "../../../Data/grid.json";
import "./PaperEditor.css";

const {
    Bold, Italic, Underline, Strikethrough, Subscript, Superscript,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Indent, Outdent, OrderedList, UnorderedList,
    Undo, Redo, FontSize, FontName, FormatBlock,
    Link, Unlink, InsertImage, ViewHtml,
    InsertTable,
    AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter,
    DeleteRow, DeleteColumn, DeleteTable,
    MergeCells, SplitCell
} = EditorTools;
class PaperEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testType: this.props.data.generatePaper.testType,
            mode: this.props.data.generatePaper.mode,
            textbook: this.props.data.generatePaper.textbook
        };
    }

    handleExecute = () => {
        const view = this.editor.view;
        const content = "<div>" + EditorUtils.getHtml(view.state) + "<div>";
        this.setState({
            content: content
        })

        this.props.handleExecute(this.state.content);
    }
    showObject = (obj) => {
        var result = "";
        for (var p in obj) {
            if (obj.hasOwnProperty(p) && p !== "testType") {
                result += p + ": " + obj[p] + ", ";
            }
        }
        return result;
    }

    render() {
        //filtered question list
        const filteredquestion = this.props.data.quesbank.filter(item =>
            item.mode == this.state.mode &&
            item.textbook === this.state.textbook)
        var question = "";
        if (filteredquestion.length >= 1) {
            //selected test type question numbers
            const testTypeDetail = grid.filter(item => item.testType === this.state.testType)[0];
            //questions by type
            const fill = filteredquestion.filter(item => item.questionType === "fill in blank");
            const multi = filteredquestion.filter(item => item.questionType === "multiple choice");
            const sentence = filteredquestion.filter(item => item.questionType === "sentence");
            const translate = filteredquestion.filter(item => item.questionType === "translate");
            const qa = filteredquestion.filter(item => item.questionType === "qa");
            const reading = filteredquestion.filter(item => item.questionType === "reading");
            //shuffled questions by type
            const shuffledFill = fill.sort(() => 0.5 - Math.random()).slice(0, testTypeDetail.fillBlank)
            const shuffledMulti = multi.sort(() => 0.5 - Math.random()).slice(0, testTypeDetail.multipleChoice)
            const shuffledSentence = sentence.sort(() => 0.5 - Math.random()).slice(0, testTypeDetail.sentence)
            const shuffledTranslate = translate.sort(() => 0.5 - Math.random()).slice(0, testTypeDetail.translate)
            const shuffledQa = qa.sort(() => 0.5 - Math.random()).slice(0, testTypeDetail.qa)
            const shuffledReading = reading.sort(() => 0.5 - Math.random()).slice(0, testTypeDetail.reading)

            console.log(shuffledTranslate)

            const shuffled = [...shuffledMulti, ...shuffledFill, ...shuffledSentence, ...shuffledTranslate, ...shuffledQa, ...shuffledReading]

            const typeCount = [shuffledMulti.length, shuffledFill.length, shuffledSentence.length, shuffledTranslate.length, shuffledQa.length, shuffledReading.length]


            var arr = shuffled.map(item =>
                item.question)
            var str = ""
            for (var i = 0; i < arr.length; i++) {
                var index = (i + 1).toString();
                var block = arr[i];
                var substr = "( )"
                var substr2 = "A."
                var insert = "<br>"

                str += "<p>"
                str += index;
                str += ". ";
                block = block.replace("A.", "<br>A.");
                block = block.replace(/\(  \)/g, "<br>()");
                str += block;
                str += "</p>"
            }
            question = str;


        }

        var obj = grid;
        if (this.state.testType !== undefined) {
            obj = obj.filter(item => item.testType === this.state.testType);
        }
        return (
            <div>

                <h1>Step 2: Edit your paper</h1>
                <div className="display-filter">
                    <h2>You Selected:</h2>
                    <p>Test Type : {this.state.testType}</p>
                    <p>Mode : {this.state.mode}</p>
                    <p>Textbook : {this.state.textbook}</p>
                    {this.state.testType === undefined ? null :
                        <div>
                            <a>{this.state.testType} will contain - &nbsp;</a>
                            {this.showObject(obj[0])}
                        </div>
                    }
                </div>
                <h2>This is the paper we generated. You can edit it until you are ready to print it out. See right for preview</h2>
                <div className="edit-preview">
                    <Editor
                        tools={[
                            [Bold, Italic, Underline, Strikethrough],
                            [Subscript, Superscript],
                            [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                            [Indent, Outdent],
                            [OrderedList, UnorderedList],
                            FontSize, FontName, FormatBlock,
                            [Undo, Redo],
                            [Link, Unlink, InsertImage, ViewHtml],
                            [InsertTable],
                            [AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter],
                            [DeleteRow, DeleteColumn, DeleteTable],
                            [MergeCells, SplitCell]
                        ]}
                        ref={editor => this.editor = editor}
                        defaultContent={question}
                        onExecute={this.handleExecute}
                    />

                    <div style={{ border: "1px solid #00000038", padding: "50px", overflow: "hidden", width: "50%", height: "100%" }}>
                        <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
                    </div>

                </div>

            </div>

        );
    }
}

export default PaperEditor;
