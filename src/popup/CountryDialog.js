/* eslint-disable */

import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// import { getSuspectDetails } from '../common/network/project-container-utils';
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
  DialogContentText,
  Fab,
  Avatar,
  CircularProgress
} from '@material-ui/core'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation'
import axios from 'axios'
import Config from '../common/utils/base-urls'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import AlertDialog from './AlertDialog'
// import { uploadFiles } from "../creator/factoryjs/asset-uploader-factory";
import AddIcon from '@material-ui/icons/Add'
// import { getUserToken } from "../creator/factoryjs/util-factory";
// import { CaseTypeProjectNetworkProvince } from "../creator/factoryjs/projectlist-network-factory";
// import serverUrl from '../common/utils/base-urls';

import '../css/topbar/topbar.css'

const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    textAlign: 'center'
  },
  dialogContent: {
    textAlign: 'center'
  },
  dialogAction: {
    justifyContent: 'center'
  },
  titleIcon: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      cursor: 'default'
    },
    '& .MuiSvgIcon-root': {
      fontSize: '8rem'
    }
  }
}))

export default function CountryDialog(props) {
  const { open, onClose, currentUserId } = props
  //console.log("USER Id", currentUserId)
  const classes = useStyles()
  const [alertDialog, setAlertDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: ''
  })
  const [typeSpin, setTypeSpin] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [mailerror, setMailError] = useState(false)
  const { t } = useTranslation()

  const setAlertDialogfunc = () => {
    setAlertDialog({
      ...alertDialog,
      isOpen: false,
      title: '',
      subTitle: ''
    })
  }

  const [typeArray, setTypeArray] = useState({
    userCountry: ''
    // userState: ''
  })

  const [updateData, setUpdateData] = React.useState(false)

  useEffect(() => {
    // console.log("currentUserData :: ",currentUserData);
    if (currentUserId) {
      // getUserToken().then(token => {
      //     axios.post(serverUrl.serverUrl + 'caseProvince/' + currentUserId, {},
      //         {
      //             headers: {
      //                 'x-access-token': token
      //             },
      //             token: token
      //         }).then(currentUserData => {
      //             //console.log('Current User Details :: ', currentUserData.data);
      //             // setUpdateForm(true)
      //             setTypeArray({
      //                 userCountry: currentUserData.data.userCountry ? currentUserData.data.userCountry : '',
      //                 userState: currentUserData.data.userState ? currentUserData.data.userState : '',
      //             })
      //             setUpdateData(true)
      //         }).catch(e => {
      //             console.error('error : ', e);
      //         });
      // })
    }
  }, [])

  //console.log(typeArray)

  const handleTypeChange = event => {
    setTypeArray({
      ...typeArray,
      [event.target.name]: event.target.value
    })
    //console.log('caseDetails', typeArray)
  }

  {
    /* Translation-content */
  }
  const handleCloseType = () => {
    setTypeSpin(true)
    if (!typeArray.userCountry) {
      setTypeSpin(false)
      setAlertDialog({
        isOpen: true,
        title: 'please type in all required fields'
      })
    }
    // else if (!typeArray.userState) {
    //   setTypeSpin(false)
    //   setAlertDialog({
    //     isOpen: true,
    //     title: 'please type in all required fields'
    //   })
    // }
    else {
      console.log('PAIN :: ', typeArray.userCountry)
      //   console.log('userState :: ', typeArray.userState)

      const token = localStorage.getItem('token')
      const userPlaceData = {
        countryName: typeArray.userCountry
        // userState: typeArray.userState,
      }

      axios
        .post(`${Config.serverUrl}admin/createCountry`, userPlaceData, {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          setTypeSpin(false)
          props.onClose()
          setTypeArray({
            ...typeArray,
            countryName: ''
            // userState: ''
          })
          setAlertDialog({ isOpen: true, title: 'Details added successfully' })
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  }
  {
    /* Translation-content */
  }

  // const handleUpdateType = () => {

  //     if (!typeArray.userCountry) {
  //         setAlertDialog({
  //             isOpen: true,
  //             title: "please type in all required fields"
  //         });
  //     } else  if (!typeArray.userState) {
  //         setAlertDialog({
  //             isOpen: true,
  //             title: "please type in all required fields"
  //         });
  //     } else {
  //         setTypeSpin(false)

  //         // getUserToken().then(token => {
  //         //     const caseTypeObject = {
  //         //         userCountry: typeArray.userCountry,
  //         //         userState: typeArray.userState,
  //         //     }
  //         //     getUserToken().then(token => {
  //         //         axios.put(Config.serverUrl + 'caseProvince/' + currentUserId, caseTypeObject, {
  //         //             headers: {
  //         //                 'x-access-token': token
  //         //             }
  //         //         })
  //         //             .then(res => {
  //         //                 //console.log("RES :: ", res.data);
  //         //                 props.onClose()
  //         //                 setTypeSpin(false)
  //         //                 setTypeArray({
  //         //                     ...typeArray,
  //         //                     userCountry: ''
  //         //                     userState: ''
  //         //                 })
  //         //                 setAlertDialog({ isOpen: true, title: t('case-entry-form_detailsaddedsuccessfully') })

  //         //                 // setOpenStation(false);
  //         //             })
  //         //     })

  //         // })
  //     }
  // };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        fullWidth
        // maxWidth="md"
        onClose={onClose}
        aria-labelledby='form-dialog-title'
        maxWidth='xs'
      >
        {/* Translation-content */}
        <DialogTitle id='form-dialog-title' className={'txtleft'}>
          {'Country Form'}
        </DialogTitle>
        <DialogContent dividers style={{ overflowX: 'hidden' }}>
          {/* Translation-content */}
          <DialogContentText className={'txtleft'}>
            {
              'After adding country and state details it will be available in dropdown of the country and state'
            }
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                name='userCountry'
                onChange={handleTypeChange}
                value={typeArray.userCountry}
                variant='outlined'
                label={'Country'}
                type='text'
                fullWidth
                autoFocus
                id='countryname'
              />
            </Grid>

            {/* <Grid item md={6} xs={12}>
              <TextField
                name='userState'
                onChange={handleTypeChange}
                value={typeArray.userState}
                variant='outlined'
                label={'State'}
                type='text'
                fullWidth
                id='statename'
              />
            </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color='primary'
            variant='contained'
            style={{ width: '160px', margin: '5px' }}
          >
            {/* Translation-content */}
            <CancelIcon className={'btnRightDetails'} />
            {'Cancle'}
          </Button>
          {typeSpin ? (
            <CircularProgress
              color='secondary'
              style={{ margin: '5px' }}
              size={20}
            />
          ) : (
            ''
          )}
          {!updateData && (
            <Button
              onClick={handleCloseType}
              disabled={typeSpin}
              color='primary'
              variant='contained'
              style={{ width: '160px', margin: '5px' }}
            >
              {/* Translation-content */}
              <AddCircleIcon className={'btnRightDetails'} /> {'Add'}
            </Button>
          )}
          {/* {updateData && */}
          {/* <Button onClick={handleUpdateType} disabled={typeSpin} color="primary" variant="contained" style={{ width: '100px', margin: '5px' }}>
                    

                            <AddCircleIcon className={"btnRightDetails"} />
                            {"Update"}
                        </Button> */}
          {/* } */}
        </DialogActions>
      </Dialog>
      <AlertDialog
        alertDialog={alertDialog}
        setAlertDialog={setAlertDialogfunc}
      />
    </React.Fragment>
  )
}
