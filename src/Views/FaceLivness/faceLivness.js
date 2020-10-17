import React, { Component } from 'react';
import Header from "../../Components/header/header"
import FaceDetector from "../../lib/FaceDetector"
import UndetectImgURL from "../../assets/ic_undetected.png"
import DetectImgURL from "../../assets/ic_detected.png"
import { ToastsContainer, ToastsStore } from 'react-toasts';
import "./faceLivness.css"

var face_x = null;
var face_y = null;

class FaceLivness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendHeaderText: 'FaceLiveness',
            ImgSrc: UndetectImgURL,
            frameHeight: window.innerHeight - 50,
            ComeImage: null,
            window_center_x: window.innerWidth / 2,
            window_center_y: window.innerHeight / 2,
            detectorActive: true,
            faceDetectStatus: ""
        }
    }
    handleImage = (GetImage) => {
        console.log("img url_parent : ", GetImage)
        this.setState({ ComeImage: GetImage });
    }
    toggleDetection = () => {
        this.setState({
            detectorActive: !this.state.detectorActive
        })
    }

    // componentDidMount=()=>{
    //     let CanvasCustom = document.getElementById("myCanvas");
    //     let ctx=CanvasCustom.getContext("2d");
    //     ctx.beginPath();
    //     ctx.arc(150, 75, 68, 0, 2*Math.PI);
    //     ctx.strokeStyle = 'red';
    //     ctx.lineWidth = 1;
    //     ctx.stroke();
    // }

    render() {
        const videoConstraints = {
            facingMode: "user"
        };

        


        let { faceDetectStatus,ImgSrc } = this.state
        

        return (
            <div style={{ width: '100%' }}>
                <Header headerText={this.state.sendHeaderText} />
                <FaceDetector onSelectImage={this.handleImage} active={this.state.detectorActive}>
                    {facesData => {

                        facesData.map(face => {
                            // console.log("x:", face);
                            // console.log("x:", typeof face.x);
                            // console.log("y:", face.y);
                            // console.log("width:", face.size);
                            // console.log("height:", face.strength);
                            // console.log("this is size : ", face_x);
                            // ToastsStore.success("x: " + String(face.x) + "/ " + "y: " + String(face.y));
                            var faceX = face.x
                            var faceY = face.y
                            var faceSize = face.size
                            var faceStrength = face.strength
                            // console.log("facesize: ", faceSize)
                            // ToastsStore.success("faceSize: " + String(faceSize));
                            // ToastsStore.success("faceStrength: " + String(faceStrength));

                            if (faceSize > 57) {
                                if (43 < faceX && faceX < 55 && 38 < faceY && faceY < 57) {
                                    faceDetectStatus = "Please keep you head in the oval and get closer to the device"
                                    ImgSrc = DetectImgURL                                    
                                    // ToastsStore.success(faceDetectStatus);
                                } else {
                                    faceDetectStatus = "Please place your face on the oval and get closer to the device"
                                    // ToastsStore.success(faceDetectStatus);
                                    ImgSrc = UndetectImgURL
                                }
                            } else {
                                if (30 < faceX && faceX < 60 && 35 < faceY && faceY < 60) {
                                    faceDetectStatus = "Please mover closer the face"
                                    ImgSrc = UndetectImgURL
                                    // ToastsStore.success(faceDetectStatus);
                                } else {
                                    faceDetectStatus = "Please place your face on the oval and get closer to the device"
                                    // ToastsStore.success(faceDetectStatus);
                                    ImgSrc = UndetectImgURL
                                }
                            }
                        })

                        return (
                            <div>
                                {/* <div className="Canvas-container" >
                                    <canvas id="myCanvas" height="150"/>
                                </div> */}
                                <div className="frame-container" >
                                    <img src={ImgSrc} className="framImg" style={{ height: this.state.frameHeight }} />
                                </div>
                                <div style={{ zIndex: "40", position: "absolute" }}>
                                    <ToastsContainer store={ToastsStore} />
                                </div>
                                <div className="message-container">
                                    <p className="txtMessage">{faceDetectStatus}</p>
                                </div>
                            </div>
                        )
                    }
                    }
                </FaceDetector>
                {/* <div style={{ display: 'flex' }}>
                    <button onClick={this.toggleDetection}>
                        {this.state.detectorActive ? "Stop detection" : "Start detection"}
                    </button>
                </div> */}

            </div>
        )
    }
}

export default FaceLivness;
