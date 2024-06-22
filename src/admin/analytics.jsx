/* eslint-disable  */
import React, { useState, useEffect } from "react";
import moment from "moment";
import firebase from '../firebase';
import PropTypes from "prop-types";
import Config from "../common/utils/base-urls";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import TableFooter from "@material-ui/core/TableFooter";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
// import BackspaceIcon from '@material-ui/icons/Backspace';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Skeleton from "@material-ui/lab/Skeleton";
import NoData from "../images/NoData.jpg";
import { useTranslation } from "react-i18next";

import "../css/topbar/topbar.css";

import AddProduct from "./add-product";
import ConfirmDialog from "./ConfirmDialog";

// import logoImg from "../images/cyberLogo.png";

import {
  Avatar,
  Button,
  Box,
  Zoom,
  Container,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  useTheme,
  withStyles,
  Tooltip,
  Tab,
  Grid,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import configs from "../common/utils/base-urls";

import Page from "./page";
// import { getUserToken, getUserUid } from "../creator/factoryjs/util-factory";
import axios from "axios";
import { config } from "react-transition-group";
import FilterListIcon from '@material-ui/icons/FilterList';
import { Cancel } from "@material-ui/icons";
// import { caseHistoryFunction } from "../UserLogs";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  exporesultroot: {},
  avatar: {
    marginRight: theme.spacing(2),
    borderRadius: "10px",
  },
  pagination: {
    flexShrink: 0,
  },
  active: {
    color: "#000077 !important",
  },
  dangertextTbl: {
    color: "#a72727 !important",
  },
  successtextTbl: {
    color: "#27a727 !important",
  },
  inactive: {
    color: "#dc3545 !important",
  },
  table: {
    minWidth: 300,
  },
  avatar: {
    marginRight: theme.spacing(2),
    borderRadius: "10px",
  },
}));

// paging actions

let tempInvoiceObj = [];
let finalInvoiceObj = [];

let tmpPaidVal = 0;
let tmpRestVal = 0;

let tmp_chk_val = 0;

