/*eslint-disable */
import React, { useEffect, useState } from 'react';
import firebase from './firebase';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import html2pdf from "html2pdf.js";
import logodownload from "./images/NT.png"
import moment from "moment";

import { Button, Container, Grid, TableFooter, TextField, Typography } from "@material-ui/core";

// import "./styles.css"

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

const useStyles = makeStyles({
  table: {
    // minWidth: 800
  }
});

const CssTextField = withStyles({
  root: {
    // '& label.Mui-focused': {
    //   color: 'white',
    // },
    // '& .MuiInput-underline:after': {
    //   borderBottomColor: 'yellow',
    // },
    // '& .MuiOutlinedInput-root': {
    //   '& fieldset': {
    //     borderColor: 'white',
    //   },
    //   '&:hover fieldset': {
    //     borderColor: 'white',
    //   },
    //   '&.Mui-focused fieldset': {
    //     borderColor: 'yellow',
    //   },
    // },
    "& .MuiOutlinedInput-input": {
      padding: "10px 14px"
    }
  },
})(TextField);


let firestoreData = firebase.firestore();

// let ListOfMOC = [];

let tempDataArray = [];

let lineStatus = ""


export default function GenerateInvoice({ selectedDocId, orderDetailsData }) {

  const classes = useStyles();

  let [basicDetails, setBasicDetails] = useState({});



  let [finalList, setFinalList] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalRestCost, setTotalRestCost] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalGivenAmmount, setTotalGivenAmmount] = useState(0);
  let [paymentArray, setPaymentArray] = useState([]);

  useEffect(
    () => {
      // totalBillAmmount
      console.log('selectedDocId :: ', selectedDocId);
      console.log('orderDetailsData :: ', orderDetailsData);
      console.log('===>> :: ', parseFloat(orderDetailsData.totalBillAmmount));

      setBasicDetails(orderDetailsData)
      // setFinalList(orderDetailsData.productList)
      setTotalDeposit(orderDetailsData.depositAmmount)
      // setTotalGivenAmmount(orderDetailsData.restBillDeposite)

      tempDataArray = []
      orderDetailsData.productList.map((val, index) => {
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

      // console.log('tempDataArray :: ', tempDataArray);
      setFinalList(tempDataArray);



      let tempObj = [];
      tempObj = orderDetailsData.paymentDetails;
      let finalObjData = tempObj.sort((a, b) => b.paidDate - a.paidDate);

      setPaymentArray(finalObjData)

      // let tmp_total_cost = 0;

      // for (let i = 0; i < tempDataArray.length; i++) {
      //   tmp_total_cost += parseFloat(tempDataArray[i].productPrice);
      // }

      // setTotalCost(tmp_total_cost.toFixed(2))
      setTotalCost(parseFloat(orderDetailsData.totalBillAmmount).toFixed(2))

      let tmp_total_rest_cost = 0;
      for (let i = 0; i < orderDetailsData.paymentDetails.length; i++) {
        tmp_total_rest_cost += parseFloat(orderDetailsData.paymentDetails[i].paidAmmount);
      }

      let myFinalRest = (parseFloat(orderDetailsData.totalBillAmmount) - tmp_total_rest_cost)

      setTotalRestCost(myFinalRest.toFixed(2))



      // if (parseFloat(orderDetailsData.totalBillAmmount) <= orderDetailsData.depositAmmount) {
      //   lineStatus = "JAMA"
      // } else {

      //   if(parseFloat(orderDetailsData.depositAmmount) === parseFloat(orderDetailsData.restBillDeposite)) {
      //     lineStatus = "JAMA"
      //   } else  {
      //     lineStatus = "BAKI"
      //   }
      // }

      console.log('TOTAL  :: ', parseFloat(orderDetailsData.totalBillAmmount))
      console.log('TOTAL REST :: ', parseFloat(myFinalRest))
      console.log('TOTAL DEPOSIT :: ', parseFloat(orderDetailsData.depositAmmount));

      let tmpCal = (parseFloat(orderDetailsData.totalBillAmmount) - parseFloat(myFinalRest));
      console.log('tmpCal :: ', tmpCal)
      let tmpCalA = (tmpCal + parseFloat(orderDetailsData.depositAmmount));
      console.log('tmpCalA :: ', tmpCalA)

      if(tmpCalA < parseFloat(orderDetailsData.totalBillAmmount)) {

        let finalValue = (parseFloat(orderDetailsData.totalBillAmmount) - tmpCalA);
        console.log("SEE 1 :: ",finalValue);
        setTotalGivenAmmount(finalValue)
        lineStatus = "BAKI";

      } 
      if(tmpCalA > parseFloat(orderDetailsData.totalBillAmmount)) {

        let finalValue = (tmpCalA - parseFloat(orderDetailsData.totalBillAmmount));
        console.log("SEE 2 :: ",finalValue);
        setTotalGivenAmmount(finalValue)
        lineStatus = "JAMA";

      } 
      if (tmpCalA === parseFloat(orderDetailsData.totalBillAmmount)) {

        let finalValue = (tmpCalA - parseFloat(orderDetailsData.totalBillAmmount));
        console.log("SEE EQUAL :: ",finalValue);
        setTotalGivenAmmount(finalValue)
        lineStatus = "JAMA"
      }

    },
    []
  );






  const handleDownloadRateSheet = () => {

    let tmpName = basicDetails.clientName;

    var element = document.getElementById('RateTbl')
    var opt = {
      // margin: [8, 8, 32, 8], // top, left, bottom, right
      margin: 0.5,
      filename: tmpName,
      pagebreak: { mode: 'avoid-all' },
      image: { type: "jpeg", quality: 0.99 },
      html2canvas: { scale: 1, imageTimeout: 0 },
      // jsPDF: { unit: "px", format: "A4", orientation: "portrait", hotfixes: ["px_scaling"] },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    html2pdf()
      .from(element)
      .set(opt)
      .save();
  }





  return (
    <Container maxWidth="lg">
      {/* <h2 style={{ textAlign: "center" }}>Invoice</h2> */}

      <Grid container sm={12} md={12} direction="column">

        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          {/* <Button variant='contained' onClick={() => saveRateData()}>
            Save
          </Button> */}
          <Button variant='contained' style={{ marginLeft: '5px' }} onClick={() => handleDownloadRateSheet()}>
            Download
          </Button>
        </Grid>


        <Grid
          item
          sm={12}
          md={12}
          style={{
            display: 'block',
            margin: '40px'
          }}
        >
          <Table id='RateTbl' className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell colSpan={8} style={{ backgroundColor: "transparent" }} align="center">
                  <img src={logodownload} alt='' style={tablelogoimg} />
                  <Typography variant='h5' style={{
                    color: "#000077",
                    fontFamily: ['Montserrat', 'sans-serif'].join(','),
                    fontWeight: 800
                  }}>Nakshraj Traders</Typography>

                  <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontSize: "16px", fontWeight: 500, margin: "12px", color: '#000077' }}>{'GST No. :: ' + '24AAQFN5101M1Z4'}</p>
                    <p style={{ fontSize: "16px", fontWeight: 500, margin: "12px", color: '#000077' }}>{'Contact No. :: ' + '+91 97252 54747' + ', +91 82388 88809'}</p>
                    {/* <p style={{ fontSize: "16px", fontWeight: 500, margin: "12px", color: '#000077' }}>{', ' + '+91 82388 88809'}</p> */}
                  </div>

                  <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, margin: "13px", color: '#000077' }}>{'Address :: ' + 'શંકરપુરા, કલિકુંડ - ખેડા રોડ, ધોળકા, જી. અમદાવાદ. - 382225'}</p>
                  </div>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell colSpan={8} style={{ backgroundColor: "transparent" }} align="center">
                  <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontSize: "15px", margin: "13px", color: '#000000' }}>{'Invoice No. :: ' + basicDetails.invoiceNo}</p>
                    <p style={{ fontSize: "15px", margin: "13px", color: '#000000' }}>{'Name :: ' + basicDetails.clientName}</p>
                    <p style={{ fontSize: "15px", margin: "13px", color: '#000000' }}>{'Contact No. :: ' + basicDetails.clientContact}</p>
                    <p style={{ fontSize: "15px", margin: "13px", color: '#000000' }}>{'Date :: ' + new Date(basicDetails.order_date).toDateString()}</p>
                  </div>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}>Sr No</StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}>Item</StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}>QTY</StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}>Rate</StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}>From</StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}>To</StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}>Day's</StyledTableCell>
                <StyledTableCell align="right" style={{ backgroundColor: "#000077" }}>Total</StyledTableCell>
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
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}>Total</StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}></StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}></StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}></StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}></StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}></StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}></StyledTableCell>
                <StyledTableCell align="right" style={{ backgroundColor: "#000077" }}>{totalCost}</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableHead>
              <TableRow>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}>Rest</StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}></StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}></StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}></StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}></StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}></StyledTableCell>
                <StyledTableCell align="left" style={{ backgroundColor: "#000077" }}></StyledTableCell>
                <StyledTableCell align="right" style={{ backgroundColor: "#000077" }}>{totalRestCost}</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableHead>
              <TableRow>
                <StyledTableCell colSpan={8} style={{ backgroundColor: "transparent" }} align="center">
                  <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontSize: "18px", margin: "13px", color: '#000077' }}>{'Deposit :: ' + totalDeposit}</p>

                    {lineStatus === 'JAMA' &&
                      <p style={{ fontSize: "18px", margin: "13px", color: '#27a727' }}>{'જમા :: ' + totalGivenAmmount}</p>
                    }

                    {lineStatus === 'BAKI' &&
                      <p style={{ fontSize: "18px", margin: "13px", color: '#a72727' }}>{'બાકી :: ' + totalGivenAmmount}</p>
                    }
                  </div>
                </StyledTableCell>
              </TableRow>
            </TableHead>
          </Table>

          {/* <div
            style={{
              display: 'block',
              marginTop: '10px'
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
                  margin: '10PX'
                }}
              >
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">Sr No</StyledTableCell>
                      <StyledTableCell align="left">Date</StyledTableCell>
                      <StyledTableCell align="left">Paid</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentArray.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row" align="left">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left">{moment(new Date(row.paidDate)).format('DD/MM/YYYY')}</StyledTableCell>
                        <StyledTableCell align="right">{row.paidAmmount}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                  <TableRow>
                    <StyledTableCell align="left">Rest</StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                    <StyledTableCell align="right">{totalRestCost}</StyledTableCell>
                  </TableRow>

                </Table>
              </Grid>
            </Grid>
          </div> */}
        </Grid>
      </Grid>

    </Container>
  );
}
