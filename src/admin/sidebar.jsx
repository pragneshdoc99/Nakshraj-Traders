/* eslint-disable */

import React, { useState, useEffect } from "react";
// import { Link as RouterLink, useLocation } from "react-router-dom";
// import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from "prop-types";
// import axios from 'axios'
// import config from '../common/utils/base-urls'
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Button,
  ListItem
} from "@material-ui/core";

// import ListIcon from '@material-ui/icons/List';
// import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
// import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
// import Logo from "./logo";
import clsx from "clsx";
// import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
// import PersonAddIcon from '@material-ui/icons/PersonAdd';
// import PostAddIcon from '@material-ui/icons/PostAdd';
// import UserContext from '../Context'
// import { userCredential } from '../user_credential';
// import firebase from "../firebase";
// import { useTranslation } from "react-i18next";
// import LocationCityOutlinedIcon from '@material-ui/icons/LocationCityOutlined';
import FindInPageIcon from '@material-ui/icons/FindInPage';
// import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
// import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined';
import PersonPinOutlinedIcon from '@material-ui/icons/PersonPinOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';

const useStyles = makeStyles(theme => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)"
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64
  },

  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: "#000",
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%"
  },
  icon: {
    marginLeft: theme.spacing(1)
  },
  title: {
    marginLeft: "auto"
  },
  iconEng: {
    marginRight: theme.spacing(1)
  },
  titleEng: {
    marginRight: "auto"
  },
  active: {
    color: theme.palette.primary.main,
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium
    },
    "& $icon": {
      color: theme.palette.primary.main
    }
  }
}));

const Sidebar = ({
  className,
  onMobileClose,
  openMobile,
  sideOptionSelected,
  callBackLanguageSelected,
  // languageChanged
}) => {
  // const { t } = useTranslation();
  // const { i18n } = useTranslation();

  const classes = useStyles();
  const [userrole, setuserRole] = useState("USER");
  const [hideMenu, sethideMenu] = useState(false);


  useEffect(() => {
    // console.log("SIDE BAR :: ", languageChanged);
    if (openMobile && onMobileClose) {
      onMobileClose();
    }

    let userRole = localStorage.getItem("userRole");
    setuserRole(userRole)
    // axios.post(`${config.serverUrl}auth/validateuser`, {
    //   token: localStorage.getItem('token')
    // }).then(res => {
    //   //console.log("User Data", res.data.role)
    //   setuserRole(res.data.role);

    // }).catch(err => {
    //   //console.log('error occured', err)
    //   if (err.response.status == 500) {

    //     // alert(err.response.data.msg)
    //   }
    // })
  },
    []
  );
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box p={2}>
        <List className="blackcolor">

          <ListItem className={clsx(classes.item, className)} disableGutters>
            <Button
              activeclassname={classes.active}
              className={classes.button}
              onClick={() => onClickDashboard("Dashboard")}
            >
              <DashboardOutlinedIcon className={classes.iconEng} size="20" />
              <span className={classes.titleEng}>Dashboard</span>

            </Button>
          </ListItem>

          <ListItem className={clsx(classes.item, className)} disableGutters>
            <Button
              activeclassname={classes.active}
              className={classes.button}
              onClick={() => onClickDashboard("Order")}
            >
              <AssignmentIndOutlinedIcon className={classes.iconEng} size="20" />
              <span className={classes.titleEng}>Order</span>
            </Button>
          </ListItem>

          <ListItem className={clsx(classes.item, className)} disableGutters>
            <Button
              activeclassname={classes.active}
              className={classes.button}
              onClick={() => onClickDashboard("invoice")}
            >
              <AssignmentIndOutlinedIcon className={classes.iconEng} size="20" />
              <span className={classes.titleEng}>Invoice List</span>
            </Button>
          </ListItem>

          <ListItem className={clsx(classes.item, className)} disableGutters>
            <Button
              activeclassname={classes.active}
              className={classes.button}
              onClick={() => onClickDashboard("Product List")}
            >
              <ListAltIcon className={classes.iconEng} size="20" />
              <span className={classes.titleEng}>Product List</span>
            </Button>
          </ListItem>
          
          {/* {userrole === "ADMIN" && */}
            <ListItem className={clsx(classes.item, className)} disableGutters>
              <Button
                activeclassname={classes.active}
                className={classes.button}
                onClick={() => onClickDashboard("User List")}
              >
                <PeopleOutlineIcon className={classes.iconEng} size="20" />
                <span className={classes.titleEng}>User List</span>
              </Button>
            </ListItem>
          {/* } */}

          <ListItem className={clsx(classes.item, className)} disableGutters>
            <Button
              activeclassname={classes.active}
              className={classes.button}
              onClick={() => onClickDashboard("analytics")}
            >
              <ListAltIcon className={classes.iconEng} size="20" />
              <span className={classes.titleEng}>analytics</span>
            </Button>
          </ListItem>

          {/* {(userrole === "ADMIN" || userrole === "VENDOR") && */}
            {/* <ListItem className={clsx(classes.item, className)} disableGutters>
              <Button
                activeclassname={classes.active}
                className={classes.button}
                onClick={() => onClickDashboard("Vendor List")}
              >
                <AssignmentIndOutlinedIcon className={classes.iconEng} size="20" />
                <span className={classes.titleEng}>Vendor List</span>
              </Button>
            </ListItem> */}
          {/* } */}

          {/* {(userrole === "ADMIN" || userrole === "SERVICE_PROVIDER") && */}
            {/* <ListItem className={clsx(classes.item, className)} disableGutters>
              <Button
                activeclassname={classes.active}
                className={classes.button}
                onClick={() => onClickDashboard("ServiceProvider List")}
              >
                <PersonPinOutlinedIcon className={classes.iconEng} size="20" />
                <span className={classes.titleEng}>Service Provider List</span>
              </Button>
            </ListItem> */}
          {/* } */}

          

        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  function onClickDashboard(value) {
    if (value === "Edit Stall") {
      window.location.href = "/stall/" + localStorage.getItem("projectId");
    } else if (value === "Preview Stall") {
      // window.location.href = "/view/" + localStorage.getItem("projectId");
      window.open("/view/" + localStorage.getItem("projectId"), '_blank');
    } else {
      sideOptionSelected(value);
    }
    onMobileClose();
  }



  return (
    <div>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

Sidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default Sidebar;
