/* eslint-disable */

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import firebase from "../firebase";
import PropTypes from "prop-types";
import AlertDialog from "../popup/AlertDialog";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import ConfirmDialog from "./ConfirmDialog";
import { green, pink } from "@material-ui/core/colors";
import baseUrls from "../common/utils/base-urls";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import Page from "./page";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import moment from "moment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
// import logoImg from "../images/cyberLogo.png";
import Config from "../common/utils/base-urls";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  makeStyles,
  Typography,
  Slide,
  Snackbar,
  Container,
  Chip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
// import LanguageSelector from "../LanguageSelector";
import VendorList from "./vendor-list";
import CountryDialog from "../popup/CountryDialog";
import StateDialog from "../popup/StateDialog";
import { event } from "jquery";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
  },
  formControl: {
    width: "100%",
    variant: "outlined",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  tab: {
    flexGrow: 1,
  },
  avatarimage: {
    display: "flex",
    justifyContent: "center",
    margin: "20px",
    padding: "10px",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

  green: {
    color: "#fff",
    backgroundColor: green[500],
    margin: "10px",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  textarea: {
    resize: "both",
  },
}));

const outerTheme = createMuiTheme({
  palette: {
    secondary: {
      main: "#ffffff",
    },
  },
});

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")`
  width: 300px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: #40a9ff;
  }

  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    font-size: 14px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;
