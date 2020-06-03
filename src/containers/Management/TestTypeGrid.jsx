
import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

import grid from '../../Data/grid.json';

class TestTypeGrid extends React.Component {
    state = {
        gridData: grid
    }

    render() {
        return (
            <div className="test-type-grid">
                <h2>Test Types</h2>
                <Grid
                    style={{ height: '400px' }}
                    data={this.state.gridData}
                    scrollable="none"
                >
                    <Column field="testType" title="Test Type" />
                    <Column field="multipleChoice" title="Multiple Choice" />
                    <Column field="fillBlank" title="Fill in Blank" />
                    <Column field="sentence" title="Sentence" />
                    <Column field="translate" title="Translate" />
                    <Column field="qa" title="QA" />
                    <Column field="reading" title="Reading" />

                </Grid>
            </div>
        );
    }
}

export default TestTypeGrid;