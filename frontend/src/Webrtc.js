import React, { Component } from "react";
import "./Webrtc.css";
import Peer from "peerjs";
import Jitsi from "./Jitsi.js"

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
        /////////////////////
        // canvas related, placeholder
        this.context = null;
        this.started = false;
        this.buffer = [];
        ///////////////////////
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
        ////////////////////
        // canvas related, placeholder
        var demoCanvas = document.getElementById("game");
        var context = demoCanvas.getContext("2d");

        demoCanvas.onmousedown = function(e) {
            e.preventDefault();
            context.strokeStyle = '#00f';
            context.beginPath();
            this.started = true;
            this.buffer.push({"x": e.offsetX, "y": e.offsetY});
        }.bind(this);

        demoCanvas.onmousemove = function (e) {
            if (this.started) {
                context.lineTo(e.offsetX, e.offsetY);
                context.stroke();
                this.buffer.push({ "x": e.offsetX, "y": e.offsetY });
            }
        }.bind(this);

        demoCanvas.onmouseup = function (e) {
            if (this.started) {
                this.started = false;
                this.buffer = [];
            }
        }.bind(this);
        ////////////////////
    }

    startCapture() {
        this.localStream = document.getElementById("game").captureStream();
        var outgoing = this.peer.call(this.targetId, this.localStream);
        outgoing.on("stream", function(stream) {
            console.log("received remote stream");
            document.getElementById("capture").srcObject = stream;
        })
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

    send() {
        var msg = document.getElementById("msg").value;
        if (this.conn.open) {
            this.conn.send(this.srcId + " said: " + msg);
        }
    }

    render(){
        return(
            <div>
                <div id="pre">
                    <button onClick={this.ready.bind(this)}>I am ready</button>
                </div>
                <div id="post">
                    <div id="chat">
                        Your message: <input id="msg" type="text"></input>
                        <button onClick={this.send.bind(this)}>send</button><br></br>
                    </div>
                    <div id="left">
                        <Jitsi id="video" roomName={this.getQueryVariable("roomName")}>Your browser does not Jitsi.</Jitsi>
                        <video id="capture" autoPlay controls>Your browser does not support video.</video>
                    </div>
                    <div id="right">
                        <canvas id="game">Your browser does not support canvas.</canvas>
                    </div>
                </div>
            </div>
        );
    }
}
