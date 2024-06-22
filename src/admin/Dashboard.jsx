/* eslint-disable  */

import {
  Container,
  Grid,
  Paper,
  Box,
  Tooltip,
  withStyles,
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Page from "../admin/page";
import "echarts-gl";
import "../css/dashboard.css";
import "../css/topbar.css";
import firebase from '../../src/firebase';

// import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";


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

// const useStyles = makeStyles({
//   table: {
//     // minWidth: 800
//   }
// });



const LightTooltip = withStyles(theme => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 13
  }
}))(Tooltip);

let tempObj = [];
let tempProdObj = [];
let tempOrderObj = [];
let tempInvoiceObj = [];
let finalInvoiceObj = [];


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalSystemUser: 0,
      totalSystemProduct: 0,
      totalSystemOrder: 0,
      totalSystemRestAmmount : 0,
      invoiceDetails: []
    };
  }




  componentDidMount() {


    setTimeout(() => {
      this.getSystemUser();
      this.getSystemProducts();
      this.getSystemOrders();
      this.getInvoiceList();
    }, 1000);
  }
  getSystemUser = () => {

    const database = firebase.firestore();
    let tempDb = database.collection('users-list');
    tempDb.get().then((dataSnap) => {
      tempObj = [];
      dataSnap.forEach((doc) => {
        let docData = doc.data();
        if (docData.loginFlag) {
          tempObj.push(docData);
        }
      });

      this.setState({
        totalSystemUser: tempObj.length
      })

    });

  };

  getSystemProducts = () => {

    const database = firebase.firestore();
    let tempDb = database.collection('product-list');
    tempDb.get().then((dataSnap) => {
      tempProdObj = [];
      dataSnap.forEach((doc) => {
        let docData = doc.data();
        tempProdObj.push(docData);
      });

      this.setState({
        totalSystemProduct: tempProdObj.length
      })

    });

  }

  getSystemOrders = () => {
    const database = firebase.firestore();
    let tempDb = database.collection('order-list');
    tempDb.get().then((dataSnap) => {
      tempOrderObj = [];
      dataSnap.forEach((doc) => {
        let docData = doc.data();
        tempOrderObj.push(docData);
      });

      this.setState({
        totalSystemOrder: tempOrderObj.length
      })

    });
  }

  getInvoiceList = () => {
    const database = firebase.firestore();
    let tempDb = database.collection('invoice-list');
    tempDb.get().then((dataSnap) => {
      tempInvoiceObj = [];
      dataSnap.forEach((doc) => {
        let docData = doc.data();
        tempInvoiceObj.push(docData);
      });



      finalInvoiceObj = []
      tempInvoiceObj.map((val, ind) => {

        if (val.totalBillAmmount !== val.restBillAmmount) {
          finalInvoiceObj.push({
            clientName: val.clientName,
            clientContact: val.clientContact,
            invoiceNo: val.invoiceNo,
            order_date: val.order_date,
            totalBillAmmount: val.totalBillAmmount,
            restBillAmmount: val.restBillAmmount,
            paidBillAmmount: (val.totalBillAmmount - val.restBillAmmount)
          })
        }


      })

      let tempObj = [];
      tempObj = finalInvoiceObj;
      let finalObjData = tempObj.sort((a, b) => b.order_date - a.order_date);

      console.log('finalObjData :: ', finalObjData);

      let tmp_total_rest = 0;

      for (let i = 0; i < finalObjData.length; i++) {
        tmp_total_rest += parseFloat(finalObjData[i].restBillAmmount);
      }

      this.setState({
        totalSystemRestAmmount: tmp_total_rest
      })


      // this.setState({
      //   invoiceDetails: finalObjData
      // })

    });
  }




  render() {

    // const classes = useStyles();

    return (
      <Page title={"Dashboard" + "|" + "Nakshraj"}>
        <Container maxWidth={false}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="h4" className="txtleft" style={{ color: "black" }}>
                {"Dashboard"}
              </Typography>
            </Box>
          </Box>
          <hr />
          <div className="overflowdashboard">
            <Grid
              container
              className="basicpadding"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid item md={3} xs={6}>
                <LightTooltip title={"Total Users"}>
                  <Paper className="basicpadding" elevation={12}>
                    <Typography variant="body2" className="txtleft">
                      {"Users"}
                    </Typography>
                    <Typography variant="h3" className="textcenter">
                      {Math.round(this.state.totalSystemUser)}
                    </Typography>
                    <div
                      className="textend"
                      style={{ height: 20.2 + "px" }}
                      title={"Users"}
                    ></div>
                  </Paper>
                </LightTooltip>
              </Grid>
              <Grid item md={3} xs={6}>
                <LightTooltip title={"Total Products"}>
                  <Paper className="basicpadding" elevation={12}>
                    <Typography variant="body2" className="txtleft">
                      {"Products"}
                    </Typography>
                    <Typography variant="h3" className="textcenter">
                      {Math.round(this.state.totalSystemProduct)}
                    </Typography>
                    <div
                      className="textend"
                      style={{ height: 20.2 + "px" }}
                      title={"Products"}
                    >
                    </div>
                  </Paper>
                </LightTooltip>
              </Grid>

              <Grid item md={3} xs={6}>
                <LightTooltip title={"Total Customer and Contractor"}>
                  <Paper className="basicpadding" elevation={12}>
                    <Typography variant="body2" className="txtleft">
                      {"Customer and Contractor"}
                    </Typography>
                    <Typography variant="h3" className="textcenter">
                      {Math.round(this.state.totalSystemOrder)}
                    </Typography>
                    <div
                      className="textend"
                      style={{ height: 20.2 + "px" }}
                      title={"Orders"}
                    >
                    </div>
                  </Paper>
                </LightTooltip>
              </Grid>

              <Grid item md={3} xs={6}>
                <LightTooltip title={"Total Rest Ammount"}>
                  <Paper className="basicpadding" elevation={12}>
                    <Typography variant="body2" className="txtleft">
                      {"Total Rest Ammount"}
                    </Typography>
                    <Typography variant="h3" className="textcenter">
                      {Math.round(this.state.totalSystemRestAmmount)}
                    </Typography>
                    <div
                      className="textend"
                      style={{ height: 20.2 + "px" }}
                      title={"Orders"}
                    >
                    </div>
                  </Paper>
                </LightTooltip>
              </Grid>



            </Grid>

            {/* <div
              style={{
                display: 'block',
                marginTop: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                <p style={{ fontSize: "20px", margin: "15px", color: '#000000' }}>{'-:: Rest Payment List ::- '}</p>
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
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">Sr No</StyledTableCell>
                        <StyledTableCell align="left">Name</StyledTableCell>
                        <StyledTableCell align="left">Contact</StyledTableCell>
                        <StyledTableCell align="left">Date</StyledTableCell>
                        <StyledTableCell align="left">Total</StyledTableCell>
                        <StyledTableCell align="left">Paid</StyledTableCell>
                        <StyledTableCell align="left">Rest</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.invoiceDetails.map((row, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row" align="left">
                              {index + 1}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.clientName}</StyledTableCell>
                            <StyledTableCell align="left">{row.clientContact}</StyledTableCell>
                            <StyledTableCell align="left">{moment(new Date(row.order_date)).format('DD/MM/YYYY')}</StyledTableCell>
                            <StyledTableCell align="left">{row.totalBillAmmount}</StyledTableCell>
                            <StyledTableCell align="left" className="successtextTbl">{row.paidBillAmmount}</StyledTableCell>
                            <StyledTableCell align="left" className="dangertextTbl" >{row.restBillAmmount}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </div> */}


          </div>

          {/* </div> */}
        </Container>
      </Page>
    );
  }
}

export default withTranslation()(Dashboard);
