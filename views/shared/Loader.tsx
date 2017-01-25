import * as React from 'react';

export default class Loader extends React.Component<void,never>{
    render() {
        return (
            <div className="loader-container">
                <div id="loader">
                    <div id="loader_1" className="loader"></div>
                    <div id="loader_2" className="loader"></div>
                    <div id="loader_3" className="loader"></div>
                    <div id="loader_4" className="loader"></div>
                    <div id="loader_5" className="loader"></div>
                    <div id="loader_6" className="loader"></div>
                    <div id="loader_7" className="loader"></div>
                    <div id="loader_8" className="loader"></div>
                </div>
            </div>
        );
    }
}