const Analytics = ({ className, sideOptionSelected, ...rest }) => {
  const { t } = useTranslation();

  const [values, setValues] = useState({
    from_date: '',
    to_date: '',
  });

  const [myTempArray, setmyTempArray] = useState([]);
  const [myArray, setmyArray] = useState([]);
  const [dummyArray, setDummyArray] = useState([]);

  const [searchTextFieldValue, setSearchTextFieldValue] = useState("");

  const [page, setPage] = useState(0);
  const [loader, setLoader] = useState(true);
  const [noDataImg, setNoDataImg] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [pagedata, setPagedata] = useState(0);
  const [Islastdata, setIslastdata] = useState();

  //searching functionality
  const filterByValue = (array, value) =>
    array.filter(
      (data) =>
        data.clientName.toLowerCase().includes(value.toLowerCase()) ||
        data.clientContact.toLowerCase().includes(value.toLowerCase()) ||
        data.totalBillAmmount.toLowerCase().includes(value.toLowerCase())
      //  ||
      // data.incidentCity.toLowerCase().includes(value.toLowerCase())
    );

  const setSearch = (e) => {
    setSearchTextFieldValue(e.target.value);

    // setPage(0);
    const tempData = filterByValue(myTempArray, e.target.value);
    if (tempData.length > 0) {
      setNoDataImg(true);
      setmyArray(tempData);
    } else {
      setNoDataImg(false);
      setmyArray(tempData);
    }
  };

  //pagination

  function TablePaginationActions(props) {
    const classes = useStyles();
    const theme = useTheme();

    const handlepagedata = (data) => {
      // setNoDataImg(false);
      // setLoader(true);
      setLoader(false);
      setNoDataImg(true);
    };

    const handleBackButtonClick = () => {
      setSearchTextFieldValue("");

      setPagedata(pagedata - 1);
      handlepagedata(pagedata - 1);
    };

    const handleNextButtonClick = () => {
      setSearchTextFieldValue("");

      setPagedata(pagedata + 1);
      handlepagedata(pagedata + 1);
    };

    return (
      <div className={classes.pagination}>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={pagedata === 0}
          aria-label={t("user-list_previouspage")}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={Islastdata}
          aria-label={t("user-list_nextpage")}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
      </div>
    );
  }
  //update info functionality

  useEffect(() => {

    setLoader(false);
    setNoDataImg(true);

    fetchProductData();
  }, []);

  const fetchProductData = () => {

    const database = firebase.firestore();
    let tempDb = database.collection('invoice-list');
    tempDb.get().then(function (dataSnap) {

      tempInvoiceObj = [];
      dataSnap.forEach((doc) => {
        let docData = doc.data();
        tempInvoiceObj.push(docData);
      });


      console.log("tempInvoiceObj :: ", tempInvoiceObj);

      finalInvoiceObj = []
      tmpPaidVal = 0;
      tmpRestVal = 0;

      tempInvoiceObj.map((val, ind) => {

        if (val.totalBillAmmount !== val.restBillAmmount) {

          if(val.restBillAmmount === 0) {
            if(val.paymentDetails.length) {
              
              console.log("VAL :: ", val.paymentDetails.length)
              tmp_chk_val = 0;
              for (let i = 0; i < val.paymentDetails.length; i++) {
                tmp_chk_val += parseFloat(val.paymentDetails[i].paidAmmount);
              }

              console.log("tmp_chk_val :: ", tmp_chk_val);

              if(parseFloat(val.totalBillAmmount) === tmp_chk_val) {
                tmpPaidVal = tmp_chk_val;
                tmpRestVal = 0;
              }

            } else {

              tmpPaidVal = 0;
              tmpRestVal = val.totalBillAmmount
            }


          } 

          if(val.restBillAmmount !== 0) {
            tmpPaidVal = (val.totalBillAmmount - val.restBillAmmount);
            tmpRestVal = val.restBillAmmount
           }

          finalInvoiceObj.push({
            clientName: val.clientName,
            clientContact: val.clientContact,
            invoiceNo: val.invoiceNo,
            order_date: val.order_date,
            totalBillAmmount: val.totalBillAmmount,
            restBillAmmount: tmpRestVal,
            depositAmmount: val.depositAmmount,
            paidBillAmmount: tmpPaidVal
          })
        }


      })

      let tempObj = [];
      tempObj = finalInvoiceObj;
      let finalObjData = tempObj.sort((a, b) => b.order_date - a.order_date);

      console.log('finalObjData :: ', finalObjData);

      setmyTempArray(finalObjData)
      setmyArray(finalObjData);
      setDummyArray(finalObjData);
      setLoader(false);

      if (finalObjData.length <= 0) {
        setNoDataImg(true);
      }

    });

  };

  const classes = useStyles();



  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onClickFilterData = () => {

    console.log('FROM :: ', values.from_date)
    console.log('To :: ', values.to_date)

    if (values.from_date === "") {
      alert("Please Select From Date.")

    } else if (values.to_date === "") {
      alert("Please Select To Date.")
    } else {

      let tmpFromdate = new Date(values.from_date).getTime();
      let tmpTodate = new Date(values.to_date).getTime();

      const filteredKeyValuePairs = myArray.filter(key => key.order_date >= tmpFromdate && key.order_date <= tmpTodate);
      setmyTempArray(filteredKeyValuePairs)
      setmyArray(filteredKeyValuePairs);
      // console.log(filteredKeyValuePairs);
    }

  }

  const onClickClearData = () => {

    setValues({
      ...values,
      from_date: '',
      to_date: ''
    })
    
    setmyArray(dummyArray);
    setmyTempArray(dummyArray);
  }


  return (
    <Page className={classes.root} title={"Rest Payment List"}>
      <Container maxWidth={false}>
        <div className={clsx(classes.root, className)} {...rest}>
          <Box display="flex" className="sideBtn">
            <Box flexGrow={1}>
              {/* Translation-content */}
              <Typography variant="h4" className={"txtleft"}>
                Rest Payment List
              </Typography>
            </Box>
          </Box>

          <hr />
          <Box mt={3}>
            <Card>
              <CardContent>

                <Grid container spacing={3}>
                  <Grid item md={3} xs={12}>
                    <Box maxWidth={"100%"}>
                      <TextField
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SvgIcon fontSize="small" color="primary">
                                <SearchIcon />
                              </SvgIcon>
                            </InputAdornment>
                          ),
                        }}
                        placeholder={"Search for products"}
                        value={searchTextFieldValue}
                        onChange={setSearch}
                        variant="outlined"
                      />
                    </Box>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <TextField
                      label="From"
                      type="date"
                      value={values.from_date}
                      defaultValue={values.from_date}
                      name="from_date"
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
                      label="To"
                      type="date"
                      value={values.to_date}
                      defaultValue={values.to_date}
                      name="to_date"
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
                    <Button
                      variant="contained"
                      className="btnInvoice"
                      onClick={() => onClickFilterData()}
                    >
                      <FilterListIcon />
                    </Button>

                    <Button
                      style={{marginLeft: '2px'}}
                      variant="contained"
                      className="btnInvoice"
                      onClick={() => onClickClearData()}
                    >
                      <Cancel />
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </div>
        <Box mt={3} mb={3}>
          <Card className={classes.exporesultroot}>
            <Box md={12}>
              <div className="overflowtable">
                {loader && (
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )}

                {!noDataImg && !loader && <img src={NoData}></img>}

                {!loader && noDataImg && (
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={"txtleft"}>{"Name"}</TableCell>
                        <TableCell className={"txtleft"}>{"Contact"}</TableCell>
                        <TableCell className={"txtleft"}>{"Date"}</TableCell>
                        <TableCell className={"txtleft"}>{"Total"}</TableCell>
                        <TableCell className={"txtleft"}>{"Deposit"}</TableCell>
                        <TableCell className={"txtleft"}>{"Paid"}</TableCell>
                        <TableCell className={"txtleft"}>{"Rest"}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {myArray.map((item) => (
                        <TableRow hover>
                          <TableCell
                            align={"left"}
                            className={classes.active}
                          >
                            {item.clientName}
                          </TableCell>
                          <TableCell
                            align={"left"}
                            className={classes.active}
                          >
                            {item.clientContact}
                          </TableCell>
                          <TableCell
                            align={"left"}
                            className={classes.active}
                          >
                            {moment(new Date(item.order_date)).format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell
                            align={"left"}
                            className={classes.active}
                          >
                            {item.totalBillAmmount}
                          </TableCell>
                          <TableCell
                            align={"left"}
                            className={classes.active}
                          >
                            {item.depositAmmount}
                          </TableCell>
                          <TableCell
                            align={"left"}
                            className={classes.successtextTbl}
                          >
                            {item.paidBillAmmount}
                          </TableCell>
                          <TableCell
                            align={"left"}
                            className={classes.dangertextTbl}
                          >
                            {item.restBillAmmount}
                          </TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[10]}
                          count={myArray.length}
                          rowsPerPage={20}
                          page={page}
                          ActionsComponent={TablePaginationActions}
                          style={{ overflow: "visible" }}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                )}
              </div>
            </Box>
          </Card>
        </Box>
      </Container>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Page>
  );
};

Analytics.propTypes = {
  className: PropTypes.string,
};
export default Analytics;
