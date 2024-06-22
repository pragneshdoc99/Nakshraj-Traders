/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */

import React from 'react';

import '../css/common.css';
import '../css/main.css';
import '../css/getaquotecommon.css';

class Thanks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }


    render() {

        return (

            <div>
                <div className="jumbotron text-center" style={{ top: 40 }}>
                    <hr />
                    <h1 className="display-3 brand--color">Welcome to Nakshraj!</h1>
                    <h2 className="display-3 brand--color">We appreciate you contacting us.</h2>
                    <p className="lead"> Our team will get back to you soon!</p>
                    <hr />
                    <p className="lead">
                        <a className="btn-mz btn--radius btn--brand-color btn--filled btn--shadow mr-t-3" href="/"
                            role="button">Go Back</a>
                    </p>
                </div>
            </div>

        );
    }
}



export default Thanks;