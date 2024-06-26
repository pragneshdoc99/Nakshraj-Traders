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

import AddOrder from "./add-order";
import ConfirmDialog from "./ConfirmDialog";

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import configs from "../common/utils/base-urls";

import Page from "./page";
// import { getUserToken, getUserUid } from "../creator/factoryjs/util-factory";
import axios from "axios";
import { config } from "react-transition-group";
// import GenerateInvoice from "../GenerateInvoice";

// import { caseHistoryFunction } from "../UserLogs";


const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		fontFamily: 'Montserrat'
	},
	importButton: {
		marginRight: theme.spacing(1)
	},
	exportButton: {
		marginRight: theme.spacing(1)
	},
	exporesultroot: {},
	avatar: {
		marginRight: theme.spacing(2),
		borderRadius: '10px'
	},
	pagination: {
		flexShrink: 0
	},
	active: {
		color: '#00ca73 !important'
	},
	inactive: {
		color: '#dc3545 !important'
	},
	table: {
		minWidth: 300
	},
	text: {
		fontFamily: 'Montserrat !important'
	}
}));

// paging actions

const OrderList = ({ className, sideOptionSelected, ...rest }) => {
  const { t } = useTranslation();

  const [myTempArray, setmyTempArray] = useState([]);
  const [myArray, setmyArray] = useState([]);

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
        data.tableName.toLowerCase().includes(value.toLowerCase())
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

  const useStyles = makeStyles((theme) => ({
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

  useEffect(() => {

    setLoader(false);
    setNoDataImg(true);

    fetchProductData();
  }, []);

  const fetchProductData = () => {

    const database = firebase.firestore();
    let tempDb = database.collection('order-list');
    tempDb.get().then(function (dataSnap) {
      // console.log('GET DATA :: ', dataSnap);
      let tempObj = [];
      let tempInactiveObj = [];
      dataSnap.forEach(function (doc) {
        let docData = doc.data();
        tempObj.push(docData);
      });

      const finalData = tempObj.sort((a, b) => b.order_date - a.order_date);
      // console.log('DOC Data again :: ', finalData);
      setmyTempArray(finalData)
      setmyArray(finalData);
      setLoader(false);

      if (finalData.length <= 0) {
        setNoDataImg(true);
      }

    });

  };

  const classes = useStyles();
  const [userForm, setUserForm] = useState(false);

  const handleUserForm = () => {
    setUserForm(true);
  };

  const onEditForm = () => {
    //console.log("EDIT")
  };

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      boxShadow: theme.shadows[1],
      fontSize: 13,
    },
  }))(Tooltip);

  const [currentUserId, setCurrentUser] = useState("");
  const [productDetails, setProductData] = useState("");

  const editThisFeed = (product, productDetails) => {

    try {
      const databaseFld = firebase.firestore();
      let docRef = databaseFld.collection("order-list")
      docRef = docRef.where("clientName", "==", product);
      docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("USER DOC ID ::  ", doc.id);

          setCurrentUser(doc.id);
          setProductData(productDetails);
          setUserForm(true);
        })
      })
    } catch (err) {
      errorLogs('err', err);
    }

    //console.log(" Edit case id::=> ", caseID)
  };
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const handleDelete = (value) => {

    let deletionVal = value;

    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    try {
      const databaseFld = firebase.firestore();
      let docRef = databaseFld.collection("product-list")
      docRef = docRef.where("productName", "==", deletionVal);
      docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("USER DOC ID ::  ", doc.id);
          databaseFld.collection("product-list").doc(doc.id).delete().then(() => {
            console.log("Document successfully deleted!");
            fetchProductData();
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });

        })
      })

    } catch (err) {
      errorLogs('handleDelete', err);
    }
  };

  // const [openModal, setModalOpen] = React.useState(false);
  // const [selectedId, setSelectedId] = React.useState('');
  // const [orderData, setOrderData] = React.useState({});

  // const handleModalOpen = (orderName, orderDetails) => {

  //   try {
  //     const databaseFld = firebase.firestore();
  //     let docRef = databaseFld.collection("order-list")
  //     docRef = docRef.where("clientName", "==", orderName);
  //     docRef.get().then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         console.log("USER DOC ID ::  ", doc.id);
  //         console.log("orderDetails ::  ", orderDetails);

  //         setSelectedId(doc.id);
  //         setOrderData(orderDetails);
  //         setModalOpen(true);
  //       })
  //     })
  //   } catch (err) {
  //     errorLogs('err', err);
  //   }

  // };

  // const handleModalClose = () => {
	// 	setModalOpen(false);
	// };

  const classesForModal = useStyles();

  return (
    <Page className={classes.root} title={"Order List"}>
      {!userForm && (
        <Container maxWidth={false}>
          <div className={clsx(classes.root, className)} {...rest}>
            <Box display="flex" className="sideBtn">
              <Box flexGrow={1}>
                {/* Translation-content */}
                <Typography variant="h4" className={"txtleft"}>
                  Order List
                </Typography>
              </Box>
              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleUserForm}
                >
                  <PersonAddIcon className={"btnRightDetails"} />
                  {/* Translation-content */}
                  <span>{"Add New Order"}</span>
                </Button>
              </Box>
            </Box>

            <hr />
            <Box mt={3}>
              <Card>
                <CardContent>
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
                      placeholder={"Search for invoice"}
                      value={searchTextFieldValue}
                      onChange={setSearch}
                      variant="outlined"
                    />
                  </Box>
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
                          <TableCell className={"txtleft"}>{"City"}</TableCell>
                          {/* <TableCell className={"txtleft"}>{"State"}</TableCell>
                          <TableCell className={"txtleft"}>{"Date"}</TableCell> */}
                          {/* <TableCell className={"txtleft"}>{"Invoice No."}</TableCell> */}
                          <TableCell></TableCell>
                          <TableCell></TableCell>
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
                            {/* <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {item.clientCity}
                            </TableCell>
                            <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {item.clientState}
                            </TableCell> */}
                            <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {moment(new Date(item.order_date)).format('DD/MM/YYYY')}
                            </TableCell>
                            {/* <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {item.invoiceNo}
                            </TableCell> */}
                            <TableCell
                              align={"left"}
                              component="th"
                              scope="row"
                            >
                              <LightTooltip
                                className={classes.tooltip}
                                TransitionComponent={Zoom}
                                title={"Edit Product"}
                              >
                                <EditIcon
                                  color="primary"
                                  // onClick={() => editThisFeed(product._id)}
                                  onClick={() => editThisFeed(item.clientName, item)}
                                  variant="contained"
                                  size="sm"
                                />
                              </LightTooltip>
                            </TableCell>

                            {/* <TableCell data-exclude="true">
                              <LightTooltip
                                TransitionComponent={Zoom}
                                title="Generate Invoice"
                              >
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => handleModalOpen(item.clientName, item)}
                                >
                                  {'Invoice'}
                                </Button>
                              </LightTooltip>
                            </TableCell> */}
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
      )}

      {/* <Modal
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
            <GenerateInvoice selectedDoc={selectedId} orderDetailsData={orderData} />
          </div>
        </Fade>
      </Modal> */}
      {userForm && !currentUserId ? <AddOrder /> : ""}

      {currentUserId && userForm ? (
        <AddOrder currentUserId={currentUserId} orderDetails={productDetails} />
      ) : (
        ""
      )}

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Page>
  );
};

OrderList.propTypes = {
  className: PropTypes.string,
};
export default OrderList;
