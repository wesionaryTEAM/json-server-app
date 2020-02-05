import React, { useEffect, useState, Props } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    marginRight: {
        marginRight: 10
    }
});
export interface IValues {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    address: string,
    description: string
}

export default function SimpleTable() {
    const classes = useStyles();
    const [data, setData] = useState([] as IValues[]);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        const customers = await axios.get(`http://localhost:5000/customers`);
        setData(customers.data);
        console.log(customers)
    }
    const deleteCustomer = async (event: any, id: number) => {
        event.persist();
       await axios.delete(`http://localhost:5000/customers/${id}`).then(data_ => {
            getData();

        })
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Contact Number</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(customer => (
                        <TableRow key={customer.first_name}>
                            <TableCell component="th" scope="row">
                            {customer.first_name} {customer.last_name}
                            </TableCell>                    
                            <TableCell align="right">{customer.email}</TableCell>
                            <TableCell align="right">{customer.phone}</TableCell>
                            <TableCell align="right">{customer.address}</TableCell>
                            <TableCell align="right">{customer.description}</TableCell>
                            <TableCell align="right">
                            <Link to={`edit/${customer.id}`}> <EditIcon className={classes.marginRight} /> </Link>
                               <DeleteIcon onClick={e => deleteCustomer(e, customer.id)} /> 
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
