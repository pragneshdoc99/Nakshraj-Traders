/* eslint-disable */
import React, { Component } from "react";
import axios from "axios";
import config from "./common/utils/base-urls";
import "./login.css";
import logoImg from "./images/NT.png";
import emailIcon from "./images/Icons/email.png";
import userIcon from "./images/Icons/user.png";
import mobileIcon from "./images/Icons/smartphone.png";
import passwordIcon from "./images/Icons/padlock.png";

import AlertDialog from "./popup/AlertDialog";
import { CircularProgress } from "@material-ui/core";
import firebase from '../src/firebase';

let patternEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;



export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      password: "",
      spin: false,
      userForgotEmail: "",
      alertDialog: {
        title: "",
        subTitle: "",
        isOpen: false,
      },
    };
    // this.onUserLogin = this.onUserLogin.bind(this);
  }
  setAlertDialog = () => {
    this.setState({
      alertDialog: {
        isOpen: false,
        title: "",
        subTitle: "",
      },
    });
  };

  componentDidMount() {
    this.nameInput.focus();
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      if (e.target.name === "userEmail") {
        if (this.state.userEmail === "") {
          this.setState({
            alertDialog: {
              isOpen: true,
              title: "Please Enter Valid Email-id.",
              subTitle: "",
            },
          });
        } else {
          if (!patternEmail.test(this.state.userEmail)) {
            this.setState({
              alertDialog: {
                isOpen: true,
                title: "Please Enter Valid Email-id.",
                subTitle: "",
              },
            });
          } else {
            document.getElementById("password").focus();
          }
        }
      } else if (e.target.name === "password") {
        if (this.state.password === "") {
          this.setState({
            alertDialog: {
              isOpen: true,
              title: "Please Enter Valid Password.",
              subTitle: "",
            },
          });
        } else {
          document.getElementById("btnLogin").click();
        }
      } else if (e.target.name === "userForgotEmail") {
        if (this.state.userForgotEmail === "") {
          this.setState({
            alertDialog: {
              isOpen: true,
              title: "Please Enter Valid Email-id.",
              subTitle: "",
            },
          });
        } else {
          if (!patternEmail.test(this.state.userForgotEmail)) {
            this.setState({
              alertDialog: {
                isOpen: true,
                title: "Please Enter Valid Email-id.",
                subTitle: "",
              },
            });
          } else {
            document.getElementById("btnForgot").click();
          }
        }
      }
    }
  };

  switchToForgot = () => {
    document.getElementById("loginbox").classList.toggle("d-none");
    document.getElementById("forgotbox").classList.toggle("d-none");
  };

  switchToLogin = () => {
    document.getElementById("forgotbox").classList.toggle("d-none");
    document.getElementById("loginbox").classList.toggle("d-none");
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };


  onUserLogin = (e) => {
    e.preventDefault();
    // window.location.href = '/admin';
    const { userEmail, password } = this.state;

    this.setState({
      spin: true
    })

    let tmpEmail = userEmail.toLowerCase();
    if (tmpEmail === "") {
      this.setState({
        spin: false,
        alertDialog: {
          isOpen: true,
          title: "Please Enter Valid Email-id.",
          subTitle: "",
        },
      });
    } else if (password === "") {
      this.setState({
        spin: false,
        alertDialog: {
          isOpen: true,
          title: "Please Enter Valid Password.",
          subTitle: "",
        },
      });
    } else {
      if (!patternEmail.test(tmpEmail)) {
        this.setState({
          spin: false,
          alertDialog: {
            isOpen: true,
            title: "Please Enter Valid Email-id.",
            subTitle: "",
          },
        });
      } else {
        // alert("LOGIN DONE");

        let firestoreData = firebase.firestore();
       
        let docRef = firestoreData.collection("users-list")
        docRef = docRef.where("email", "==", tmpEmail);
        docRef.get().then((querySnapshot) => {
      
          if (querySnapshot.size !== 0) {

            querySnapshot.forEach((doc) => {
              console.log("USER DOC ID ::  ", doc.data())
              let tempData = doc.data();
              if (tempData.loginFlag) {
                firebase.auth().signInWithEmailAndPassword(tmpEmail, password)
                  .then((user) => {
                    const userID = user.user.uid.toString();
                    localStorage.setItem("userId", userID)
                    localStorage.setItem("email", tmpEmail)

                    console.log("Sucessfull Login :: ", userID);
                    this.setState({
                      spin: false
                    });
                    window.location.href = "/";
                  })
                  .catch((error) => {
                    this.setState({
                      spin: false
                    });
                    const errorMessage = error.message;
                    alert(errorMessage);
                  })
              } else {
                this.setState({
                  spin: false,
                  alertDialog: {
                    isOpen: true,
                    title: "Cordinate To Admin! For The Inactivatation.",
                    subTitle: "",
                  },
                });
              }
            })

          } else {
            this.setState({
              spin: false,
              alertDialog: {
                isOpen: true,
                title: "User Not Found ! Please Cordinate With Support Team !",
                subTitle: "",
              },
            });
          }


        })
      }
    }
  };


  onUserForgot = (e) => {
    e.preventDefault();

    this.setState({
      spin: true
    })


    let tmpEmail = this.state.userForgotEmail.toLowerCase();
    if (tmpEmail === "") {
      this.setState({
        spin: false,
        alertDialog: {
          isOpen: true,
          title: "Please Enter Valid Email-id.",
          subTitle: "",
        },
      });
    } else {
      if (!patternEmail.test(tmpEmail)) {
        this.setState({
          spin: false,
          alertDialog: {
            isOpen: true,
            title: "Please Enter Valid Email-id.",
            subTitle: "",
          },
        });
      } else {
        

        firebase.auth().sendPasswordResetEmail(tmpEmail)
				.then(() => {

          this.setState({
            spin: false,
            alertDialog: {
              isOpen: true,
              title: "Please check your email and reset password there.",
              subTitle: "",
            },
          })

          document.getElementById("forgotbox").classList.toggle("d-none");
          document.getElementById("loginbox").classList.toggle("d-none");
				})
				.catch((error) => {

          this.setState({
            spin: false,
            alertDialog: {
              isOpen: true,
              title: "User Not Found ! Please Enter Proper Email-id.",
              subTitle: "",
            },
          })

				});
      }
    }
  };

  render() {
    return (
      <div className="mainbg">
        <div className="container vh-100">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-center flex-column">
                <img src={logoImg} alt="" className="logoimg" />
                <div className="login-box-wrapper" id="loginbox">
                  <div className="loginbox">
                    <h3 className="heading">LOGIN</h3>

                    <label htmlFor="email" className="label-class">
                      <img src={emailIcon} alt="" />
                      User Email
                    </label>
                    <input
                      ref={(input) => {
                        this.nameInput = input;
                      }}
                      id="userEmail"
                      name="userEmail"
                      type="email"
                      value={this.state.userEmail}
                      onChange={this.handleInputChange}
                      onKeyUp={this.handleKeyUp}
                      className="input-class"
                    />

                    <label htmlFor="password" className="label-class">
                      <img src={passwordIcon} alt="" />
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      onKeyUp={this.handleKeyUp}
                      className="input-class"
                      autoComplete="off"
                    />

                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        id="rememberPass"
                        name="rememberPass"
                        value="True"
                      />
                      <label for="rememberPass" className="checkboxlabel">
                        Remember Me
                      </label>
                    </div>

                    {this.state.spin &&
                      <CircularProgress
                        color="secondary"
                        style={{ margin: "5px" }}
                        size={20}
                      />
                    }
                    {!this.state.spin &&
                      <button
                        id="btnLogin"
                        className="actionbutton"
                        disabled={this.state.spin}
                        onClick={(e) => this.onUserLogin(e)}
                      >
                        LOGIN
                      </button>
                    }
                    <a className="forgetPass" onClick={this.switchToForgot}>
                      Forgot your password?
                    </a>
                  </div>
                  {/* <div className="mt-15">
                                        <span className="color-white">You Don't Have Account? </span>
                                        <button className="actionbutton ml-15" onClick={this.switchToRegister}>SIGN UP</button>
                                    </div> */}
                </div>

                <div className="forgot-box-wrapper d-none" id="forgotbox">
                  <div className="forgotbox">
                    <div className="loginbox">
                      <h3 className="heading">FORGOT PASSWORD</h3>

                      <label htmlFor="email" className="label-class">
                        <img src={emailIcon} alt="" />
                        Email
                      </label>
                      <input
                        id="userForgotEmail"
                        name="userForgotEmail"
                        type="email"
                        value={this.state.userForgotEmail}
                        onChange={this.handleInputChange}
                        onKeyUp={this.handleKeyUp}
                        className="input-class"
                      />

                      <div className="centerContent">
                        <button
                          id="btnForgot"
                          className="actionbutton"
                          onClick={(e) => this.onUserForgot(e)}
                        >
                          FORGOT
                        </button>
                        <button
                          id="btnBack"
                          className="actionbackbutton"
                          onClick={this.switchToLogin}
                        >
                          BACK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AlertDialog
          alertDialog={this.state.alertDialog}
          setAlertDialog={this.setAlertDialog}
        />
      </div>
    );
  }
}
