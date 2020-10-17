import React, { Component } from 'react';
import { withRouter } from "react-router";
import ImageURL from "../../assets/ic_back.png"
import "./header.css"

class header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageSrcs: ImageURL,
        }
    }
    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <div  className="HeaderView">                 
                <img src={this.state.ImageSrcs} onClick={this.goBack} className="btnBack"/>
                <h2 className="txtTitle">{this.props.headerText}</h2>
                <div style={{width:'10px'}}></div>             
            </div>
        )
    }
}

export default withRouter(header);