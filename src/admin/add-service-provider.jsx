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
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
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
import ServiceProviderList from "./service-provider-list";
import CountryDialog from "../popup/CountryDialog";
import StateDialog from "../popup/StateDialog";

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

const AddServiceProvider = ({
  currentUserId,
  viweOnly,
  className,
  redirectBack,
  providerDetails,

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
    providerEmail: "",
    providerContact: "",
    providerAddress: "",
    userCountry: "",
    userState: "",
    providerLogo: "",
    providerCompanyName: "",
    providerEstablishmentYear: "",
    providerEstimateRevenue: "",
    providerFunding: "",
    providerFundYear: "",
    providerEmployeeSize: "",
    providerWebsite: "",
    providerDescription: "",
  });

  const [previousValues, setPreviousValues] = useState({
    // vendorName: "",
    providerEmail: "",
    providerContact: "",
    providerAddress: "",
    userCountry: "",
    userState: "",
    providerCompanyName: "",
    providerEstablishmentYear: "",
    providerEstimateRevenue: "",
    providerFunding: "",
    providerFundYear: "",
    providerEmployeeSize: "",
    providerWebsite: "",
    providerDescription: "",
  });

  const handleTabChange = (event, newValue) => {
    // console.log("VALUE :: ", newValue);
    // setTabValue(newValue);

    if (newValue === "1") {
      console.log("newValue HER :: ", newValue);
      setTabValue(newValue);
    }

    if (newValue === "2") {
      console.log("newValue :: ", newValue);

      if (
        values.providerEmail &&
        values.providerContact &&
        values.userCountry &&
        values.userState &&
        values.providerAddress
      ) {
        setTabValue(newValue);
      } else {
        let tempTabvalue = "1";
        setTabValue(tempTabvalue);
        if (values.providerEmail == "") {
          setAlertDialog({
            isOpen: true,
            title: "Please Enter Provider Email ",
          });
        } else if (values.providerContact == "") {
          setAlertDialog({
            isOpen: true,
            title: "Please Enter Provider Contact ",
          });
        } else if (values.userCountry == "") {
          setAlertDialog({
            isOpen: true,
            title: "Please Enter Provider Country ",
          });
        } else if (values.userState == "") {
          setAlertDialog({
            isOpen: true,
            title: "Please Enter Provider State ",
          });
        } else if (values.providerAddress == "") {
          setAlertDialog({
            isOpen: true,
            title: "Please Enter Provider Address ",
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
    // console.log("currentUserId :: ", providerDetails);
    userRole = localStorage.getItem("userRole");
    userEmail = localStorage.getItem("userEmail");


    if (currentUserId) {

      let tempSpEmail = "";

      if(userRole === "SERVICE_PROVIDER" ) {
        tempSpEmail = userEmail
      }
  
      if(userRole === "ADMIN"){
        tempSpEmail = providerDetails.user_email
      }


      setValues({
        ...values,
        providerEmail: tempSpEmail,
        providerContact: providerDetails.contact_no,
        providerAddress: providerDetails.address,
        userCountry: providerDetails.country_name,
        userState: providerDetails.state_name,
        providerLogo: providerDetails.logo,
        providerCompanyName: providerDetails.company_name,
        providerEstablishmentYear: providerDetails.establishment_year,
        providerEstimateRevenue: providerDetails.estimate_revenue,
        providerFunding: providerDetails.funding,
        providerFundYear: providerDetails.fund_year,
        providerEmployeeSize: providerDetails.employee_size,
        providerWebsite: providerDetails.website_link,
        providerDescription: providerDetails.company_description,
      });

      if(providerDetails.country_name){
        getStateList(providerDetails.country_name)
      }
    } else {
      let tempProviderEmail = "";

      if(userRole === "SERVICE_PROVIDER" ) {
        tempProviderEmail = userEmail
      }
  
      if(userRole === "ADMIN"){
        tempProviderEmail = values.providerEmail
      }
      setValues({
        ...values,
        providerEmail: tempProviderEmail
      })
    }

    getUserListData();
    getCountryList();

    // //--------------COUNTRY --------------------
    // let finalArray = []
    // let myArray = {
    //   // incidentState: t("option_others")
    //   userCountry: "Others"
    // }

    // finalArray.push(myArray);
    // console.log("finalArray after :: ", finalArray);

    // setCountryArray(finalArray);

    // const token = localStorage.getItem("token");

    // axios.post(Config.serverUrl + "caseProvince/details/caseprovince", {
    //   headers: {
    //     "x-access-token": token
    //   },
    //   token: token
    // })
    // .then(res => {
    //   let finalArray = res.data.details
    //   let myArray = {
    //     // incidentState: t("option_others")
    //     userCountry: "Others"
    //   }

    //   finalArray.push(myArray);
    //   console.log("finalArray after :: ", finalArray);

    //   setCountryArray(finalArray);

    // })
    // .catch(err => {
    //   console.log("Error Occured", err);
    // });

    //--------------STATE --------------------

    // axios.post(Config.serverUrl + "caseProvince/details/caseprovince", {
    //   headers: {
    //     "x-access-token": token
    //   },
    //   token: token
    // })
    // .then(res => {
    //   let finalArray = res.data.details
    //   console.log("finalArray after :: ", finalArray);

    //   setStateArray(finalArray);

    // })
    // .catch(err => {
    //   console.log("Error Occured", err);
    // });
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
          if (name.user_role === "SERVICE_PROVIDER") {
            tempArray.push({
              providerEmail: name.user_email,
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
      console.log("CASE TYPE :: ", event.target.value);
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

    if (event.target.name === "providerEmail") {
      console.log("CASE TYPE :: ", event.target.value);
      if (event.target.value === "") {
        setValues({
          ...values,
          providerEmail: "",
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
            userState: ""
          });
          setOtherCountry(false);
        } else {
          setValues({
            ...values,
            userCountry: value.userCountry,
            userState: ""
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
        providerEmail: "",
      });
    } else {
      if (value.providerEmail === "") {
        setValues({
          ...values,
          providerEmail: "",
        });
      } else {
        let providerData = userListArray.filter(
          (provider) => provider.providerEmail === value.providerEmail
        );
        setValues({
          ...values,
          providerEmail: value.providerEmail,
          userId: providerData[0].userId,
        });
        // handleCountryWiseState(value.userState);
      }
    }
  };

  const handleUserImageChange = (e) => {
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
          providerLogo: url,
        });

        console.log(`url`, url);
      });
    }
  };

  const onUpdateDetails = () => {
    // alert("SERVICE PROVIDER ADDED")
    setSpin(true);
    // if (!currentUserId) {
    // alert("Provider ADDED");
    if (values.providerEmail == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Provider Email ",
      });
    } else if (values.providerContact == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Provider Contact ",
      });
    } else if (values.userCountry == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Provider Country ",
      });
    } else if (values.userState == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Provider State ",
      });
    } else if (values.providerAddress == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Provider Address ",
      });
    } else if (values.providerLogo == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Provider Logo ",
      });
    } else if (values.providerCompanyName == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Provider Company Name ",
      });
    } else if (values.providerEstablishmentYear == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Provider Establishment Year",
      });
    } else if (values.providerEstimateRevenue == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Provider Establishment Revenue",
      });
    } else if (values.providerFunding == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Provider Funding",
      });
    } else if (values.providerFundYear == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Provider Fund Year",
      });
    } else if (values.providerEmployeeSize == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Size Of Employee",
      });
    } else if (values.providerWebsite == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Provider Website",
      });
    } else if (values.providerDescription == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Provider Description",
      });
    } else {
      let providerTempId = "";
      

      if (currentUserId) {
        if(userRole === "SERVICE_PROVIDER"){
          providerTempId = localStorage.getItem("userId")
        } else {
          providerTempId = providerDetails.user_id;
        }
      } else {
        if(userRole === "SERVICE_PROVIDER"){
          providerTempId = localStorage.getItem("userId")
        } else {
          providerTempId = values.userId;
        }
      }

      

      const token = localStorage.getItem("token");
      if (!currentUserId) {
        
        let detailObj = {
          userId: providerTempId,
          contactNo: values.providerContact,
          countryName: values.userCountry,
          stateName: values.userState,
          address: values.providerAddress,
          logo: values.providerLogo,
          companyName: values.providerCompanyName,
          establishmentYear: parseInt(values.providerEstablishmentYear),
          estimateRevenue: values.providerEstimateRevenue,
          funding: values.providerFunding,
          fundYear: parseInt(values.providerFundYear),
          employeeSize: parseInt(values.providerEmployeeSize),
          websiteLink: values.providerWebsite,
          companyDescription: values.providerDescription,
        }
        axios
          .post(`${Config.serverUrl}admin/createServiceProvider`, detailObj, {
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
          id: providerDetails.id,
          userId: providerTempId,
          contactNo: values.providerContact,
          countryName: values.userCountry,
          stateName: values.userState,
          address: values.providerAddress,
          logo: values.providerLogo,
          companyName: values.providerCompanyName,
          establishmentYear: parseInt(values.providerEstablishmentYear),
          estimateRevenue: values.providerEstimateRevenue,
          funding: values.providerFunding,
          fundYear: parseInt(values.providerFundYear),
          employeeSize: parseInt(values.providerEmployeeSize),
          websiteLink: values.providerWebsite,
          companyDescription: values.providerDescription,
        }
        axios
          .post(`${Config.serverUrl}admin/updateServiceProvider`, detailObj, {
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
    // } else {
    //   // if ( values.vendorName && values.caseType ) {
    //   //   setSpin(false);
    //   //   setBackPage(false);
    //   // } else {
    //   //   if (values.vendorName == "") {
    //   //     setAlertDialog({
    //   //       isOpen: true,
    //   //       title: "Please add vendor name"
    //   //     });
    //   //   }
    //   // }
    // }
  };

  return (
    <div>
      {backPage && (
        <Page className={classes.root} title={"Add New Service Provider"}>
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
                    {"Service Provider Form"}
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
                            {userRole === "SERVICE_PROVIDER" &&
                              <Grid item md={6} xs={12}>
                                <TextField
                                  fullWidth
                                  label={"Email"}
                                  name="providerEmail"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  required
                                  value={values.providerEmail}
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
                                    option.providerEmail || values.providerEmail
                                  }
                                  // defaultValue={}
                                  filterSelectedOption
                                  disabled={viweOnly}
                                  renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                      <Chip
                                        variant="outlined"
                                        label={option.providerEmail}
                                        {...getTagProps({ index })}
                                      />
                                    ))
                                  }
                                  name="providerEmail"
                                  value={values.providerEmail}
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
                                name="providerContact"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                value={values.providerContact}
                                disabled={viweOnly}
                                variant="outlined"
                                type="Number"
                              />
                            </Grid>

                            <Grid item md={otherCountry ? 4 : 6} xs={12}>
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
                                name="providerAddress"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                value={values.providerAddress}
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
                                  src={values.providerLogo}
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
                                name="providerCompanyName"
                                onChange={handleDateChange}
                                onBlur={handleBlur}
                                required
                                value={values.providerCompanyName}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Establishment Year"}
                                name="providerEstablishmentYear"
                                onChange={handleDateChange}
                                onBlur={handleBlur}
                                required
                                value={values.providerEstablishmentYear}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Estimate Revenue"}
                                name="providerEstimateRevenue"
                                onChange={handleDateChange}
                                onBlur={handleBlur}
                                required
                                value={values.providerEstimateRevenue}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Funding"}
                                name="providerFunding"
                                onChange={handleDateChange}
                                onBlur={handleBlur}
                                required
                                value={values.providerFunding}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Fund Year"}
                                name="providerFundYear"
                                onChange={handleDateChange}
                                onBlur={handleBlur}
                                required
                                value={values.providerFundYear}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Employee Size"}
                                name="providerEmployeeSize"
                                onChange={handleDateChange}
                                onBlur={handleBlur}
                                required
                                value={values.providerEmployeeSize}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Website Link"}
                                name="providerWebsite"
                                onChange={handleDateChange}
                                onBlur={handleBlur}
                                required
                                value={values.providerWebsite}
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
                                name="providerDescription"
                                onChange={handleDateChange}
                                onBlur={handleBlur}
                                required
                                value={values.providerDescription}
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
      {!backPage && <ServiceProviderList />}
    </div>
  );
};

AddServiceProvider.propTypes = {
  className: PropTypes.string,
};

export default AddServiceProvider;
