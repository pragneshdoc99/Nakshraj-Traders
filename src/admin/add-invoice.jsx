/* eslint-disable */

import React, { useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';
import firebase from '../firebase';
import clsx from "clsx";
import PropTypes from "prop-types";
import AlertDialog from "../popup/AlertDialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import ConfirmDialog from "./ConfirmDialog";
import { green, pink } from "@material-ui/core/colors";
import Page from "./page";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useTranslation } from "react-i18next";
// import logoImg from "../images/cyberLogo.png";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import TablePagination from "@material-ui/core/TablePagination";
// import html2pdf from "html2pdf.js";
import logodownload from "../images/NT.png"


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
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
// import LanguageSelector from "../LanguageSelector";
import InvoiceList from "./invoice-list";
import Config from "../common/utils/base-urls";

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import GenerateInvoice from "../GenerateInvoice";

const tablelogoimg = {
  width: "100px",
  height: "100px",
  objectFit: "contain"
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);



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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "90vh",
    overflowY: "auto",
    width: "90%",

  }
}));

`
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




let tempDataArray = [];
let tmpRestAmmount = 0;
let inputValue = 0;
let tempInvoiceCount = 0;
let orderCountDoc = '';
// let myRestDeposit = 0;
let tmp_total_rest_cost = 0;;

const AddInvoice = ({
  currentUserId,
  viweOnly,
  className,
  redirectBack,
  orderDetails,
  ...rest
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [values, setValues] = useState({
    paidAmmount: 0,
    paid_date: '',
    restAmmount: 0,
    // restDeposite: 0
  });

  const [spin, setSpin] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  let [paymentArray, setPaymentArray] = useState([]);

  const [alertDialog, setAlertDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const [backPage, setBackPage] = useState(true);

  let [basicDetails, setBasicDetails] = useState({});
  let [transferObj, setTransferObj] = useState({});
  let [finalList, setFinalList] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalRestCost, setTotalRestCost] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [openModal, setModalOpen] = React.useState(false);



  const setAlertDialogfunc = () => {
    setAlertDialog({
      ...alertDialog,
      isOpen: false,
      title: "",
      subTitle: "",
    });
  };

  useEffect(() => {

    console.log('orderDetailsData :: ', orderDetails);

    setBasicDetails(orderDetails);
    setTotalDeposit(orderDetails.depositAmmount)
    setTotalCost(orderDetails.orderTotalAmmount.toFixed(2))

    tempDataArray = []
    orderDetails.productList.map((val, index) => {

      tempDataArray.push({
        productName: val.productName.productName,
        productPrice: val.totalRent,
        productQty: val.productQty,
        unitPrice: val.unitPrice,
        fromDate: val.fromDate,
        toDate: val.toDate,
        totalDays: val.totalDays
      })

    })

    setFinalList(tempDataArray);
    

    if (currentUserId) {
      checkInvoiceData();
    }



  }, []);

  const checkInvoiceData = async () => {
    try {
      let firestoreData = firebase.firestore();
      let docRef = firestoreData.collection("invoice-list").doc(currentUserId);
      let doc = await docRef.get();

      if (doc.exists) {
        console.log("HERE :: ", doc.data());
        let invoiceObj = doc.data();

        //----INVOICE COUNT ---------
        tempInvoiceCount = invoiceObj.invoiceNo;

        let tempObj = [];
        tempObj = invoiceObj.paymentDetails;
        let finalObjData = tempObj.sort((a, b) => b.paidDate - a.paidDate);

        setPaymentArray(finalObjData)

        tmp_total_rest_cost = 0;
        for (let i = 0; i < invoiceObj.paymentDetails.length; i++) {
          tmp_total_rest_cost += parseFloat(invoiceObj.paymentDetails[i].paidAmmount);
        }

        let myFinalRest = (orderDetails.orderTotalAmmount - tmp_total_rest_cost)

        setTotalRestCost(myFinalRest.toFixed(2))


        let calA = (tmp_total_rest_cost + parseFloat(invoiceObj.depositAmmount));

        let fianlVal = 0;

        if (calA > parseFloat(orderDetails.orderTotalAmmount)) {

          fianlVal = (calA - orderDetails.orderTotalAmmount.toFixed(2))


        } else {
          fianlVal = (orderDetails.orderTotalAmmount.toFixed(2) - calA)

        }

        setValues({
          ...values,
          // restDeposite: fianlVal,
          restAmmount: myFinalRest
        })


      } else {
        newInvoiceDataFun()
      }
    } catch (error) {
      console.error('Error checking document:', error);
    }
  };



  const newInvoiceDataFun = () => {

    //----INVOICE COUNT INCRESE ---------
    const database = firebase.firestore();
    let tempDb = database.collection('order-count');
    tempDb.get().then(function (dataSnap) {
      tempInvoiceCount = 0;
      dataSnap.forEach(function (doc) {
        let docData = doc.data();
        // console.log('docData Count :: ', docData);
        tempInvoiceCount = (parseInt(docData.invoiceNo) + 1);
        console.log("COUNR :: ", tempInvoiceCount);

      });

      let tmp_total_rest_cost_new = 0;


      let myFinalRest = (orderDetails.orderTotalAmmount - tmp_total_rest_cost_new)

      setTotalRestCost(myFinalRest.toFixed(2))

      setValues({
        ...values,
        // restDeposite: fianlVal,
        restAmmount: orderDetails.orderTotalAmmount
      })


    })

  }


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


  const onUpdateDetails = () => {
    // console.log('values :: ', values);
    // console.log('totalCost :: ', totalCost);
    // console.log('basicDetails :: ', basicDetails);



    setSpin(true);

    if (!values.paidAmmount) {
      setSpin(false);

      // myRestDeposit = values.restDeposite;

      commonSaveDataFun(paymentArray)
    } else {
      if (values.paid_date === "") {
        setSpin(false);
        setAlertDialog({
          isOpen: true,
          title: "Please Select Paid Date from the DropDown.",
        });
      } else {

        // console.log("basicDetails.depositAmmount :: ", basicDetails.depositAmmount);
        // console.log("totalCost :: ", totalCost);

        let temp_paid_date = new Date(values.paid_date).getTime();

        // myRestDeposit = (values.restDeposite + values.paidAmmount);


        paymentArray.push({
          paidAmmount: values.paidAmmount,
          restAmmount: values.restAmmount,
          // restDeposite: myRestDeposit,
          paidDate: temp_paid_date
        })

        let tmp_total_cost = 0;



        commonSaveDataFun(paymentArray)
      }
    }
  };

  const commonSaveDataFun = (paymentArray) => {


    // console.log('myRestDeposit :: ', values.restAmmount);

    const detailObj = {
      userId: basicDetails.userId,
      userEmail: basicDetails.userEmail,
      clientName: basicDetails.clientName,
      clientContact: basicDetails.clientContact,
      // clientCity: basicDetails.clientCity,
      // clientState: basicDetails.clientState,
      order_date: new Date(basicDetails.order_date).getTime(),
      productList: basicDetails.productList,
      totalBillAmmount: totalCost,
      restBillAmmount: values.restAmmount,
      // restBillDeposite: myRestDeposit,
      paymentDetails: paymentArray,
      invoiceNo: tempInvoiceCount.toString(),
      depositAmmount: basicDetails.depositAmmount
    };

    // console.log("detailObj :: ", detailObj);


    saveInvoiceDataFun(detailObj)
  }

  const saveInvoiceDataFun = async (detailObj) => {

    let firestoreData = firebase.firestore();
    let docRef = firestoreData.collection("invoice-list").doc(currentUserId);
    let doc = await docRef.get();

    if (doc.exists) {

      commonUpdateInvoiceData(detailObj)
    } else {
      console.log("NEW USER");

      orderCountDoc = 'II7rySKg8MJRPpZCsrm9';

      const orderCountObj = {
        invoiceNo: tempInvoiceCount.toString()
      }

      firestoreData.collection("order-count").doc(orderCountDoc).update(orderCountObj).then(() => {
        commonUpdateInvoiceData(detailObj)
      })
    }

  }

  const commonUpdateInvoiceData = (detailObj) => {

    let firestoreData = firebase.firestore();
    firestoreData.collection("invoice-list").doc(currentUserId).set(detailObj).then(() => {
      // alert("User Status Updated !");

      setTransferObj(detailObj);

      setValues({
        ...values,
        paidAmmount: 0,
        paid_date: "",
        restAmmount: 0,
        restDeposite: 0
      })

      // setAlertDialog({
      //   isOpen: true,
      //   title: "Order update successfully",
      // });

      paymentArray = []

      setSpin(false);
      setModalOpen(true);
      // setBackPage(false);

    })
  }


  const handleModalClose = () => {
    setModalOpen(false);
    setBackPage(false);
  };



  const handleChange = (event) => {


    if (event.target.name === "paidAmmount") {


      inputValue = parseFloat(event.target.value);
      if (inputValue <= totalRestCost) {

        tmpRestAmmount = (totalRestCost - inputValue);
      } else {

        if (inputValue) {
          inputValue = 0;
          tmpRestAmmount = 0;
        }


      }

      setValues({
        ...values,
        paidAmmount: inputValue,
        restAmmount: tmpRestAmmount
      });


    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    }

  };

  const classesForModal = useStyles();

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
                    {"Generate Invoice Form"}
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
                    {currentUserId ? "Generate" : "Add"}
                  </Button>
                )}
              </Box>
              <hr />
              <div className="overflowform">
                <Card style={{ minHeight: "500px", marginBottom: "20px" }}>
                  <CardContent>

                    <Grid container sm={12} md={12} direction="column">
                      <Grid
                        item
                        sm={12}
                        md={12}
                        style={{
                          display: 'block',
                          margin: '40px'
                        }}
                      >
                        <Table className={classes.table} aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell colSpan={8} style={{ backgroundColor: "transparent" }} align="center">
                                <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                                  <p style={{ fontSize: "20px", margin: "15px", color: '#000000' }}>{'Customer Name :: ' + basicDetails.clientName}</p>
                                  <p style={{ fontSize: "20px", margin: "15px", color: '#000000' }}>{'Contact No. :: ' + basicDetails.clientContact}</p>
                                  <p style={{ fontSize: "20px", margin: "15px", color: '#000000' }}>{'Order On :: ' + new Date(basicDetails.order_date).toDateString()}</p>
                                </div>
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell align="left">Sr No</StyledTableCell>
                              <StyledTableCell align="left">Item</StyledTableCell>
                              <StyledTableCell align="left">QTY</StyledTableCell>
                              <StyledTableCell align="left">Rate</StyledTableCell>
                              <StyledTableCell align="left">From</StyledTableCell>
                              <StyledTableCell align="left">To</StyledTableCell>
                              <StyledTableCell align="left">Day's</StyledTableCell>
                              <StyledTableCell align="right">Total</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {finalList.map((row, index) => (
                              <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row" align="left">
                                  {index + 1}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.productName}</StyledTableCell>
                                <StyledTableCell align="left">{row.productQty}</StyledTableCell>
                                <StyledTableCell align="left">{row.unitPrice}</StyledTableCell>
                                <StyledTableCell align="left">{moment(new Date(row.fromDate)).format('DD/MM/YYYY')}</StyledTableCell>
                                <StyledTableCell align="left">{moment(new Date(row.toDate)).format('DD/MM/YYYY')}</StyledTableCell>
                                <StyledTableCell align="left">{row.totalDays}</StyledTableCell>
                                <StyledTableCell align="right">{row.productPrice}</StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="left">Total Ammount</StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="right">{totalCost}</StyledTableCell>
                            </TableRow>

                            <TableRow>
                              <StyledTableCell align="left">Rest Ammount</StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="right">{totalRestCost}</StyledTableCell>
                            </TableRow>

                            <TableRow>
                              <StyledTableCell align="left">Deposit</StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="right">{totalDeposit}</StyledTableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item md={3} xs={12}>
                        <Typography variant="h6" style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                          {"Paid Ammount :: "}
                        </Typography>
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <TextField
                          fullWidth
                          label={"Ammount"}
                          name="paidAmmount"
                          onChange={handleChange}
                          required
                          value={values.paidAmmount}
                          variant="outlined"
                          type="number"
                        />
                      </Grid>

                      <Grid item md={3} xs={12}>
                        <TextField
                          id="Date"
                          label="Date on."
                          type="date"
                          value={values.paid_date}
                          defaultValue={values.paid_date}
                          name="paid_date"
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

                      <Grid item md={3} xs={12}>
                        <TextField
                          fullWidth
                          label={"Rest Ammount"}
                          name="restAmmount"
                          // onChange={handleChange}
                          required
                          value={values.restAmmount}
                          disabled={true}
                          variant="outlined"
                          type="number"
                        />
                      </Grid>

                      {/* <Grid item md={3} xs={12}>
                        <Typography variant="h6" style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                          {"Total Deposit :: "}
                        </Typography>
                      </Grid> */}

                      {/* <Grid item md={3} xs={12}>
                        <TextField
                          fullWidth
                          label={"Ammount"}
                          name="restDeposite"
                          required
                          value={values.restDeposite}
                          disabled={true}
                          variant="outlined"
                          type="number"
                        />
                      </Grid> */}

                    </Grid>

                    <div
                      style={{
                        display: 'block',
                        marginTop: '20px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                        <p style={{ fontSize: "20px", margin: "15px", color: '#000000' }}>{'-:: Past Payment Details ::- '}</p>
                      </div>

                      <Grid container sm={12} md={12} direction="column">
                        <Grid
                          item
                          sm={12}
                          md={12}
                          style={{
                            display: 'block',
                            marginTop: '20px'
                          }}
                        >
                          <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                              <TableRow>
                                <StyledTableCell align="left">Sr No</StyledTableCell>
                                <StyledTableCell align="left">Paid Ammount</StyledTableCell>
                                <StyledTableCell align="left">Date</StyledTableCell>
                                <StyledTableCell align="left">Rest Ammount</StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {paymentArray.map((row, index) => (
                                <StyledTableRow key={index}>
                                  <StyledTableCell component="th" scope="row" align="left">
                                    {index + 1}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">{row.paidAmmount}</StyledTableCell>
                                  <StyledTableCell align="left">{moment(new Date(row.paidDate)).format('DD/MM/YYYY')}</StyledTableCell>
                                  <StyledTableCell align="left">{row.restAmmount}</StyledTableCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Grid>
                      </Grid>
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

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classesForModal.modal}
            open={openModal}
            onClose={handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={openModal}>
              <div className={classesForModal.paper}>
                <GenerateInvoice selectedDocId={currentUserId} orderDetailsData={transferObj} />
              </div>
            </Fade>
          </Modal>

        </Page>
      )}
      {!backPage && <InvoiceList />}
    </div>
  );
};


AddInvoice.propTypes = {
  className: PropTypes.string,
};

export default AddInvoice;
