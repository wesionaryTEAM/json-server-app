import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    wrapper: {
        width:"100%",
        display:"flex"
    }
  }),
);

export interface IValues {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    address: string,
    description: string
}
export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}
const defaultValues: IValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    description: ""
}
function CreateCustomer<RouteComponentProps>() {
    const [values, setValues] = useState(defaultValues as IValues);

    const classes = useStyles();
    
    const handleChange = (event: any) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event:any) => {
        event.persist();
        axios.post(`http://localhost:5000/customers`, values).then(data => [
              
          ]);
    }

    return ( 
        <div className={classes.root}>
        <div className={classes.wrapper}>
        <Typography variant="h4" gutterBottom>
        h4. Heading
      </Typography>
        <TextField
          id="outlined-input"
          label="First Name"
          type="text"
          variant="outlined"
        />
        </div>
      </div>
    )
}

export default withRouter(CreateCustomer);