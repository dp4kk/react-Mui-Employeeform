import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles=makeStyles({
    sideMenu:{
        display:'flex',
        flexDirection:'column',
        position:'absolute',
        left:'0px',
        width:'300px',
        height:'100%',
        backgroundColor:'#253053'
    }
})
 const SideMenu = () => {
    const classes=useStyles();
    console.log(classes);
    return (
        <div className={classes.sideMenu}>
            <h1></h1>
        </div>
    )
}
export default SideMenu