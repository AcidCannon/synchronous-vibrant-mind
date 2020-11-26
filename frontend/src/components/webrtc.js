import React, { Component } from "react";
import "../css/webrtc.css";
import Peer from "peerjs";
import Jitsi from "../jitsi.js";
import Header from "./header";

const host = "[2605:fd00:4:1001:f816:3eff:feb2:3536]";

async function addMeetingLogoutTime(id, name, logoutTime){
        
    const response = await fetch("http://"+host+"/api/addMeetingLogoutTime", {
        method: "POST",
            headers: { 
            'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({ invitation_id:id, name:name, logout_time:logoutTime})
        }).then(async response => {
            const data = await response.json();
            
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
        }).catch(error => {
            console.error('There was an error when adding logout time!', error);
        });
    
}

export default class Webrtc extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.srcId = null;
        this.targetId = null;
        this.host = "[2605:fd00:4:1001:f816:3eff:fef1:58d0]";
        this.port = 9000;
        this.path = "/";
        this.debug = 3;
        this.secure = true;
        this.peer = null;
        this.conn = null;
        this.localStream = null;
        this.interval = null;
    }

    getTimeStamp() {
        var now = new Date();
        return ( now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate()) + " " + now.getHours() + ':'
                      + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
                      .getSeconds()) : (now.getSeconds())));
      }

    

    recordLeave() {

        window.addEventListener("beforeunload", (param)=>
        {
            const leave_time = this.getTimeStamp()
            var id = this.getQueryVariable("roomName").replace( /[^\d.]/g, '' )
            id = parseInt(id)
            const y_username = this.getQueryVariable("srcId").replace(/\d+/g, '')
            addMeetingLogoutTime(id, y_username, leave_time)
            
        });

    }

    getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){
                return pair[1];
            }
        }
        return(false);
    }


    componentDidMount() {
        
        // get parameter from url
        this.srcId = this.getQueryVariable("srcId");
        this.targetId = this.getQueryVariable("targetId");
        this.recordLeave()
        // if no peer exist
        if (!this.peer) {
            // create peer instance
            this.peer = new Peer(this.srcId, {
                host: this.host,
                port: this.port,
                path: this.path,
                debug: this.debug,
                secure: this.secure
            });

            // callback when successfully registered
            this.peer.on("open", function(id) {
                console.log(id, "is ready.");
            });

            this.peer.on("connection", function(conn) {
                // callback when receive data
                conn.on("data", function(data) {
                    console.log(this.srcId, "get", data);
                }.bind(this));
            }.bind(this));
        }
    }

    startCapture() {
        // we do not know if your mate start the game yet, so we need a placeholder
        // here localStream is just a null object, but we will establish streaming connection first
        // and handle with the real stream later
        this.localStream = document.getElementById("placeholder").captureStream();
        if (!this.interval) {
            clearInterval(this.interval);
            this.interval=null;
        }
        this.interval = setInterval(function() {
            console.log("step in")
            var iframeObj = document.getElementById("mahjong");
            if (!iframeObj) {
                console.log("iframe is null");
                return;
            }
            var canvasSet = iframeObj.contentDocument.getElementsByTagName("canvas");
            if (canvasSet.length === 0) {
                console.log("canvas set is null");
                return;
            }
            var canvasObj = canvasSet[0];
            if (!canvasObj) {
                console.log("canvas obj is null");
                return;
            }
            console.log("before")
            this.localStream = canvasObj.captureStream();
            console.log("after")
            if (this.localStream) {
                clearInterval(this.interval);
                this.interval = null;
                var outgoing = this.peer.call(this.targetId, this.localStream);
                outgoing.on("stream", function(stream) {
                    console.log("received remote stream");
                    document.getElementById("capture").srcObject = stream;
                })
                console.log("clear interval")
            }
        }.bind(this), 500);
    }

    ready() {
        // create connection
        if (!this.conn) {
            this.conn = this.peer.connect(this.targetId);
            this.conn.on("open", function() {
                this.conn.send("handshake");
            }.bind(this));
            document.getElementById("post").style.display="block";
            document.getElementById("pre").style.display="none";
            this.peer.on("call", function(incoming) {
                incoming.answer(this.localStream);
                incoming.on("stream", function(stream) {
                    document.getElementById("capture").srcObject = stream;
                })
            }.bind(this));
            this.startCapture();
        }
    }

    render(){
        return(
            <div>
                <Header />
                <div id="pre">
                    <button onClick={this.ready.bind(this)}>I am ready</button>
                </div>
                <div id="post">
                    <div id="left">
                        <Jitsi id="video" roomName={this.getQueryVariable("roomName")}>Your browser does not Jitsi.</Jitsi>
                        <video id="capture" autoPlay controls>Your browser does not support video.</video>
                    </div>
                    <div id="right">
                        <iframe id="mahjong" src="https://[2605:fd00:4:1001:f816:3eff:feb2:3536]/mahjongGame">Your browser does not support iframe.</iframe>
                        <canvas id="placeholder">Your browser does not support canvas.</canvas>
                    </div>
                </div>
            </div>
        );
    }
}