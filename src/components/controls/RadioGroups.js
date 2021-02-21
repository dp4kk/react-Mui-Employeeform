import React from 'react'
import {FormControl, FormLabel, RadioGroup, FormControlLabel,Radio} from '@material-ui/core'
export default function RadioGroups(props) {
    const {name,label,value,onChange,items}=props;
    return (
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <RadioGroup
          row={true}
          name={name}
          value={value}
          onChange={onChange}
        >
        {
            items.map((item)=>(
             <FormControlLabel value={item.id} key={item.id} control={<Radio/>} label={item.title}/>   
            ))
        }
          
        </RadioGroup>
      </FormControl>
    );
}
