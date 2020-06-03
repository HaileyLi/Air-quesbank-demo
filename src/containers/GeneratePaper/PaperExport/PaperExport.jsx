
import React, { Component } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import "./PaperExport.css"

class PaperExport extends Component {
    pdfExportComponent;
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.data.generatePaper.content
        };
    }

    render() {
        return (
            <div>
                <h1>Step 3: Print your pdf</h1>
                <div className="example-config">
                    <button className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                        Export PDF
                    </button>
                </div>

                <PDFExport
                    forcePageBreak=".page-break"
                    ref={(component) => this.pdfExportComponent = component}
                >
                    {/* For details see:
                    http://www.telerik.com/kendo-react-ui/components/drawing/drawing-dom/#toc-dimensions-and-css-units */}
                    <div style={{ border: "1px solid #00000038", padding: "50px", overflow: "hidden", width: "500px",background:"beige" }}>
                        <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
                    </div>
                </PDFExport>
            </div>
        );
    }
}
export default PaperExport;
