import * as React from 'react';

export default class Loader extends React.Component<void,never>{
    render() {
        return (
            <div>
                <div className="loader">
                    <div className="wBall" id="wBall_1">
                        <div className="wInnerBall"></div>
                    </div>
                    <div className="wBall" id="wBall_2">
                        <div className="wInnerBall"></div>
                    </div>
                    <div className="wBall" id="wBall_3">
                        <div className="wInnerBall"></div>
                    </div>
                    <div className="wBall" id="wBall_4">
                        <div className="wInnerBall"></div>
                    </div>
                    <div className="wBall" id="wBall_5">
                        <div className="wInnerBall"></div>
                    </div>
                </div>
            </div>
        );
    }
}