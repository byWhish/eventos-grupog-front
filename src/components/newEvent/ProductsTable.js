import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const ProductsTable = ({
    items, setItems, deleteColumn, editColumn, setProduct,
}) => {
    const classes = useStyles();

    const handleDeleteItem = id => () => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleEditItem = product => () => {
        setProduct(product);
        handleDeleteItem(product.id).apply();
    };

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Nombre</TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="right">Rendimiento</TableCell>
                        {deleteColumn && (
                            <TableCell align="right">Editar</TableCell>
                        )}
                        {deleteColumn && (
                            <TableCell align="right">Borrar</TableCell>
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
                                    <a className="deleteLink" role="button" tabIndex={0} onClick={handleDeleteItem(row.id)}>Borrar</a>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default ProductsTable;
