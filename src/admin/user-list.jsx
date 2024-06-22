/* eslint-disable  */
import React, { useState, useEffect } from "react";
import firebase from '../../src/firebase';
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

import AddUser from "./add-user";
import ConfirmDialog from "./ConfirmDialog";

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

import Page from "./page";
// import { getUserToken, getUserUid } from "../creator/factoryjs/util-factory";
import axios from "axios";
import { config } from "react-transition-group";
import configs from "../common/utils/base-urls";
import AlertDialog from "./AlertDialog";

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
    color: "#228539 !important",
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

const AddUserList = ({ className, sideOptionSelected, updateList, ...rest }) => {
  const { t } = useTranslation();

  const [myTempArray, setmyTempArray] = useState([]);
  const [myArray, setmyArray] = useState([]);

  const [searchTextFieldValue, setSearchTextFieldValue] = useState("");

  const [page, setPage] = useState(0);
  const [loader, setLoader] = useState(true);
  const [noDataImg, setNoDataImg] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [pagedata, setPagedata] = useState(0);
  // const [Islastdata, setIslastdata] = useState();

  //searching functionality
  const filterByValue = (array, value) =>
    array.filter(
      (data) =>
        data.email.toLowerCase().includes(value.toLowerCase()) ||
        data.role.toLowerCase().includes(value.toLowerCase())
    );

  const setSearch = (e) => {
    setSearchTextFieldValue(e.target.value);

    // setPage(0);
    const tempData = filterByValue(myTempArray, e.target.value);
    if (tempData.length > 0) {
      // console.log('tempData A :: ', tempData);
      
      setNoDataImg(true);
      setmyArray(tempData);
    } else {
      // console.log('tempData B :: ', tempData);
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
          // disabled={Islastdata}
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

    setLoader(true);
    setNoDataImg(true);
    fetchUserData()

  }, [updateList]);


  const fetchUserData = () => {

    const database = firebase.firestore();
		let tempDb = database.collection('users-list');
		tempDb.get().then(function (dataSnap) {
			// console.log('GET DATA :: ', dataSnap);
			let tempObj = [];
			let tempInactiveObj = [];
			dataSnap.forEach(function (doc) {
				let docData = doc.data();
				if(docData.loginFlag){
					tempObj.push(docData);
				}
				// if(!docData.loginFlag){
				// 	tempInactiveObj.push(docData)
				// }
			});
			console.log('DOC Data again :: ', tempObj);
			setmyTempArray(tempObj)
      setmyArray(tempObj);
      setLoader(false);

      if (tempObj.length <= 0) {
        setNoDataImg(true);
      }
		});
  }

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
  const [userData, setUserData] = useState("");

  const editThisFeed = (userID, user) => {
    // console.log("USER :: ", userID);
    setCurrentUser(userID);
    setUserData(user)
    setUserForm(true);
    //console.log(" Edit case id::=> ", caseID)
  };
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

  const setAlertDialogfunc = () => {
    setAlertDialog({
      ...alertDialog,
      isOpen: false,
      title: "",
      subTitle: "",
    });
  };

  const handleDelete = (value) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    userChageStatus(value, false)

  };

  const userChageStatus = (userId, status) => {
		let firestoreDB = firebase.firestore();
		let docRef = firestoreDB.collection("users-list")
		docRef = docRef.where("userId", "==", userId);
		docRef.get().then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				console.log("USER DOC ID ::  ",doc.id)
				firestoreDB.collection("users-list").doc(doc.id).update({
					loginFlag: status
				}).then(function () {
					// alert("User Status Updated !");
					fetchUserData();
					
				})
			})
		})
	}

  return (
    <Page className={classes.root} title={t("user-list_userlistmoi")}>
      {!userForm && (
        <Container maxWidth={false}>
          <div className={clsx(classes.root, className)} {...rest}>
            <Box display="flex" className="sideBtn">
              <Box flexGrow={1}>
                {/* Translation-content */}
                <Typography variant="h4" className={"txtleft"}>
                  User List
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
                  <span>{"Add New User"}</span>
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
                      placeholder={"Search for users"}
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
                      </TableBody>
                    </Table>
                  )}

                  {!noDataImg && !loader && <img src={NoData}></img>}

                  {!loader && noDataImg && (
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          {/* <TableCell className={"txtleft"}>{"UserName"}</TableCell> */}
                          <TableCell className={"txtleft"}>{"Email"}</TableCell>
                          <TableCell className={"txtleft"}>{"Role"}</TableCell>
                          {/* <TableCell className={"txtleft"}>
                            {"Subscription"}
                          </TableCell> */}
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {myArray.map((product) => (
                          // console.log("PRODU :: ", product),
                          <TableRow
                            hover
                          // key={product.incidentDateTime+product.caseDescription}
                          >
                            {/* <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {product.user_name}
                            </TableCell> */}
                            <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {product.email}
                            </TableCell>
                            <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {product.role}
                            </TableCell>
                            {/* <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {product.user_subscription}
                            </TableCell> */}

                            <TableCell
                              align={"left"}
                              component="th"
                              scope="row"
                            >
                              <LightTooltip
                                className={classes.tooltip}
                                TransitionComponent={Zoom}
                                title={"Edit User"}
                              >
                                <EditIcon
                                  onClick={() => editThisFeed(product.userId, product)}
                                  variant="contained"
                                  size="sm"
                                  style={{ color: "#20382b" }}
                                />
                              </LightTooltip>
                            </TableCell>

                            <TableCell align={"left"}>
                              <LightTooltip
                                TransitionComponent={Zoom}
                                title={"Delete User"}
                              >
                                {/* Translation-content */}
                                <DeleteIcon
                                  color="primary"
                                  variant="contained"
                                  onClick={() =>
                                    setConfirmDialog({
                                      isOpen: true,
                                      title:
                                        "are you sure you want to delete this user ?",
                                      subTitle:
                                        "once deleted you cant undo this action",
                                      onConfirm: () => {
                                        handleDelete(product.userId);
                                      },
                                    })
                                  }
                                ></DeleteIcon>
                              </LightTooltip>
                            </TableCell>
                            {/* <TableCell className={classes.active}>
                              {new Date(product.doj).toLocaleString("en-IN")}
                            </TableCell> */}
                            {/* <TableCell className={classes.active}>
                              {new Date(product.dor).toLocaleString("en-IN")}
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
      {userForm && !currentUserId ? <AddUser resetIsUpdateUser={false} /> : ""}

      {currentUserId && userForm ? (
        <AddUser currentUserId={currentUserId} userData={userData} />
      ) : (
        ""
      )}

      <AlertDialog
        alertDialog={alertDialog}
        setAlertDialog={setAlertDialogfunc}
      />

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Page>
  );
};

AddUserList.propTypes = {
  className: PropTypes.string,
};

export default AddUserList;
