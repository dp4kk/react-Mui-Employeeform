import React, { useState } from 'react'
import EmployeeForm from './EmployeeForm'
import PageHeader from "../../components/PageHeader";
import GroupIcon from "@material-ui/icons/Group";
import { Paper,makeStyles, TableBody, TableRow, TableCell ,Toolbar, InputAdornment} from '@material-ui/core';
import useTable from '../../components/useTable'
import * as employeeService from '../../services/EmployeeService'
import Input from '../../components/controls/Input'
import Button from '../../components/controls/Button'
import { Search ,  } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add'
import Popup from '../../components/Popup'
import ActionButton from '../../components/controls/ActionButton'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import CloseIcon from '@material-ui/icons/Close'
import Notification from '../../components/Notification'
import ConfirmDialog from '../../components/ConfirmDialog'
const useStyles=makeStyles(theme=>({
    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3)
    },
    searchBar:{
      width:'75%'
    },
    newButton:{
      position:'absolute',
      right:'10px',
    }
}))
  const headCells=[
    {id:'fullName' ,label:'Employee Name'},
    {id:'email',label:'Email Address(Personal)'},
    {id:'city',label:'City'},
    {id:'mobile',label:'Mobile Number'},
    {id:'actions',label:'Actions',disableSorting:true}
  ]
const Employees = () => {
    const classes=useStyles()
    const [records,setRecords]=useState(employeeService.getAllEmployees())
    const [filterFn,setFilterFn]=useState({fn:items=>{return items}})
    const [openPopup,setOpenPopup]=useState(false)
    const [recordForEdit,setRecordForEdit]=useState(null)
    const [notify,setNotify]=useState({isOpen:false,message:'',type:''})
    const [confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subtitle:''})
    const {TblContainer,TblHead,TblPagination,recordsAfterPagingAndSorting}=useTable(records,headCells,filterFn)
  
    const handleSearch=(e)=>{
      let target=e.target;
      setFilterFn({
        fn:items=>{
          if(target.value=='')
          return items;
          else
          return(items.filter(x=>x.fullName.includes(target.value)))
        }
      })
    }
       
      const addOrEdit=(employee,resetForm)=>{
        if(employee.id==0)
          employeeService.insertEmployee(employee);
          else 
          employeeService.updateEmployee(employee)
          resetForm()
          setRecordForEdit(null)
          setOpenPopup(false)
          setRecords(employeeService.getAllEmployees())
          setNotify({
            isOpen:true,
            message:'Successfully submitted',
            type:'success'
          })
      }
          const openInPopup=(item)=>{
              setRecordForEdit(item)
            setOpenPopup(true)
          }

          const deleteRecord=(id)=>{
           setConfirmDialog({...confirmDialog,isOpen:false})
             employeeService.deleteEmployee(id)
             setRecords(employeeService.getAllEmployees())
             setNotify({
               isOpen:true,
               message:'Successfuly deleted',
               type:'error'
             })
          }

    return (
      <React.Fragment>
        <PageHeader
          title="Employee Details "
          subTitle="Add Delete and Sort Employee Records."
          icon={<GroupIcon fontSize="large" />}
        />
        <Paper className={classes.pageContent}>
          {/* */}
          <Toolbar>
            <Input
              label="Search Employee"
              className={classes.searchBar}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
            <Button
              text="Add new"
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.newButton}
              onClick={() => {setOpenPopup(true);
              setRecordForEdit(null)}}
            />
          </Toolbar>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell>
                    <ActionButton color="primary" onClick={()=>{openInPopup(item)}}><EditOutlinedIcon fontSize='small'/></ActionButton>
                    <ActionButton color="secondary" onClick={()=>{
                      //
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure you want to delete?",
                          onConfirm:()=>{ deleteRecord(item.id)},
                        });
                    }}>
                      
                      <CloseIcon fontSize='small'/> </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Paper>
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          title="Employee Form"
        >
          <EmployeeForm addOrEdit={addOrEdit} recordForEdit={recordForEdit}/>
        </Popup>
                <Notification notify={notify} setNotify={setNotify}/>
                <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>
      </React.Fragment>
    );
}

export default Employees
