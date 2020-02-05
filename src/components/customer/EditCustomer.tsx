import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter, useHistory, useParams } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Typography, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
        display: "block"
      },
    },
    wrapper: {
        width:"100%",
    },
    formInput: {
      width: "100%"
    },
    button: {
      margin: theme.spacing(1),
    },
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
const values: IValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    description: ""
}
function EditCustomer<RouteComponentProps>() {
    const [values, setValues] = useState({} as IValues);
    const { id } = useParams();


    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const customer = await axios.get(`http://localhost:5000/customers/${id}`)
        await setValues(customer.data);
        console.log(values)
    }
    
    const handleChange = (event: any) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event:any) => {
        event.persist();
        axios.patch(`http://localhost:5000/customers/${id}`, values).then(data => {
              history.goBack()
    });
    }

    return ( 
        <div className={classes.root}>
        <div className={classes.wrapper}>
        <TextField
          id="outlined-input"
          name="first_name"
          value={values.first_name}
          label="First Name"
          type="text"
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
         <TextField
          id="outlined-input"
          name="last_name"
          value={values.last_name}
          label="Last Name"
          type="text"
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="email"
          value={values.email}
          label="Email Address"
          type="email"
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="phone"
          value={values.phone}
          label="Contact Number"
          type="text"
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="address"
          label="Address"
          value={values.address}
          type="text"
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="description"
          value={values.description}
          label="Description"
          type="text"
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={handleSubmit}
      >
        Update
      </Button>
        </div>
      </div>
    )
}

export default withRouter(EditCustomer);