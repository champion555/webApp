import React, { Component } from 'react';
import { withRouter } from "react-router";
import Header from "../../Components/header/header"
import Button from "../../Components/button/button"
import ImageURL from "../../assets/ic_logo1.png"
// import IDCardURL from "../../assets/ic_idcard_purple.png"
// import PassportURL from "../../assets/ic_passport_purple.png"
// import ResidentURL from "../../assets/ic_residence_purple.png"
import { Checkbox } from '@progress/kendo-react-inputs';
import './home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageSrcs: ImageURL,
            sendHeaderText: 'Home',
            flag: false
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
                    <div className="logoView">
                        <img src = {this.state.ImageSrcs} className = "logoIcon"/>
                    </div>
                    <Button
                        label="start"
                        onClick={() => {
                            if(this.state.flag)
                                this.props.history.push('idmain');
                            else
                                alert('Please check this')
                        }}
                    />
                    <Button
                        label="Faceliveness"
                        onClick={() => {
                            this.props.history.push('facelivness');
                        }}
                    />
                    <Checkbox defaultChecked={this.state.flag} label={'Unchecked state'}
                        onChange={() => {
                            if(this.state.flag) {
                                this.setState({
                                    flag: false
                                })
                            } else {
                                this.setState({
                                    flag: true
                                })
                            }
                           
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(Home);
