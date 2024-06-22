/* eslint-disable */

import React,{ useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { getStationDetails } from '../common/network/project-container-utils';
import {
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    makeStyles,
    IconButton,
    Button,
    TextField,
} from "@material-ui/core";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import axios from 'axios';
import Config from '../common/utils/base-urls';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import AlertDialog from './AlertDialog'
// import { getUserToken, getUserUid } from "../creator/factoryjs/util-factory";
import "../css/topbar/topbar.css";

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: "absolute",
        top: theme.spacing(5)
    },
    dialogTitle: {
        textAlign: "center"
    },
    dialogContent: {
        textAlign: "center"
    },
    dialogAction: {
        justifyContent: "center"
    },
    titleIcon: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
            cursor: "default"
        },
        "& .MuiSvgIcon-root": {
            fontSize: "8rem"
        }
    }
}));

export default function ChangePasswordDialog(props) {
  const { open, onClose, currentUserId, languageChanged  } = props;
  // console.log("USER Id", currentUserId)
  const classes = useStyles();
  const [alertDialog, setAlertDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const { t } = useTranslation();


  const setAlertDialogfunc = () => {
    setAlertDialog({
        ...alertDialog,
        isOpen: false,
        title: '',
        subTitle: ''
    })
}

  const [changePasswordData, setChangePasswordData] = useState({
    newPassword : '',
    confirmPassword : ''
 })


 useEffect(() => {


 }, [])



    const handleChangePassword = (event) => {
        // console.log(event.target.name)
        // console.log(event.target)
        setChangePasswordData({
            ...changePasswordData,
            [event.target.name]: event.target.value
        });

    };
{/* Translation-content */}
    const handleResetPassword = () => {


        if (changePasswordData.newPassword === "") {
            // alert("Please Enter Station Code !"); 
            setAlertDialog({
                isOpen: true,
                title: "Please Enter New Password"
            }); 

        } else if (changePasswordData.confirmPassword === "") {
            // alert("Please Enter Station Name !");
            setAlertDialog({
                isOpen: true,
                title: "Please Enter Confrim Password"
            });
        } else {

            if (changePasswordData.newPassword === changePasswordData.confirmPassword) {
              
                props.onClose()
                window.location.href='/'

                // getUserToken().then(token=>{
                //     getUserUid().then(uid => {
                //         axios.put(`${Config.serverUrl}users/updatepwd/` +uid, {
                //             password:changePasswordData.newPassword
                //         },{
                //             headers: {
                //               'x-access-token':token 
                //             }
                //           }).then(res => {
                //                 // console.log("RES :: ", res);
                //                 props.onClose()
                //                 // setOpenStation(false);
                //                 window.location.href='/'
                //             }).catch(err=>{
                //                 console.log(err)
                //             })
                //     })
                // })
    
            } else {
                setAlertDialog({
                    isOpen: true,
                    title: "Not Match"
                });
            }

           
        }

    };


    return (
        <React.Fragment>

        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >

            <DialogTitle id="form-dialog-title" className={"txtleft"}>{"Change Password"}</DialogTitle>
            <DialogContent dividers>
                <Grid container
                    spacing={3} >
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label={"New Password"}
                            name="newPassword"
                            onChange={handleChangePassword}
                            required
                            value={changePasswordData.newPassword}
                            type="password"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            label={"Confrim Password"}
                            name="confirmPassword"
                            onChange={handleChangePassword}
                            required
                            value={changePasswordData.confirmPassword}
                            type="password"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                 

                </Grid>


            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onClose} variant="contained" style={{ width: '100px',  margin: '5px' }}>

                    <CancelIcon className={"btnRightDetails"} />
                   {"Cancle"}
                </Button>
                <Button color="primary" onClick={handleResetPassword} variant="contained" style={{ width: '100px',  margin: '5px' }}>

                    <AddCircleIcon className={"btnRightDetails"}  />
                    {"Add"}
                </Button>
            </DialogActions>
        
        </Dialog>
        <AlertDialog alertDialog={alertDialog} setAlertDialog={setAlertDialogfunc} />
        </React.Fragment>

    );
}
