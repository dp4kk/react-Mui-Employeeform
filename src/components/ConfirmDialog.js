import {Dialog, DialogActions, DialogContent, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import Button from '../components/controls/Button'

const useStyles=makeStyles(theme=>({
    dialog:{
        padding:theme.spacing(2),
        position:'absolute',
        top:theme.spacing(5)
    },
    dialogContent:{
        textAlign:'center'
    },
    dialogAction:{
        justifyContent:'center'
    }

}))

export default function ConfirmDialog(props) {
    const {confirmDialog,setConfirmDialog}=props;
    const classes=useStyles();
    return (
        <Dialog open={confirmDialog.isOpen} classes={{paper:classes.dialog}}>
        <DialogContent className={classes.dialogContent}>
        <Typography variant='h6' >{confirmDialog.title}</Typography>
        <Typography variant='subtitle2'>{confirmDialog.subtitle}</Typography>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
        <Button text='No' color='default' onClick={()=>setConfirmDialog({...confirmDialog,isOpen:false})}/>
        <Button text='Yes' color='secondary' onClick={confirmDialog.onConfirm}/>
        </DialogActions>
        </Dialog>
    )
}
