/* eslint-disable  */
import React, { useState, useEffect } from "react";
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

import AddVendor from "./add-vendor";
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
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import configs from "../common/utils/base-urls";

import Page from "./page";
// import { getUserToken, getUserUid } from "../creator/factoryjs/util-factory";
import axios from "axios";
import { config } from "react-transition-group";
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

const VendorList = ({ className, sideOptionSelected, ...rest }) => {
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
        data.fullName.toLowerCase().includes(value.toLowerCase()) ||
        data.designation.toLowerCase().includes(value.toLowerCase()) ||
        data.department.toLowerCase().includes(value.toLowerCase()) ||
        // data.email.toLowerCase().includes(value.toLowerCase()) ||
        data.numberIqama.toLowerCase().includes(value.toLowerCase()) ||
        data.contact.toString().includes(value.toLowerCase()) ||
        data.station.stationName.toLowerCase().includes(value.toLowerCase())
      //  ||
      // data.incidentCity.toLowerCase().includes(value.toLowerCase())
    );

  const setSearch = (e) => {
    setSearchTextFieldValue(e.target.value);

    setPage(0);
    const tempData = filterByValue(myTempArray, e.target.value);
    if (tempData.length > 0) {
      setNoDataImg(false);
      setmyArray(tempData);
    } else {
      setNoDataImg(true);
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
    //Loader on
    // setLoader(true);
    // setNoDataImg(false);

    setLoader(false);
    setNoDataImg(true);

    // const token = localStorage.getItem("token");
    // axios
    //   .get(
    //     configs.serverUrl + "admin/getAllVendors/",
    //     //  + pagedata + "/20"
    //     {
    //       headers: {
    //         Authorization: token,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log("RES :: ", res.data);
    //     setIslastdata(res.data.fetchedAll);
    //     setmyTempArray(res.data.data);
    //     setmyArray(res.data.data);
    //     // //console.log(res.data.projects)
    //     //Loader off
    //     setLoader(false);
    //     if (res.data.users.length <= 0) {
    //       setNoDataImg(true);
    //     }

    //     //if array is empty, show empty record image
    //   })
    //   .catch((err) => {
    //     //console.log("Error Occured", err)
    //   });
    fetchVendorData();
  }, []);

  const fetchVendorData = () => {
    setLoader(true);
    const token = localStorage.getItem("token");
    axios
      .get(
        configs.serverUrl + "admin/getAllVendors/",
        //  + pagedata + "/20"
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setLoader(false);
        console.log("RES :: ", res.data);
        setIslastdata(res.data.fetchedAll);
        setmyTempArray(res.data.data);
        setmyArray(res.data.data);
        // //console.log(res.data.projects)
        //Loader off
        if (res.data.users.length <= 0) {
          setNoDataImg(true);
        }

        //if array is empty, show empty record image
      })
      .catch((err) => {
        //console.log("Error Occured", err)
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
  const [vendorDetails, setVendorData] = useState("");

  const editThisFeed = (vendorId, vendorDetails) => {
    // config.log("VD DETAILS :: ",vendorDetails);
    setCurrentUser(vendorId);
    setVendorData(vendorDetails);
    setUserForm(true);
    //console.log(" Edit case id::=> ", caseID)
  };
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const handleDelete = (value) => {
    //console.log("My Doc ID :: ", value);
    let deletionDocId = value;
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    const token = localStorage.getItem("token");
    axios
      .post(
        `${Config.serverUrl}admin/deleteVendor`,
        {
          userId: value,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        fetchVendorData();
        setAlertDialog({
          ...alertDialog,
          isOpen: true,
          title: "Vendor deleted successfully",
        });
      })
      .catch((err) => {
        console.error("error in delete", err);
      });
  };

  return (
    <Page className={classes.root} title={"Vendor List"}>
      {!userForm && (
        <Container maxWidth={false}>
          <div className={clsx(classes.root, className)} {...rest}>
            <Box display="flex" className="sideBtn">
              <Box flexGrow={1}>
                {/* Translation-content */}
                <Typography variant="h4" className={"txtleft"}>
                  Vendor List
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
                  <span>{"Add New Vendor"}</span>
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
                      placeholder={"Search for vendors"}
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
                          <TableCell className={"txtleft"}>{"Logo"}</TableCell>
                          <TableCell className={"txtleft"}>
                            {"Compnay Name"}
                          </TableCell>
                          {/* <TableCell className={"txtleft"}>{"User Name"}</TableCell> */}
                          <TableCell className={"txtleft"}>{"Email"}</TableCell>
                          <TableCell className={"txtleft"}>
                            {"Contact No."}
                          </TableCell>
                          <TableCell className={"txtleft"}>
                            {"Establish Year"}
                          </TableCell>
                          <TableCell className={"txtleft"}>
                            {"Revenue"}
                          </TableCell>
                          <TableCell className={"txtleft"}>
                            {"Funding"}
                          </TableCell>
                          <TableCell className={"txtleft"}>
                            {"Fund Year"}
                          </TableCell>
                          <TableCell className={"txtleft"}>
                            {"Employees"}
                          </TableCell>
                          <TableCell className={"txtleft"}>
                            {"Country"}
                          </TableCell>
                          <TableCell className={"txtleft"}>{"State"}</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {myArray.map((item) => (
                          <TableRow hover>
                            <TableCell align={"left"}>
                              <Avatar
                                className={classes.avatar}
                                src={item.logo}
                              ></Avatar>
                            </TableCell>

                            <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {item.company_name}
                            </TableCell>
                            {/* <TableCell align={"left"} className={classes.active}>
                                                        test user
                                                    </TableCell> */}
                            <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {item.user_email}
                            </TableCell>
                            <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {item.contact_no}
                            </TableCell>

                            <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {item.establishment_year}
                            </TableCell>
                            <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {item.estimate_revenue}
                            </TableCell>
                            <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {item.funding}
                            </TableCell>
                            <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {item.fund_year}
                            </TableCell>
                            <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {item.employee_size}
                            </TableCell>
                            <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {item.country_name}
                            </TableCell>
                            <TableCell
                              align={"left"}
                              className={classes.active}
                            >
                              {item.state_name}
                            </TableCell>

                            <TableCell
                              align={"left"}
                              component="th"
                              scope="row"
                            >
                              <LightTooltip
                                className={classes.tooltip}
                                TransitionComponent={Zoom}
                                title={"Edit Vendor"}
                              >
                                <EditIcon
                                  color="primary"
                                  // onClick={() => editThisFeed(product._id)}
                                  onClick={() =>
                                    editThisFeed(item.user_id, item)
                                  }
                                  variant="contained"
                                  size="sm"
                                />
                              </LightTooltip>
                            </TableCell>

                            <TableCell align={"left"}>
                              <LightTooltip
                                TransitionComponent={Zoom}
                                title={"Delete Vendor"}
                              >
                                <DeleteIcon
                                  color="primary"
                                  variant="contained"
                                  onClick={() =>
                                    setConfirmDialog({
                                      isOpen: true,
                                      title:
                                        "are you sure you want to delete this vendor ?",
                                      subTitle:
                                        "once deleted you cant undo this action",
                                      onConfirm: () => {
                                        handleDelete(item.user_id);
                                      },
                                    })
                                  }
                                ></DeleteIcon>
                              </LightTooltip>
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
      )}
      {userForm && !currentUserId ? <AddVendor /> : ""}

      {currentUserId && userForm ? (
        <AddVendor
          currentUserId={currentUserId}
          vendorDetails={vendorDetails}
        />
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

VendorList.propTypes = {
  className: PropTypes.string,
};
export default VendorList;
