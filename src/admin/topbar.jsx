/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import firebase from "../firebase";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import InputIcon from "@material-ui/icons/Input";
import PersonIcon from "@material-ui/icons/Person";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LanguageIcon from '@material-ui/icons/Language';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
// import logoImg from "../images/cyberLogo.png";
import logoImg from "../images/NT.png";

// import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
// import HelpIcon from '@material-ui/icons/Help';
// import VideoLabelIcon from '@material-ui/icons/VideoLabel';
// import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
// import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ChangePasswordDialog from '../popup/ChangePasswordDialog';
// import ProfileDetailsDialog from './ProfileDetailsDialog';


const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  sideOptionSelected,
  ...rest
}) => {

  const { t } = useTranslation();
  const classes = useStyles();
  const [notifications] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [Help, setHelp] = React.useState(null);
  const [openHelp, setOpenHelp] = React.useState(false);
  const [changePassword, setChangePassword] = React.useState(false);
  const [profile, setProfile] = React.useState(false);

  const userrole = localStorage.getItem("userrole");

  useEffect(() => {


  }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClickhelp = event => {
    setHelp(event.currentTarget);
    setOpenHelp(true);
  };
  const handleClickhome = event => {
    window.location.href = "/"
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    setChangePassword(false)
    setProfile(false)
  };
  const handleClosehelp = () => {
    setHelp(null);
    setOpenHelp(false);
  };
  const { i18n } = useTranslation();


  return (
    <div>
      {!changePassword && !profile &&
        <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
          <Toolbar>
            <Box flexGrow={1} />
            <div className="centertitleadmin">
              <Hidden lgUp>
                <IconButton color="inherit" onClick={onMobileNavOpen}>
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <img src={logoImg} style={{ width: '50px' }}></img>
              {/* <h1 className="mobilesize">ADMIN PANEL</h1> */}
            </div>

            {/* <div>

              <IconButton color="inherit" onClick={handleClickhelp}>

                <LanguageIcon
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClickhelp}
                >
                  Language Menu
                </LanguageIcon>
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={Help}
                keepMounted
                open={openHelp}
                onClose={handleClosehelp}
                style={{ top: "60px" }}
              >

                <MenuItem >
                  <a className="infosize">عربي</a>
                  <a onClick={() => changeLanguage("ar")} className="infosize">عربي</a>
                </MenuItem>


                <MenuItem >
                  <a className="infosize">English</a>
                  <a onClick={() => changeLanguage("en")} className="infosize">English</a>
                </MenuItem>
              </Menu>

            </div> */}
            {/* Profile menu */}
            <div>
              <Tooltip title="click here to see your details">
                <IconButton color="inherit" onClick={handleClick}>
                  <PersonIcon
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    Open Menu
                  </PersonIcon>
                </IconButton>
              </Tooltip>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                style={{ top: "60px" }}
              >
                {/* <MenuItem onClick={() => handlePofile()}>
                  <Typography className="txtright" >
                    <IconButton color="inherit">
                      <AccountCircleIcon />
                    </IconButton>
                    Profile
                  </Typography>
                  </MenuItem> */}
                <Tooltip title="Click Here To Logout">
                  <MenuItem onClick={() => onLogout()}>
                    {/* <Typography className={languageChanged ? "txtleft" : "txtright"} > */}
                    <Typography className="txtright" >
                      <IconButton color="inherit">
                        <InputIcon />
                      </IconButton >
                      Logout
                    </Typography>
                  </MenuItem>
                </Tooltip>

                {/* <MenuItem onClick={() => handleChangePassword()}>
                  <Typography className="txtright">
                    <IconButton color="inherit">
                      <EditIcon />
                    </IconButton>
                    Change Password
                  </Typography>
                </MenuItem> */}
              </Menu>
            </div>
            {/* </Hidden> */}
          </Toolbar>
        </AppBar>
      }

      {changePassword &&
        <ChangePasswordDialog open={changePassword} onClose={() => handleClose()} />
      }

      {/* {profile &&
        <ProfileDetailsDialog open={profile} onClose={() => handleClose()} />
      } */}
    </div>

  );

  function onLogout() {
    console.warn("Logged Out");
    const auth = firebase.auth();
    auth.signOut().then((result) => {
      console.log("Success....Sign-out successful");
      localStorage.clear();
      window.location.href = "/";
    }).catch((error) => {
      // An error happened.
      console.log("Failed to do")
    });
  }

  function handleChangePassword() {
    setChangePassword(true);
  }

  function handlePofile() {
    setProfile(true);
  }


};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
