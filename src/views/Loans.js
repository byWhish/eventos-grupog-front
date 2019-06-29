import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import AppContext from '../utils/context';
import { toFixedLocale, toLocalDateTime } from '../utils/local';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        backgroundColor: 'inherit',
    },
    table: {
        minWidth: 650,
    },
}));

const Loans = observer(() => {
    const classes = useStyles();
    const value = useContext(AppContext);
    const { rootStore: { loanStore } } = value;
    const { loans } = loanStore;

    const fetchLoans = () => {
        loanStore.initFetch();
    };

    useEffect(fetchLoans, []);

    const handlePayEvent = (loan) => {
        loanStore.payLoan(loan);
    };

    function PaymentButton(props) {
        const loan = props.loan;
        if (!loan.fullyPaid) {
            return (
                <TableCell align="right">
                    <img style={{ cursor: 'pointer' }} alt="" src="/img/pay.png" onClick={() => handlePayEvent(loan)} />
                </TableCell>
            );
        }
    };

    return (

        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell align="right">Valor</TableCell>
                        <TableCell align="right">Cuotas Totales</TableCell>
                        <TableCell align="right">Cuotas Restantes</TableCell>
                        <TableCell align="right">Cuotas a Pagar</TableCell>
                        <TableCell align="right">Deuda</TableCell>
                        <TableCell align="right">Pagar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loans.map(loan => (
                        <TableRow key={loan.id}>
                            <TableCell component="th" scope="row">{toLocalDateTime(new Date(loan.createdAt))}</TableCell>
                            <TableCell align="right">{toFixedLocale(loan.amount)}</TableCell>
                            <TableCell align="right">{loan.installments.length}</TableCell>
                            <TableCell align="right">{loan.amountOfRemainingInstallments}</TableCell>
                            <TableCell align="right">{loan.amountOfInstallmentsToPay}</TableCell>
                            <TableCell align="right">{toFixedLocale(loan.debt)}</TableCell>
                            <PaymentButton loan={loan} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
});

export default Loans;
