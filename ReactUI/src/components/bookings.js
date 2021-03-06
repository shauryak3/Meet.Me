import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
    Table, TableHead, TablePagination, TableBody, TableCell, TableRow
} from '@material-ui/core';
import BackendService from '../services/backendServices';

const columns = [
    { id: 'firstName', label: 'Name', minWidth: 120 },
    { id: 'fromTime', label: 'Appointment', minWidth: 90 },
    { id: 'status', label: 'Status', minWidth: 80 },
    { id: 'mobileNumber', label: 'Phone', minWidth: 90 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'notes', label: 'Additional Notes', minWidth: 90 },
];

let rows = [];

async function getBookings(id) {
    try {
        const practiceId = localStorage.getItem('userId');
        const serviceId = id;
        if (practiceId) {
            if (serviceId) {
                let response = await BackendService.getBookings({
                    practiceId: practiceId,
                    serviceId: serviceId
                });
                rows = response.data.data;
            }
        } else {
            window.location.pathname = '/signin';
        }
    } catch (error) {
        alert('Something went wrong');
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    tableWrapper: {
        maxHeight: 440,
        overflow: 'auto',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }
}));

export default function Bookings(props) {
    const { serviceId } = props;
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    getBookings(serviceId);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper >
    );
}