const Tag = styled(({ label, onDelete, ...props }) => (
  <div {...props}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled("ul")`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected="true"] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus="true"] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return String(
    s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
  );
}

let userRole = "";
let userEmail = "";

const AddVendor = ({
  currentUserId,
  viweOnly,
  className,
  redirectBack,
  vendorDetails,

  ...rest
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [tabValue, setTabValue] = React.useState("1");
  const [spin, setSpin] = useState(false);
  const [evidenceSpin, setEvidenceSpin] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [alertDialog, setAlertDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const [backPage, setBackPage] = useState(true);
  const [openCountry, setOpenCountry] = React.useState(false);
  const [openState, setOpenState] = React.useState(false);
  const [countryArray, setCountryArray] = useState([]);
  const [stateArray, setStateArray] = useState([]);
  const [userListArray, setUserListArray] = useState([]);
  const [stateWiseCityArray, setStateWiseCityArray] = useState([]);
  const [otherCountry, setOtherCountry] = React.useState(false);
  const [otherState, setOtherState] = React.useState(false);
  const [values, setValues] = useState({
    // vendorName: "",
    vendorEmail: "",
    vendorContact: "",
    vendorAddress: "",
    userCountry: "",
    userState: "",
    vendorLogo: "",
    vendorCompanyName: "",
    vendorEstablishmentYear: "",
    vendorEstimateRevenue: "",
    vendorFunding: "",
    vendorFundYear: "",
    vendorEmployeeSize: "",
    vendorWebsite: "",
    vendorDescription: "",
  });

  const handleTabChange = (event, newValue) => {
    console.log("VALUE :: ", newValue);
    // setTabValue(newValue);
    if (newValue === "1") {
      console.log("newValue HER :: ", newValue);
      setTabValue(newValue);
    }

    if (newValue === "2") {
      console.log("newValue :: ", newValue);

      if (
        values.vendorEmail &&
        values.vendorContact &&
        values.userCountry &&
        values.userState &&
        values.vendorAddress
      ) {
        setTabValue(newValue);
      } else {
        let tempTabvalue = "1";
        setTabValue(tempTabvalue);
        if (values.vendorEmail == "") {
          setAlertDialog({
            isOpen: true,
            title: "Please Enter Vendor Email ",
          });
        } else if (values.vendorContact == "") {
          setAlertDialog({
            isOpen: true,
            title: "Please Enter Vendor Contact ",
          });
        } else if (values.userCountry == "") {
          setAlertDialog({
            isOpen: true,
            title: "Please Enter Vendor Country ",
          });
        } else if (values.userState == "") {
          setAlertDialog({
            isOpen: true,
            title: "Please Enter Vendor State ",
          });
        } else if (values.vendorAddress == "") {
          setAlertDialog({
            isOpen: true,
            title: "Please Enter Vendor Address ",
          });
        }
      }
    }
  };

  const setAlertDialogfunc = () => {
    setAlertDialog({
      ...alertDialog,
      isOpen: false,
      title: "",
      subTitle: "",
    });
  };

  useEffect(() => {
    // console.log("currentUserId :: ", currentUserId);

    userRole = localStorage.getItem("userRole")
    userEmail = localStorage.getItem("userEmail")

    console.log("currentUserId :: ", vendorDetails);
   
    if (currentUserId) {

      let tempVendorEmail = "";

      if(userRole === "VENDOR" ) {
        tempVendorEmail = userEmail
      }
  
      if(userRole === "ADMIN"){
        tempVendorEmail = vendorDetails.user_email
      }

      setValues({
        ...values,
        vendorEmail: tempVendorEmail,
        vendorContact: vendorDetails.contact_no,
        vendorAddress: vendorDetails.address,
        userCountry: vendorDetails.country_name,
        userState: vendorDetails.state_name,
        vendorLogo: vendorDetails.logo,
        vendorCompanyName: vendorDetails.company_name,
        vendorEstablishmentYear: vendorDetails.establishment_year,
        vendorEstimateRevenue: vendorDetails.estimate_revenue,
        vendorFunding: vendorDetails.funding,
        vendorFundYear: vendorDetails.fund_year,
        vendorEmployeeSize: vendorDetails.employee_size,
        vendorWebsite: vendorDetails.website_link,
        vendorDescription: vendorDetails.company_description,
      });

      if(vendorDetails.country_name){
        getStateList(vendorDetails.country_name)
      }
    } 
    else {
      let tempVendorEmail = "";

      if(userRole === "VENDOR" ) {
        tempVendorEmail = userEmail
      }
  
      if(userRole === "ADMIN"){
        tempVendorEmail = values.vendorEmail
      }
      setValues({
        ...values,
        vendorEmail: tempVendorEmail
      })
    }

    //------------------- ---------------------------------
    getUserListData();
    getCountryList();
    // getStateList();
    //-------------------------------------------------------

    // axios
    //   .get(Config.serverUrl + "admin/getAllStates", {
    //     headers: {
    //       Authorization: token,
    //     },
    //   })
    //   .then((res) => {
    //     console.log("res.data.data", res.data.data);
    //     let finalArray = res.data.data;
    //     console.log("finalArray after :: ", finalArray);

    //     setStateArray(finalArray);
    //   })
    //   .catch((err) => {
    //     console.log("Error Occured", err);
    //   });
  }, []);
  //console.log("Values Data", values)

  const getUserListData = (event) => {
    const token = localStorage.getItem("token");
    axios
      .get(Config.serverUrl + "admin/getAllEnalbledUsers", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("USERS:: ", res.data.data);
        let finalArray = res.data.data;
        let tempArray = [];
        finalArray.map((name, index) => {
          if (name.user_role === "VENDOR") {
            tempArray.push({
              vendorEmail: name.user_email,
              userId: name.user_id,
            });
          }
        });

        console.log("tempArray :: ", tempArray);

        setUserListArray(tempArray);
      })
      .catch((err) => {
        console.log("Error Occured", err);
      });
  };

  const getCountryList = (event) => {
    const token = localStorage.getItem("token");
    axios
      .get(Config.serverUrl + "admin/getAllCountries", {
        headers: {
          Authorization: token,
        },
        // token: token,
      })
      .then((res) => {
        let finalArray = res.data.data;
        console.log("res.data.data", finalArray);

        let countryArrayIn = [];
        let tempArray = [];

        finalArray.map((name, index) => {
          console.log("NAME :: ", name.country_name);
          tempArray.push({
            userCountry: name.country_name,
          });
        });
        countryArrayIn = tempArray;
        let defaultCountry = {
          userCountry: "Others",
        };

        countryArrayIn.push(defaultCountry);
        console.log("finalArray Country :: ", countryArrayIn);

        setCountryArray(countryArrayIn);
      })
      .catch((err) => {
        setCountryArray([
          {
            userCountry: "Others",
          },
        ]);
        console.log("Error Occured", err, err.message);
        console.log("Error data", err, err.data);
      });
  };

  const getStateList = (selectedCountry) => {
    const token = localStorage.getItem("token");
    axios
      .get(
        Config.serverUrl + "admin/getAllStates?countryName=" + selectedCountry,
        {
          headers: {
            Authorization: token,
          },
          // token: token,
        }
      )
      .then((res) => {
        let finalArray = res.data.data;
        console.log("res.data.data", finalArray);

        let countryArrayIn = [];
        let tempArray = [];

        finalArray.map((name, index) => {
          console.log("NAME :: ", name.state_name);
          tempArray.push({
            userState: name.state_name,
          });
        });
        countryArrayIn = tempArray;
        let myArray = {
          // incidentState: t("option_others")
          userState: "Others",
        };

        countryArrayIn.push(myArray);
        console.log("finalArray State :: ", countryArrayIn);

        setStateArray(countryArrayIn);
      })
      .catch((err) => {
        let defaultState = {
          userState: "Others",
        };
        setStateArray([defaultState]);
        console.log("Error Occured", err);
      });
  };

  const handleBlur = (event) => {
    if (event.target.name === "userCountry") {
      console.log("CASE TYPE :: ", event.target.value);
      if (event.target.value === "") {
        setValues({
          ...values,
          userCountry: "",
        });
        // countCaseType = 0;
        // localStorage.setItem('localCaseType', "");
      } else {
        if (event.target.value === "Others" || event.target.value === "أخرى") {
          setValues({
            ...values,
            userCountry: "",
          });
          setOtherCountry(true);
          // countCaseType = 0;
          // localStorage.setItem('localCaseType', "");
        } else {
          setOtherCountry(false);
          // countCaseType = 1;
          // localStorage.setItem('localCaseType', event.target.value);
        }
      }
    }

    if (event.target.name === "userState") {
      console.log("CASE TYPE State :: ", event.target.value);
      if (event.target.value === "") {
        setValues({
          ...values,
          userState: "",
        });
      } else {
        if (event.target.value === "Others" || event.target.value === "أخرى") {
          setValues({
            ...values,
            userState: "",
          });
          setOtherState(true);
        } else {
          setOtherState(false);
        }
      }
    }

    if (event.target.name === "vendorEmail") {
      console.log("CASE TYPE :: ", event.target.value);
      if (event.target.value === "") {
        setValues({
          ...values,
          vendorEmail: "",
        });
      }
    }
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    //console.log('caseDetails', values)
  };

  const handleDateChange = (event) => {
    var myDate = event.target.value;

    //console.log("Date =>", myDate)
    setValues({
      ...values,
      [event.target.name]: myDate,
    });
    //console.log('caseDetails', values)
  };

  function redirectBackPage(backToLoad) {
    setBackPage(backToLoad);
  }

  function onBacktoHome(e) {
    if (!currentUserId) {
    }
    const backValue = false;
    redirectBackPage(backValue);
  }

  // ------------Multipale select-----------------
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [state, setState] = React.useState({
    open: false,
  });
  const { open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleAutoCompleteChangeCountry = (event, value) => {
    console.log("Value :: ", value);
    if (value === null || value === "") {
      console.log("value :: ", value);
      setValues({
        ...values,
        userCountry: "",
        userState: "",
      });
      setOtherCountry(false);
    } else {
      if (value.userCountry === "Others" || value.userCountry === "أخرى") {
        console.log("Value IFF :: ", value.userCountry);
        setOtherCountry(true);
      } else {
        console.log("ELSE value :: ", value);
        if (value.userCountry === "") {
          setValues({
            ...values,
            userCountry: "",
            userState: "",
          });
          setOtherCountry(false);
        } else {
          setValues({
            ...values,
            userCountry: value.userCountry,
            userState: "",
          });
          setOtherCountry(false);
          getStateList(value.userCountry);
          // handleStateWiseCity(value.userCountry);
        }
      }
    }
  };

  const handleClickOpenCountry = () => {
    setOpenCountry(true);
  };

  const handleClickCloseCountry = () => {
    setOpenCountry(false);
    getCountryList();
  };

  const handleClickOpenState = () => {
    setOpenState(true);
  };

  const handleClickCloseState = () => {
    setOpenState(false);
    getStateList(values.userCountry);
  };

  const handleAutoCompleteChangeState = (event, value) => {
    console.log("Value :: ", value);
    if (value === null || value === "") {
      console.log("value :: ", value);
      setValues({
        ...values,
        userState: "",
      });
      setOtherState(false);
    } else {
      if (value.userState === "Others" || value.userState === "أخرى") {
        console.log("Value IFF :: ", value.userState);
        setOtherState(true);
      } else {
        console.log("ELSE value :: ", value);
        if (value.userState === "") {
          setValues({
            ...values,
            userState: "",
          });
          setOtherState(false);
        } else {
          setValues({
            ...values,
            userState: value.userState,
          });
          setOtherState(false);
          // handleStateWiseCity(value.userCountry);
        }
      }
    }
    // if (value === null || value === "") {
    //   setValues({
    //     ...values,
    //     userState: "",
    //   });
    // } else {
    //   if (value.userState === "") {
    //     setValues({
    //       ...values,
    //       userState: "",
    //     });
    //   } else {
    //     setValues({
    //       ...values,
    //       userState: value.userState,
    //     });
    //     // handleCountryWiseState(value.userState);
    //   }
    // }
  };

  const handleAutoCompleteChangeUsers = (event, value) => {
    if (value === null || value === "") {
      setValues({
        ...values,
        vendorEmail: "",
      });
    } else {
      if (value.vendorEmail === "") {
        setValues({
          ...values,
          vendorEmail: "",
        });
      } else {
        let vendorData = userListArray.filter(
          (vendor) => vendor.vendorEmail === value.vendorEmail
        );
        setValues({
          ...values,
          vendorEmail: value.vendorEmail,
          userId: vendorData[0].userId,
        });
        // handleCountryWiseState(value.userState);
      }
    }
  };

  const handleUserImageChange = (e) => {
    // e.preventDefault();

    const image = e.target.files[0];
    const extension = image && image.name.split(".");
    if (
      image &&
      (extension[extension.length - 1] === "png" ||
        extension[extension.length - 1] === "jpeg" ||
        extension[extension.length - 1] === "jpg")
    ) {
      console.log("Image :: ", image);
      // setLogoSpin(true);
      let myPromise = new Promise((resolve, reject) => {
        const myGuid = guid();

        console.log("myGuid :: ", myGuid);
        const storageUrl = firebase.storage();
        console.log("storageUrl :: ", storageUrl);
        const storageRef = storageUrl.ref();
        console.log("storageRef :: ", storageRef);

        const uploadTask = storageRef.child(myGuid).put(e.target.files[0]);
        uploadTask.on(
          "state_changed",
          (snapShot) => {},
          (err) => {
            console.error(err);
            reject(err);
          },
          () => {
            firebase
              .storage()
              .ref()
              .child(myGuid)
              .getDownloadURL()
              .then((fireBaseUrl) => {
                console.log("Cover Image", fireBaseUrl);
                resolve(fireBaseUrl);
              });
          }
        );
      });
      myPromise.then((url) => {
        // setLogoSpin(false);
        setValues({
          ...values,
          vendorLogo: url,
        });

        console.log(`url`, url);
      });
    }
  };

  // setAlertDialog({
  //   isOpen: true,
  //   title: "User Image uploaded"
  // });

  // uploadFiles(e.target.files, "widgetimage", true, true).then(url => {
  //   setValues({
  //     ...values,
  //     userImage: url
  //   });
  //   setAlertDialog({
  //     isOpen: true,
  //     title: "User Image uploaded"
  //   });
  // });
  // };

  const onUpdateDetails = () => {
    setSpin(true);

    // alert("VENDOR ADDED");
    if (values.vendorEmail == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Vendor Email ",
      });
    } else if (values.vendorContact == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Vendor Contact ",
      });
    } else if (values.userCountry == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Vendor Country ",
      });
    } else if (values.userState == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Vendor State ",
      });
    } else if (values.vendorAddress == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Vendor Address ",
      });
    } else if (values.vendorLogo == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Vendor Company Logo ",
      });
    } else if (values.vendorCompanyName == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Vendor Company Name ",
      });
    } else if (values.vendorEstablishmentYear == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Vendor Establishment Year",
      });
    } else if (values.vendorEstimateRevenue == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Vendor Revenue",
      });
    } else if (values.vendorFunding == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Vendor Establishment Funding",
      });
    } else if (values.vendorFundYear == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Vendor Fund Year",
      });
    } else if (values.vendorEmployeeSize == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Size Of Employee",
      });
    } else if (values.vendorWebsite == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Vendor Website",
      });
    } else if (values.vendorDescription == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Vendor Description",
      });
    } else {
      let vendorTempId = "";
      if (currentUserId) {
        if(userRole === "VENDOR"){
          vendorTempId = localStorage.getItem("userId")
        } else {
          vendorTempId = vendorDetails.user_id;
        }
      } else {
        if(userRole === "VENDOR"){
          vendorTempId = localStorage.getItem("userId")
        } else {
          vendorTempId = values.userId;
        }
      }


      // console.log("OBJ :: ", detailObj);
      const token = localStorage.getItem("token");
      if (!currentUserId) {
        let detailObj = {
          userId: vendorTempId,
          contactNo: values.vendorContact,
          countryName: values.userCountry,
          stateName: values.userState,
          address: values.vendorAddress,
          logo: values.vendorLogo,
          companyName: values.vendorCompanyName,
          establishmentYear: parseInt(values.vendorEstablishmentYear),
          estimateRevenue: values.vendorEstimateRevenue,
          funding: values.vendorFunding,
          fundYear: parseInt(values.vendorFundYear),
          employeeSize: parseInt(values.vendorEmployeeSize),
          websiteLink: values.vendorWebsite,
          companyDescription: values.vendorDescription,
        };
        axios
          .post(`${Config.serverUrl}admin/createVendor`, detailObj, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            setBackPage(false);
            setAlertDialog({
              isOpen: true,
              title: "Details added successfully",
            });
          })
          .catch((err) => {
            setSpin(false);
            alert(err.response.data.message);
          });
      } else {
        let detailObj = {
          id: vendorDetails.id,
          userId: vendorTempId,
          contactNo: values.vendorContact,
          countryName: values.userCountry,
          stateName: values.userState,
          address: values.vendorAddress,
          logo: values.vendorLogo,
          companyName: values.vendorCompanyName,
          establishmentYear: parseInt(values.vendorEstablishmentYear),
          estimateRevenue: values.vendorEstimateRevenue,
          funding: values.vendorFunding,
          fundYear: parseInt(values.vendorFundYear),
          employeeSize: parseInt(values.vendorEmployeeSize),
          websiteLink: values.vendorWebsite,
          companyDescription: values.vendorDescription,
        };
        axios
          .post(`${Config.serverUrl}admin/updateVendor`, detailObj, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            setBackPage(false);
            setAlertDialog({
              isOpen: true,
              title: "Details Updated successfully",
            });
          })
          .catch((err) => {
            setSpin(false);
            alert(err.response.data.message);
          });
      }
    }
  };

  return (
    <div>
      {backPage && (
        <Page className={classes.root} title={"Add New Vendor"}>
          <Container maxWidth={false}>
            <form
              autoComplete="off"
              noValidate
              className={clsx(classes.root, className)}
              {...rest}
            >
              <Box display="flex" style={{ alignItems: "center" }}>
                <ArrowBackIcon
                  color="primary"
                  variant="contained"
                  onClick={() => onBacktoHome()}
                  style={{ margin: "0px 16px", cursor: "pointer" }}
                />
                <Box flexGrow={1}>
                  <Typography variant="h4" className="txtleft">
                    {"Vendor Form"}
                  </Typography>
                </Box>
                {!viweOnly &&
                  (spin ? (
                    <CircularProgress
                      color="secondary"
                      style={{ margin: "5px" }}
                      size={20}
                    />
                  ) : (
                    ""
                  ))}
                {!viweOnly && (
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={spin}
                    onClick={() => {
                      onUpdateDetails();
                    }}
                  >
                    <AddCircleIcon className={"btnRightDetails"} />
                    {currentUserId ? "Save" : "Add"}
                  </Button>
                )}
              </Box>
              <hr />
              {/* {!currentUserId &&
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <Box p={1} label="Case Completion">
                      <LinearProgress variant="determinate" value={(caseCompletion / 10) * 100} />
                    </Box>
                  </Grid>
                </Grid>
              } */}
              {/* {!currentUserId &&
                <hr />
              } */}
              <div className="overflowform">
                <Card style={{ minHeight: "500px", marginBottom: "20px" }}>
                  <CardContent>
                    <div className={classes.tab}>
                      <TabContext value={tabValue}>
                        <AppBar position="static">
                          <ThemeProvider theme={outerTheme}>
                            <TabList
                              onChange={handleTabChange}
                              aria-label={"profiletab"}
                              variant="scrollable"
                              scrollButtons="on"
                            >
                              <Tab label={"Basic Details"} value="1" />
                              <Tab label={"Company Details"} value="2" />
                            </TabList>
                          </ThemeProvider>
                        </AppBar>
                        <TabPanel value="1">
                          <Grid container spacing={3}>
                            {userRole === "VENDOR" &&
                              <Grid item md={6} xs={12}>
                                <TextField
                                  fullWidth
                                  label={"Email"}
                                  name="vendorEmail"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  required
                                  value={values.vendorEmail}
                                  disabled
                                  variant="outlined"
                                  type="email"  
                                />
                              </Grid>
                            }

                            {userRole === "ADMIN" &&

                              <Grid item md={6} xs={12}>
                                <Autocomplete
                                  id="userListArray"
                                  options={userListArray}
                                  getOptionLabel={(option) =>
                                    option.vendorEmail || values.vendorEmail
                                  }
                                  // defaultValue={}
                                  filterSelectedOption
                                  disabled={viweOnly}
                                  renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                      <Chip
                                        variant="outlined"
                                        label={option.vendorEmail}
                                        {...getTagProps({ index })}
                                      />
                                    ))
                                  }
                                  name="vendorEmail"
                                  value={values.vendorEmail}
                                  onChange={handleAutoCompleteChangeUsers}
                                  onBlur={handleBlur}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      name="userState"
                                      variant="outlined"
                                      label={"Email"}
                                      placeholder={"Email"}
                                    />
                                  )}
                                />
                              </Grid>
                            }
                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Contact Number"}
                                name="vendorContact"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                value={values.vendorContact}
                                disabled={viweOnly}
                                variant="outlined"
                                // type="Number"
                              />
                            </Grid>

                            <Grid item md={otherCountry ? 4 : 6} xs={12}>
                              {/* <Grid item md={4} xs={12}> */}

                              <Autocomplete
                                id="countryArray"
                                options={countryArray}
                                getOptionLabel={(option) =>
                                  option.userCountry || values.userCountry
                                }
                                // defaultValue={}
                                filterSelectedOption
                                disabled={viweOnly}
                                renderTags={(value, getTagProps) =>
                                  value.map((option, index) => (
                                    <Chip
                                      variant="outlined"
                                      label={option.userCountry}
                                      {...getTagProps({ index })}
                                    />
                                  ))
                                }
                                name="userCountry"
                                value={values.userCountry}
                                onChange={handleAutoCompleteChangeCountry}
                                onBlur={handleBlur}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    name="userCountry"
                                    variant="outlined"
                                    label={"Country"}
                                    placeholder={"Country"}
                                  />
                                )}
                              />
                            </Grid>
                            {otherCountry && (
                              <Grid
                                item
                                md={2}
                                xs={12}
                                style={{ alignSelf: "center" }}
                              >
                                {!viweOnly && (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ width: "160px" }}
                                    onClick={handleClickOpenCountry}
                                  >
                                    <AddCircleIcon
                                      className={"btnRightDetails"}
                                    />
                                    {"Add"}
                                  </Button>
                                )}
                              </Grid>
                            )}

                            {/* <Grid item md={6} xs={12}>
                              <Autocomplete
                                id="stateArray"
                                options={stateArray}
                                getOptionLabel={(option) =>
                                  option.userState || values.userState
                                }
                                // defaultValue={}
                                filterSelectedOption
                                disabled={viweOnly}
                                renderTags={(value, getTagProps) =>
                                  value.map((option, index) => (
                                    <Chip
                                      variant="outlined"
                                      label={option.userState}
                                      {...getTagProps({ index })}
                                    />
                                  ))
                                }
                                name="userState"
                                value={values.userState}
                                onChange={handleAutoCompleteChangeState}
                                onBlur={handleBlur}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    name="userState"
                                    variant="outlined"
                                    label={"State / Province"}
                                    placeholder={"State"}
                                  />
                                )}
                              />
                            </Grid> */}

                            <Grid item md={otherState ? 4 : 6} xs={12}>
                              {/* <Grid item md={4} xs={12}> */}

                              <Autocomplete
                                id="stateArray"
                                options={stateArray}
                                getOptionLabel={(option) =>
                                  option.userState || values.userState
                                }
                                // defaultValue={}
                                filterSelectedOption
                                disabled={viweOnly}
                                renderTags={(value, getTagProps) =>
                                  value.map((option, index) => (
                                    <Chip
                                      variant="outlined"
                                      label={option.userState}
                                      {...getTagProps({ index })}
                                    />
                                  ))
                                }
                                name="userState"
                                value={values.userState}
                                onChange={handleAutoCompleteChangeState}
                                onBlur={handleBlur}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    name="userState"
                                    variant="outlined"
                                    label={"State / Province"}
                                    placeholder={"State"}
                                  />
                                )}
                              />
                            </Grid>
                            {otherState && (
                              <Grid
                                item
                                md={2}
                                xs={12}
                                style={{ alignSelf: "center" }}
                              >
                                {!viweOnly && (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ width: "160px" }}
                                    onClick={handleClickOpenState}
                                  >
                                    <AddCircleIcon
                                      className={"btnRightDetails"}
                                    />
                                    {"Add"}
                                  </Button>
                                )}
                              </Grid>
                            )}

                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Address"}
                                name="vendorAddress"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                value={values.vendorAddress}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid>
                          </Grid>
                        </TabPanel>

                        <TabPanel value="2">
                          <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Avatar
                                  src={values.vendorLogo}
                                  className={classes.large}
                                />
                                <br />
                                <label
                                  htmlFor="userimage"
                                  className={"labelleft"}
                                >
                                  <input
                                    style={{ display: "none" }}
                                    id="userimage"
                                    name="userimage"
                                    type="file"
                                    onChange={handleUserImageChange}
                                    onBlur={handleBlur}
                                  />
                                  <Fab
                                    color="primary"
                                    size="small"
                                    component="span"
                                    aria-label="add"
                                    variant="extended"
                                  >
                                    <AddIcon /> {"Upload"}
                                  </Fab>
                                </label>
                              </div>
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Company Name"}
                                name="vendorCompanyName"
                                onChange={handleDateChange}
                                onBlur={handleBlur}
                                required
                                value={values.vendorCompanyName}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Establishment Year"}
                                name="vendorEstablishmentYear"
                                onChange={handleDateChange}
                                onBlur={handleBlur}
                                required
                                value={values.vendorEstablishmentYear}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Estimate Revenue"}
                                name="vendorEstimateRevenue"
                                onChange={handleDateChange}
                                onBlur={handleBlur}
                                required
                                value={values.vendorEstimateRevenue}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Funding"}
                                name="vendorFunding"
                                onChange={handleDateChange}
                                onBlur={handleBlur}
                                required
                                value={values.vendorFunding}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Fund Year"}
                                name="vendorFundYear"
                                onChange={handleDateChange}
                                onBlur={handleBlur}
                                required
                                value={values.vendorFundYear}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Employee Size"}
                                name="vendorEmployeeSize"
                                onChange={handleDateChange}
                                onBlur={handleBlur}
                                required
                                value={values.vendorEmployeeSize}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Website Link"}
                                name="vendorWebsite"
                                onChange={handleDateChange}
                                onBlur={handleBlur}
                                required
                                value={values.vendorWebsite}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid>

                            <Grid item md={12} xs={12}>
                              <TextField
                                fullWidth
                                id="outlined-textarea"
                                label={"Company Description ... "}
                                name="vendorDescription"
                                onChange={handleDateChange}
                                onBlur={handleBlur}
                                required
                                value={values.vendorDescription}
                                disabled={viweOnly}
                                variant="outlined"
                                minRows="5"
                                multiline
                                inputProps={{ className: classes.textarea }}
                              />
                            </Grid>
                          </Grid>
                        </TabPanel>
                      </TabContext>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </form>
            <AlertDialog
              alertDialog={alertDialog}
              setAlertDialog={setAlertDialogfunc}
            />
            <ConfirmDialog
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
            />
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={open}
              TransitionComponent={TransitionUp}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert severity="error">
                {"Please fill all required field."}
              </Alert>
            </Snackbar>
          </Container>

          {/* --------------------COUNTRY OPEN POPUP ----------------------------- */}
          <CountryDialog open={openCountry} onClose={handleClickCloseCountry} />
          {/* ----------------------------------------------------------- */}

          {/* --------------------STATE OPEN POPUP ----------------------------- */}
          <StateDialog
            open={openState}
            onClose={handleClickCloseState}
            viweOnly={viweOnly}
            selectedCountry={values.userCountry}
          />
          {/* ----------------------------------------------------------- */}
        </Page>
      )}
      {!backPage && <VendorList />}
    </div>
  );
};

AddVendor.propTypes = {
  className: PropTypes.string,
};

export default AddVendor;
