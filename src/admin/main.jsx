/* eslint-disable  */
import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core";
import firebase from "../firebase";
// import UserSettings from "./UserSettings";
// import Functionality from './adminsettings';
// import PaymentFailureLogs from "./PaymentFailureLogs";
import TopBar from "./topbar";
import Sidebar from "./sidebar";
import "../css/adminmain.css";
// import Loader from './loader';
// import Loader from "../creator/vr/loader";
// import Creatorlogin from '../Creatorlogin';
import { UserConsumer, UserContext } from "./Context";
// import UserList from '../dashboard/userlist';
// import AdminSetting from "./adminsettings";
import Dashboard from "./Dashboard";
import AddUserList from "./user-list";
import VendorList from "./vendor-list";
import ServiceProviderList from "./service-provider-list";
import ProductList from "./product-list";
import Analytics from "./analytics";
import OrderList from "./order-list";
import InvoiceList from "./invoice-list";
import Login from '../login';
// import UserLogs from "./User Logs";
// import CaseEntryForm from "./case-entry-form";
// import AddUser from "./add-user";
// import StationList from "./station-list";
// import CaseList from "./case-list";
// import CasePersonForm from "./suspect-list";
// import CaseHistory from "./caseHistoryLogs";
import config from "../common/utils/base-urls";
import AlertDialog from "../popup/AlertDialog";

// import { userCredential } from '../user_credential'
import axios from 'axios'
// import SuspectList from "./suspect-list";
// import VictimList from "./victim-list";
// import WitnessList from "./witness-list";

class AdminMain extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isMobileNavOpen: false,
      pageName: "Dashboard",
      statusRole: "",
      subscriptionModule: [],
      authStateSpin: true,
      user: { loggedIn: false },
      alertDialog: {
        title: "",
        subTitle: "",
        isOpen: false
      },
      userrole: "USER"
    }
  }
  setAlertDialog = () => {
    this.setState({
      alertDialog: {
        isOpen: false,
        title: "",
        subTitle: "",

      }
    });
  };
  componentDidMount() {


    let userRole = localStorage.getItem("userRole");
    this.setState({
      userRole: userRole
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("LOGIN")
        // var uid = user.uid;
        this.setState({
          isLoggedIn: true
        });
      } else {
        console.log("LOOUT")
        this.setState({
          isLoggedIn: false
        });
      }
    });

  }


  sideOptionSelected = (pageNameToLoad) => {
    this.setState({
      pageName: pageNameToLoad
    });
  }



  // }





  render() {

    const pageName = this.state.pageName;

    return (

      <div>

        {!this.state.isLoggedIn &&
          <Login />
        }
        {this.state.isLoggedIn &&
          <div>
            <div>
              <div style={{ backgroundColor: "", display: "flex", height: 100 + '%', overflow: "hidden", width: 100 + '%' }}>
                <TopBar
                  onMobileNavOpen={() => this.setState({
                    isMobileNavOpen: true
                  })}
                  sideOptionSelected={(value) => { this.sideOptionSelected(value) }}
                />
                <Sidebar
                  sideOptionSelected={(value) => this.sideOptionSelected(value)}
                  onMobileClose={() => this.setState({ isMobileNavOpen: false })}
                  openMobile={this.state.isMobileNavOpen}
                />

                {/* <div className={this.state.languageChanged ? "margintopleft" : "margintopright"}> */}
                <div className="margintopleft">
                  <div>
                    {this.state.pageName === "Dashboard" && <Dashboard />}

                    {this.state.pageName === "User List" &&
                      <AddUserList />
                    }
                    {/* {this.state.pageName === "Vendor List" && <VendorList />} */}
                    {/* {this.state.pageName === "ServiceProvider List" && <ServiceProviderList />} */}
                    {this.state.pageName === "Order" && <OrderList />}
                    {this.state.pageName === "invoice" && <InvoiceList />}
                    {this.state.pageName === "Product List" && <ProductList />}
                    {this.state.pageName === "analytics" && <Analytics />}
                    {/* {this.state.pageName === "Dashboard" && <Dashboard  languageChanged={this.state.languageChanged} />} */}

                  </div>
                </div>
              </div>


            </div>

            <AlertDialog
              alertDialog={this.state.alertDialog}
              setAlertDialog={this.setAlertDialog}
            />
          </div>
        }

      </div>


    )
  }
}

export default withTranslation()(AdminMain);
