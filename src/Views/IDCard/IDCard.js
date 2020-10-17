import React, { Component } from 'react';
import Header from "../../Components/header/header"


class IDCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendHeaderText:'IDCard',
        }
    }

    // ComponentDidamount = () => {
    //     console.log("home")
    // }


    render() {
        return (
            <div>
                 <Header foo={this.state.sendHeaderText}/>
                <h2>idcard </h2>
            </div>
        )
    }
}

export default IDCard;
