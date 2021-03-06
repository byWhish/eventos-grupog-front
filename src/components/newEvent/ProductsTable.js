import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {observer} from "mobx-react-lite";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 400,
        backgroundColor: 'rgba(0, 0, 0, .8)',
    },
}));

const ProductsTable = observer(({
    items, deleteColumn, editColumn, selectColumn, setProduct, deleteItem, selectItem,
}) => {
    const classes = useStyles();

    const handleDeleteItem = product => () => {
        deleteItem(product);
    };

    const handleEditItem = product => () => {
        setProduct(product);
        handleDeleteItem(product.id).apply();
    };

    const handleSelectItem = product => () => {
        selectItem(product);
    };

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Nombre</TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="right">Rendimiento</TableCell>
                        {editColumn && (
                            <TableCell align="right">Editar</TableCell>
                        )}
                        {deleteColumn && (
                            <TableCell align="right">Borrar</TableCell>
                        )}
                        {selectColumn && (
                            <TableCell align="right"></TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(row => (
                        <TableRow key={row.name}>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.amountLimit}</TableCell>
                            {editColumn && (
                                <TableCell align="right">
                                    <a className="deleteLink" role="button" tabIndex={0} onClick={handleEditItem(row)}>Editar</a>
                                </TableCell>
                            )}
                            {deleteColumn && (
                                <TableCell align="right">
                                    <a className="deleteLink" role="button" tabIndex={0} onClick={handleDeleteItem(row)}>Borrar</a>
                                </TableCell>
                            )}
                            {selectColumn && (
                                <TableCell align="right">
                                    <a className="deleteLink" role="button" tabIndex={0} onClick={handleSelectItem(row)}>{'>>>'}</a>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
});

export default ProductsTable;
