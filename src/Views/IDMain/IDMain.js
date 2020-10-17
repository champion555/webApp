import React, { Component } from 'react';
import { withRouter } from "react-router";
import Header from "../../Components/header/header"
import IDDocButton from "../../Components/idDocButton/idDocButton"
import IDCardURL from "../../assets/ic_idcard_purple.png"
import PassportURL from "../../assets/ic_passport_purple.png"
import ResidentURL from "../../assets/ic_residence_purple.png"
import IdentityURL from "../../assets/ic_identity_purple.png"
import './IDMain.css';

class IDMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImgSrc: IdentityURL,
            IDCardSrc: IDCardURL,
            PassportSrc: PassportURL,
            ResidentSrc: ResidentURL,
            sendHeaderText: 'Identity Document',
        }
    }

    componentDidMount = () => {
    }

    // goSrc = () => {
    //     this.props.history.push(`/idcard`)
    // }


    render() {
        return (
            <div style={{ background: 'black' }}>
                <Header headerText={this.state.sendHeaderText} />

                <div className="body-container">
                    <div className = "mark-container">
                        <div className="markView">
                        <img src={this.state.ImgSrc} className="identityIcon"/>
                        </div>

                    </div>
                    <IDDocButton
                        label="National ID Card"
                        imgURL={this.state.IDCardSrc}
                    />
                    <IDDocButton
                        label="Passport"
                        imgURL={this.state.PassportSrc}
                    />
                    <IDDocButton
                        label="Resident Permit"
                        imgURL={this.state.ResidentSrc}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(IDMain);
