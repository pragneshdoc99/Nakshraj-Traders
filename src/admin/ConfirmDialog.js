/* eslint-disable */

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  IconButton,
  Button
} from "@material-ui/core";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import { useTranslation } from "react-i18next";

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
    backgroundColor: theme.palette.success.dark,
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.success.dark,
      cursor: "default"
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem"
    }
  }
}));

export default function ConfirmDialog(props) {
  const { t } = useTranslation();
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocationIcon color="primary" />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        {/* Translation-content */}
        <Button
          text="No"
          color="primary"
          variant="contained"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          No
        </Button>
        {/* Translation-content */}
        <Button
          text="Yes"
          color="secondary"
          variant="contained"
          onClick={confirmDialog.onConfirm}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
