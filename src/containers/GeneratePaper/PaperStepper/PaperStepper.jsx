import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PaperFilter from "../PaperFilter/PaperFilter.jsx";
import PaperEditor from "../PaperEditor/PaperEditor.jsx";
import PaperExport from "../PaperExport/PaperExport.jsx";
import { Editor, EditorTools, EditorUtils } from '@progress/kendo-react-editor';

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

function getSteps() {
    return ['Select Filter', 'Edit Paper', 'Export PDF'];
}


class PaperStepper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            completed: new Set(),
            skipped: new Set(),
            testType: "",
            mode: "",
            textbook: "",
            content: ""
        };
    }

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return <PaperFilter data={this.props.data} handleChange={this.handleChange} />;
            case 1:
                return <PaperEditor data={this.props.data} handleExecute={this.handleExecute} />;
            case 2:
                return <PaperExport data={this.props.data} value="test" />;
            default:
                return 'Unknown step';
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleExecute = (content) => {
        console.log(content)
        this.setState({
            content: content
        })

    }
    totalSteps = () => getSteps().length;

    isStepOptional = step => step === null;

    handleSkip = () => {
        const { activeStep } = this.state;
        if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        this.setState(state => {
            const skipped = new Set(state.skipped.values());
            skipped.add(activeStep);
            return {
                activeStep: state.activeStep + 1,
                skipped,
            };
        });
    };

    handleNext = () => {
        let activeStep;

        if (this.isLastStep() && !this.allStepsCompleted()) {
            // It's the last step, but not all steps have been completed
            // find the first step that has been completed
            const steps = getSteps();
            activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
        } else {
            activeStep = this.state.activeStep + 1;
        }
        this.setState({
            activeStep,
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleStep = step => () => {
        this.setState({
            activeStep: step,
        });
    };

    handleComplete = () => {
        // eslint-disable-next-line react/no-access-state-in-setstate
        const completed = new Set(this.state.completed);
        completed.add(this.state.activeStep);
        this.setState({
            completed,
        });

        /**
         * Sigh... it would be much nicer to replace the following if conditional with
         * `if (!this.allStepsComplete())` however state is not set when we do this,
         * thus we have to resort to not being very DRY.
         */
        if (completed.size !== this.totalSteps() - this.skippedSteps()) {
            this.handleNext();
        }

        const data = this.props.data;
        const paper = {
            testType: this.state.testType,
            textbook: this.state.textbook,
            mode: this.state.mode,
            content: this.state.content
        }


        data.generatePaper = paper;

        this.props.saveData(data)
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
            completed: new Set(),
            skipped: new Set(),
        });
    };

    skippedSteps() {
        return this.state.skipped.size;
    }

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    isStepComplete(step) {
        return this.state.completed.has(step);
    }

    completedSteps() {
        return this.state.completed.size;
    }

    allStepsCompleted() {
        return this.completedSteps() === this.totalSteps() - this.skippedSteps();
    }

    isLastStep() {
        return this.state.activeStep === this.totalSteps() - 1;
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>
                <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const props = {};
                        const buttonProps = {};
                        if (this.isStepOptional(index)) {
                            buttonProps.optional = <Typography variant="caption">Optional</Typography>;
                        }
                        if (this.isStepSkipped(index)) {
                            props.completed = false;
                        }
                        return (
                            <Step key={label} {...props}>
                                <StepButton
                                    // onClick={this.handleStep(index)}
                                    completed={this.isStepComplete(index)}
                                    {...buttonProps}
                                >
                                    {label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>
                <div >
                    {this.allStepsCompleted() ? (
                        <div>
                            <Typography className={classes.instructions}>
                                Click here to reset -
              </Typography>
                            <Button onClick={this.handleReset}>Reset</Button>
                        </div>
                    ) : (
                            <div>
                                <Typography component={'div'} className={classes.instructions}>{this.getStepContent(activeStep)}</Typography>
                                <div style={{ bottom: "33px" }}>
                                    {/* <Button
                                        disabled={activeStep === 0}
                                        onClick={this.handleBack}
                                        className={classes.button}
                                    >
                                        Back
                </Button> */}
                                    {this.isStepOptional(activeStep) &&
                                        !this.state.completed.has(this.state.activeStep) && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleSkip}
                                                className={classes.button}
                                            >
                                                Skip
                    </Button>
                                        )}
                                    {activeStep !== steps.length &&
                                        (this.state.completed.has(this.state.activeStep) ? (
                                            <Typography variant="caption" className={classes.completed}>
                                                Step {activeStep + 1} already completed
                    </Typography>
                                        ) : (
                                                <Button variant="contained" color="primary" onClick={this.handleComplete}>
                                                    {this.completedSteps() === this.totalSteps() - 1 ? 'RESET' : 'Complete Step'}
                                                </Button>
                                            ))}
                                </div>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

PaperStepper.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(PaperStepper);
