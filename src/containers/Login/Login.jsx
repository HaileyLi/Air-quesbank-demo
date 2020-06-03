
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Input } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Button } from '@progress/kendo-react-buttons';
import "./Login.css";


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: false
        };
    }
    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     this.props.action;
    //     setTimeout(() => {
    //         this.setState({ success: false });
    //     }, 3000);
    // }
    render() {
        return (
            <div className="row example-wrapper">
                <div className="col-xs-12 col-sm-6 offset-sm-3 example-col">
                    <div className="card">
                        <div className="card-block">
                            <form className="k-form" onSubmit={this.props.action}>
                                <fieldset>
                                    <legend>Please Login</legend>
                                    <label className="k-form-field">
                                        <span>User Name</span>
                                        <Input
                                            name="username"
                                            required={true}
                                        />
                                    </label>
                                    <label className="k-form-field">
                                        <span>Password</span>
                                        <Input
                                            name="password"
                                            type="password"
                                            required={true}
                                        />
                                    </label>
                                </fieldset>
                                <Button className="mt-3" type="submit" primary={true}>Login</Button>
                            </form>
                        </div>
                    </div>
                </div>
                {!this.state.success ? null :
                    <div
                        className="alert alert-success"
                        style={{ position: 'absolute' }}
                    >
                        Wrong matching of password and username.
                    </div>}
            </div>
        );
    }


}

export default Login;
