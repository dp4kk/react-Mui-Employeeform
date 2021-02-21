import React from 'react'
import {AppBar, Grid, IconButton, Toolbar,Badge, InputBase,makeStyles} from '@material-ui/core'
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SearchIcon from "@material-ui/icons/Search";

const useStyles=makeStyles({
    root:{
        backgroundColor:'#fff',
        transform:'translateZ(0)'
    },
    searchInput:{
        opacity:'0.7',
        padding:'0px 8px',
        fontSize:'0.8rem',
        '&:hover':{
            backgroundColor:'#f2f2f2',
        },
        '& .MuiSvgIcon-root':{
            marginRight:'4px'

        }
    }
})
const Header = () => {
    const classes=useStyles();
    return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Grid container alignItems='center'>
            <Grid item >
              <InputBase className={classes.searchInput}
              placeholder='Search topics' 
              startAdornment={<IconButton><SearchIcon fontSize='small'/>
                </IconButton>}/>
            </Grid>
            <Grid item sm></Grid>
            <Grid item style={{alignItems:'center'}}>
              <IconButton>
                <Badge badgeContent={3} color='secondary'>
                  <NotificationsIcon fontSize='small'/>
                </Badge>
              </IconButton>
              <IconButton>
                <Badge badgeContent={4} color="primary">
                  <ChatIcon fontSize='small'/>
                </Badge>
              </IconButton>
              <IconButton>
                <PowerSettingsNewIcon fontSize='small'/>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
}

export default Header
