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
import history from '../utils/History';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import RequestLoan from '../components/payment/RequestLoan';

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
    tablePagination: {
    },
    tablePaginationCaption: {
        color: 'white',
    },
    tablePaginationSelectIcon: {
        color: 'white',
    },
    tablePaginationSelect: {
        color: 'black',
    },
    tablePaginationActions: {
        color: 'white',
    },
}));

const Loans = observer(() => {
    const classes = useStyles();
    const value = useContext(AppContext);
    const { rootStore: { loanStore, userStore } } = value;
    const { loans } = loanStore;
    const { user } = userStore;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, loans.length - page * rowsPerPage);

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(parseInt(event.target.value, 10));
    }

    const fetchLoans = () => {
        loanStore.initFetch(user);
    };

    useEffect(fetchLoans, []);

    const handlePayEvent = (loan) => {
        loanStore.payLoan(loan, user);
        userStore.fetchAccount();
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
    }

    const handleBackClick = () => {
        history.goBack();
    };

    return (
        <div>
            <img style={{ width: '50px', height: '50px', marginLeft: '15px', marginTop: '15px', cursor: 'pointer' }}
                alt="" src="/img/back-white.png" onClick={handleBackClick} />
            <RequestLoan userStore={userStore} />
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
                        {loans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(loan => (
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
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={loans.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'Rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                classes={{
                                    caption: classes.tablePaginationCaption,
                                    selectIcon: classes.tablePaginationSelectIcon,
                                    select: classes.tablePaginationSelect,
                                    actions: classes.tablePaginationActions,
                                }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        </div>
    );
});

export default Loans;
