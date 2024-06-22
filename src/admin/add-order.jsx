/* eslint-disable */

import React, { useState, useEffect } from "react";
import firebase from '../firebase';
import clsx from "clsx";
import PropTypes from "prop-types";
import AlertDialog from "../popup/AlertDialog";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
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
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
// import logoImg from "../images/cyberLogo.png";

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
  Divider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
// import LanguageSelector from "../LanguageSelector";
import OrderList from "./order-list";
import Config from "../common/utils/base-urls";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
  },
  formControl: {
    width: "100%",
    variant: "outlined",
    marginTop: "5px",
    marginBottom: "5px",
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

const objToCheck = [];

let tmpPriceVal = 0;
let tmpArray = [];
let tempFromVal = 0;
let tempToVal = 0;

let tempInvoiceCount = 0;
let orderCountDoc = '';

let prodDetailArray = [];
let useEffProdArray = [];


const AddOrder = ({
  currentUserId,
  viweOnly,
  className,
  redirectBack,
  orderDetails,
  ...rest
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [productListArray, setProductListArray] = useState([]);
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
  const [values, setValues] = useState({
    clientName: '',
    clientContact: 0,
    // clientCity: '',
    // clientState: '',
    order_date: '',
    depositAmmount: 0
  });



  const FeildNameForProduct = {
    productName: [],
    productQty: 0,
    productPrice: 0,
    unitPrice: 0,
    fromDate: '',
    toDate: '',
    totalDays: 0,
    totalRent: 0,
  }

  const [additionalProd, setAdditionalProd] = useState([FeildNameForProduct]);
  const [totalRentValue, setTotalRentValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    // console.log("VALUE :: ", newValue);
    setTabValue(newValue);
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

    if (currentUserId) {
      console.log("currentUserId :: ", orderDetails);


      setValues({
        ...values,
        clientName: orderDetails.clientName,
        clientContact: orderDetails.clientContact,
        // clientCity: orderDetails.clientCity,
        // clientState: orderDetails.clientState,
        order_date: moment(new Date(orderDetails.order_date)).format('YYYY-MM-DD'),
        depositAmmount: orderDetails.depositAmmount
      })


      let dummyArray = orderDetails.productList;

      console.log('dummyArray : ', dummyArray)
      useEffProdArray = [];
      dummyArray.map((val, ind) => {


        useEffProdArray.push({
          fromDate: moment(new Date(val.fromDate)).format('YYYY-MM-DD'),
          toDate: moment(new Date(val.toDate)).format('YYYY-MM-DD'),
          totalDays: val.totalDays,
          productPrice: val.productPrice,
          productQty: val.productQty,
          unitPrice: val.unitPrice,
          productName: val.productName,
          totalRent: val.totalRent

        })

      })



      setAdditionalProd(useEffProdArray);
      
      setTotalRentValue(orderDetails.orderTotalAmmount)

    }

    fetchProductData()


  }, []);

  const fetchProductData = () => {
    const database = firebase.firestore();
    let tempDb = database.collection('product-list');
    tempDb.get().then(function (dataSnap) {
      // console.log('GET DATA :: ', dataSnap);
      let tempObj = [];
      dataSnap.forEach(function (doc) {
        let docData = doc.data();
        tempObj.push(docData);
      });
      // console.log('DOC Data again :: ', tempObj);
      setProductListArray(tempObj)

    });
  }

  const handleBlur = (event) => {

  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    //console.log('caseDetails', values)
  };


  const handleChangeProduct = (event, index) => {

    let tmpName = event.target.name;
    let tmpValue = event.target.value;

    tmpArray = [];
    if (tmpName === 'productName') {

      tmpArray = [...additionalProd]
      tmpArray[index][tmpName] = tmpValue;

      tmpArray[index].productPrice = 0;
      tmpArray[index].productQty = 0;
      tmpArray[index].fromDate = '';
      tmpArray[index].toDate = '';
      tmpArray[index].totalDays = 0;
      tmpArray[index].totalRent = 0;
      tempFromVal = 0;
      tempToVal = 0;

    }else if (tmpName === 'productPrice') {
      tmpArray = [...additionalProd]
      tmpArray[index][tmpName] = tmpValue;

      tmpArray[index].productQty = 0;
      tmpArray[index].fromDate = '';
      tmpArray[index].toDate = '';
      tmpArray[index].totalDays = 0;
      tmpArray[index].totalRent = 0;
      tempFromVal = 0;
      tempToVal = 0;
    } else {
      tmpArray = [...additionalProd]
      tmpArray[index][tmpName] = tmpValue;
    }

    if (tmpName === 'productQty') {

      if (event.target.value > 0) {
        // console.log("HERE :: ", additionalProd[index].productPrice);
        
        tmpPriceVal = (event.target.value * additionalProd[index].productPrice);
        // console.log("tmpPriceVal :: ", tmpPriceVal);
        tmpArray[index].unitPrice = additionalProd[index].productPrice;
       
      }

    }

    if (tmpName === 'fromDate') {
      tempFromVal = new Date(tmpValue).getTime();
    }

    if (tmpName === 'toDate') {
      tempToVal = new Date(tmpValue).getTime();
    }

    if (tempFromVal && tempToVal) {

      let differenceInTime = tempToVal - tempFromVal;
      let differenceInDays = differenceInTime / (1000 * 3600 * 24);

      // console.log("DAY :: ", differenceInDays);

      tmpArray[index].totalDays = differenceInDays;

      tmpArray[index].totalRent = (tmpPriceVal * differenceInDays);
    }

    let tmp_total_selected_rent = 0;

    for (let i = 0; i < tmpArray.length; i++) {
      tmp_total_selected_rent += parseFloat(tmpArray[i].totalRent);
    }

    // console.log('tmpArray :: ', tmpArray);

    setAdditionalProd(tmpArray);
    setTotalRentValue(tmp_total_selected_rent)

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


  const getObject = (item) => {
    objToCheck.splice(0, 1, { ...item });
  };

  const onAddMoreDetails = () => {

    if (additionalProd.length > 0) {
      checkAllFeilds(objToCheck[0])
        ? addNewOne()
        : alert('Please filed all the details .');

    } else {
      alert('Please filed all the details.');
    }

  }

  const addNewOne = () => {

    tmpPriceVal = 0;
    tmpArray = [];
    tempFromVal = 0;
    tempToVal = 0;

    let newfeild = { ...FeildNameForProduct };
    setAdditionalProd([...additionalProd, newfeild])

  }

  const checkAllFeilds = (objectOfLastForm) => {
    let key = Object.values(objectOfLastForm)
    // console.log('objectOfLastForm :: ', objectOfLastForm);
    if (key.length === 0) {
      return false
    }
    for (let i = 0; i < key.length; i++) {
      if (key[i] === '' || key[i] === 0) {
        return false
      }
    }
    return true
  }

  // let updatedRemoveList = [];
  // let list = []

  // const onRemoveMoreDetails = (e, index) => {
  //   console.log('additionalProd FIRST: ', additionalProd);
  //   console.log('IN: ', index);

  //   list = [...additionalProd];
  //   updatedRemoveList = list.filter((_, i) => i !== index);
  //   console.log('updatedRemoveList :: ', updatedRemoveList);
  //   setAdditionalProd(updatedRemoveList)
  // }




  const onUpdateDetails = () => {
    console.log('additionalProd :: ', additionalProd);
    console.log('values :: ', values);

    setSpin(true);

    let tmpUserId = localStorage.getItem('userId');
    let tmpEmail = localStorage.getItem('email');

    if (values.clientName == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Name.",
      });
    } else if (values.clientContact == "") {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Contact No.",
      });
    }
    // else if (values.clientCity == "") {
    //   setSpin(false);
    //   setAlertDialog({
    //     isOpen: true,
    //     title: "Please Enter City",
    //   });
    // } else if (values.clientState == "") {
    //   setSpin(false);
    //   setAlertDialog({
    //     isOpen: true,
    //     title: "Please Enter State.",
    //   });
    // } 
    else if (additionalProd.length === 0) {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Select Product and Its Qty.",
      });
    } else if (values.order_date === '') {
      setSpin(false);
      setAlertDialog({
        isOpen: true,
        title: "Please Enter Date.",
      });
    } else {

      if (!currentUserId) {

        // const database = firebase.firestore();
        // let tempDb = database.collection('order-count');
        // tempDb.get().then(function (dataSnap) {
        //   tempInvoiceCount = 0;
        //   dataSnap.forEach(function (doc) {
        //     let docData = doc.data();
        //     console.log('docData Count :: ', docData);
        //     tempInvoiceCount = (parseInt(docData.invoiceNo) + 1);
        //     console.log("COUNR :: ", tempInvoiceCount);

        //   });

        prodDetailArray = [];

        additionalProd.map((val, ind) => {
          prodDetailArray.push({
            fromDate: new Date(val.fromDate).getTime(),
            toDate: new Date(val.toDate).getTime(),
            totalDays: val.totalDays,
            productPrice: val.productPrice,
            productQty: val.productQty,
            unitPrice: val.unitPrice,
            productName: val.productName,
            totalRent : val.totalRent
          })

          if (ind === additionalProd.length - 1) {
            saveOrderData(tmpUserId, tmpEmail)
          }
        })
        // console.log("OO >> ", prodDetailArray)

        // });


      } else {

        console.log("totalRentValue :: ", totalRentValue);

        const detailObj = {
          userId: tmpUserId,
          userEmail: tmpEmail,
          clientName: values.clientName,
          clientContact: values.clientContact,
          // clientCity: values.clientCity,
          // clientState: values.clientState,
          order_date: new Date(values.order_date).getTime(),
          productList: additionalProd,
          depositAmmount: values.depositAmmount,
          orderTotalAmmount : totalRentValue
        };

        let firestoreData = firebase.firestore();
        firestoreData.collection("order-list").doc(currentUserId).update(detailObj).then(() => {
          // alert("User Status Updated !");
          setValues({
            ...values,
            clientName: "",
            clientContact: "",
            // clientCity: "",
            // clientState: "",
            order_date: "",
            depositAmmount: ""
          })

          setAdditionalProd([FeildNameForProduct])

          setAlertDialog({
            isOpen: true,
            title: "Order update successfully",
          });

          setBackPage(false);

        })

      }
    }
  };

  const saveOrderData = (tmpUserId, tmpEmail) => {



    const detailObj = {
      userId: tmpUserId,
      userEmail: tmpEmail,
      clientName: values.clientName,
      clientContact: values.clientContact,
      order_date: new Date(values.order_date).getTime(),
      productList: prodDetailArray,
      depositAmmount: values.depositAmmount,
      orderTotalAmmount : totalRentValue
    };

    console.log("OBJ :: ", detailObj);

    let firestoreData = firebase.firestore();
    firestoreData.collection("order-list").add(detailObj).then((docRef) => {

      orderCountDoc = 'II7rySKg8MJRPpZCsrm9';

      setValues({
        ...values,
        clientName: "",
        clientContact: "",
        // clientCity: "",
        // clientState: "",
        order_date: "",
        depositAmmount: ""
      })

      setAdditionalProd([FeildNameForProduct])

      setAlertDialog({
        isOpen: true,
        title: "Order added successfully",
      });

      setBackPage(false);

    }).catch(error => {
      alert("Error is ", error);
    })

  }

  return (
    <div>
      {backPage && (
        <Page className={classes.root} title={"Add New Order"}>
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
                    {"Order Form"}
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
                    onClick={() => { onUpdateDetails(); }}
                  >
                    <AddCircleIcon className={"btnRightDetails"} />
                    {currentUserId ? "Update" : "Add"}
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
                              <Tab label={"Details"} value="1" />
                            </TabList>
                          </ThemeProvider>
                        </AppBar>

                        <TabPanel value="1">
                          <Grid container spacing={3}>

                            <Grid item md={4} xs={12}>
                              <TextField
                                fullWidth
                                label={"Name"}
                                name="clientName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                value={values.clientName}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid>

                            <Grid item md={4} xs={12}>
                              <TextField
                                fullWidth
                                label={"Contact No."}
                                name="clientContact"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                value={values.clientContact}
                                disabled={viweOnly}
                                variant="outlined"
                                type="number"
                              />
                            </Grid>

                            {/* <Grid item md={2} xs={12}>
                              <TextField
                                fullWidth
                                label={"City"}
                                name="clientCity"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                value={values.clientCity}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid> */}

                            {/* <Grid item md={2} xs={12}>
                              <TextField
                                fullWidth
                                label={"State"}
                                name="clientState"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                value={values.clientState}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
                              />
                            </Grid> */}

                            <Grid item md={4} xs={12}>
                              <TextField
                                id="Date"
                                label="Order Date"
                                type="date"
                                value={values.order_date}
                                defaultValue={values.order_date}
                                name="order_date"
                                onChange={handleChange}
                                InputLabelProps={{
                                  shrink: true
                                }}
                                variant="outlined"
                                style={{
                                  width: '100%',
                                  marginLeft: '0',
                                  marginRight: '0'
                                }}
                              />
                            </Grid>

                          </Grid>

                          <div>
                            {additionalProd.map((item, index) => {
                              getObject(item);
                              return (
                                <div
                                  style={{
                                    border: '1px solid black',
                                    marginTop: '10px',
                                    paddingRight: '24px'
                                  }}
                                >
                                  <Grid style={{ padding: '10px' }} container spacing={3}>
                                    <Grid item md={3} xs={12}>
                                      <FormControl variant="outlined" fullWidth>
                                        <InputLabel>{'Product Select'}</InputLabel>
                                        <Select
                                          variant="outlined"
                                          fullWidth
                                          required
                                          name="productName"
                                          label="productName"
                                          type="text"
                                          value={additionalProd[index].productName}
                                          onChange={(e) => handleChangeProduct(e, index)}
                                        >
                                          {productListArray.map((x) => {
                                            return (
                                              <MenuItem value={x}>
                                                <Typography>{x.productName}</Typography>
                                              </MenuItem>
                                            );
                                          })}
                                        </Select>
                                      </FormControl>
                                    </Grid>

                                    <Grid item md={3} xs={12}>
                                      <TextField
                                        fullWidth
                                        label={"Price"}
                                        name="productPrice"
                                        onChange={(e) => handleChangeProduct(e, index)}
                                        required
                                        value={additionalProd[index].productPrice}
                                        disabled={viweOnly}
                                        variant="outlined"
                                        type="number"
                                      />
                                    </Grid>

                                    <Grid item md={2} xs={12}>
                                      <TextField
                                        fullWidth
                                        label={"Qty"}
                                        name="productQty"
                                        onChange={(e) => handleChangeProduct(e, index)}
                                        // onBlur={handleBlur}
                                        required
                                        value={additionalProd[index].productQty}
                                        disabled={viweOnly}
                                        variant="outlined"
                                        type="number"
                                      />
                                    </Grid>

                                    <Grid item md={2} xs={12}>
                                      <TextField
                                        id="fromDate"
                                        label="From"
                                        type="date"
                                        value={additionalProd[index].fromDate}
                                        defaultValue={additionalProd[index].fromDate}
                                        name="fromDate"
                                        // onChange={handleChange}
                                        onChange={(e) => handleChangeProduct(e, index)}
                                        InputLabelProps={{
                                          shrink: true
                                        }}
                                        variant="outlined"
                                        style={{
                                          width: '100%',
                                          marginLeft: '0',
                                          marginRight: '0'
                                        }}
                                      />
                                    </Grid>

                                    <Grid item md={2} xs={12}>
                                      <TextField
                                        id="toDate"
                                        label="Return"
                                        type="date"
                                        value={additionalProd[index].toDate}
                                        defaultValue={additionalProd[index].toDate}
                                        name="toDate"
                                        // onChange={handleChange}
                                        onChange={(e) => handleChangeProduct(e, index)}
                                        InputLabelProps={{
                                          shrink: true
                                        }}
                                        variant="outlined"
                                        style={{
                                          width: '100%',
                                          marginLeft: '0',
                                          marginRight: '0'
                                        }}
                                      />
                                    </Grid>

                                    <Grid item md={1} xs={12}>
                                      <TextField
                                        fullWidth
                                        label={"Day's"}
                                        name="totalDays"
                                        onChange={(e) => handleChangeProduct(e, index)}
                                        // onBlur={handleBlur}
                                        required
                                        value={additionalProd[index].totalDays}
                                        disabled={true}
                                        variant="outlined"
                                        type="number"
                                      />
                                    </Grid>

                                    <Grid item md={2} xs={12}>
                                      <TextField
                                        fullWidth
                                        label={"Rent"}
                                        name="totalRent"
                                        onChange={(e) => handleChangeProduct(e, index)}
                                        // onBlur={handleBlur}
                                        required
                                        value={additionalProd[index].totalRent}
                                        disabled={true}
                                        variant="outlined"
                                        type="number"
                                      />
                                    </Grid>

                                    <Grid item md={1} xs={12}>
                                      <Button
                                        color="primary"
                                        variant="contained"
                                        disabled={spin}
                                        onClick={(e) => { onAddMoreDetails(e, index); }}
                                      >
                                        <AddCircleIcon className={"btnRightDetails"} />
                                      </Button>
                                    </Grid>

                                    {/* <Grid item md={1} xs={12}>
                                      <Button
                                        color="primary"
                                        variant="contained"
                                        disabled={spin}
                                        onClick={(e) => { onRemoveMoreDetails(e, index); }}
                                      >
                                        <RemoveCircleIcon className={"btnRightDetails"} />
                                      </Button>
                                    </Grid> */}


                                  </Grid>

                                </div>
                              )
                            }
                            )}
                          </div>

                          <Grid container spacing={3} style={{ marginTop: '5px' }}>
                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Total Ammount"}
                                name="totalRentValue"
                                required
                                value={totalRentValue}
                                disabled={true}
                                variant="outlined"
                                type="number"
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label={"Deposit"}
                                name="depositAmmount"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                value={values.depositAmmount}
                                disabled={viweOnly}
                                variant="outlined"
                                type="text"
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

        </Page>
      )}
      {!backPage && <OrderList />}
    </div>
  );
};


AddOrder.propTypes = {
  className: PropTypes.string,
};

export default AddOrder;
