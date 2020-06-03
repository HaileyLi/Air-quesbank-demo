import React, { Component } from "react";
import './PaperTypeNav.css';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
//import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    primary: {},
    icon: {},
});

class PaperTypeNav extends Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className="sub-nav">
                <Paper>
                    <MenuList>
                        <MenuItem className={classes.menuItem}>
                            <ListItemText classes={{ primary: classes.primary }} inset primary="Midterm Exam" />
                        </MenuItem>
                    </MenuList>
                </Paper>
            </div>

        );
    }
}


PaperTypeNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperTypeNav);

