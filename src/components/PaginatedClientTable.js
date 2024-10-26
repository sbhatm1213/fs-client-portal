import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Paper,
  TableSortLabel,
  Chip,
  IconButton,
  Box,
  Checkbox
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../theme.js';


const PaginatedClientTable = ({ mspId, clientRows, closeTable }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');


    const handleTableClose = (event) => {
        closeTable(event);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
    setPage(0); // Reset to the first page when filtering
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Filter rows based on filterText
  const filteredRows = clientRows.filter((row) =>
    row.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Sort filtered rows
  const sortedRows = filteredRows.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <Paper style={{ width: '90%', margin: 'auto' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>

      <TextField
        label="Filter by Name"
        variant="outlined"
        size="small"
        value={filterText}
        onChange={handleFilterChange}
        style={{ margin: '16px', width: '300px' }}
      />
      <IconButton onClick={(event) => handleTableClose(event)} >
          <CloseIcon fontSize="small"  />
        </IconButton>
        </Box>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell  sx={{ fontWeight: 'bold', width: '30%' }}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Client Name
                </TableSortLabel>
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold', width: '6%' }}>
                  Type
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold', width: '30%' }}>
                <TableSortLabel
                  active={orderBy === 'license_type'}
                  direction={orderBy === 'license_type' ? order : 'asc'}
                  onClick={() => handleRequestSort('license_type')}
                >
                  Licence Type
                </TableSortLabel>
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold', width: '10%' }}>
                <TableSortLabel
                  active={orderBy === 'spla_license'}
                  direction={orderBy === 'spla_license' ? order : 'asc'}
                  onClick={() => handleRequestSort('spla_license')}
                >
                  SPLA Licence
                </TableSortLabel>
              </TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold', width: '12%' }}>
                <TableSortLabel
                  active={orderBy === 'total_licenses'}
                  direction={orderBy === 'total_licenses' ? order : 'asc'}
                  onClick={() => handleRequestSort('total_licenses')}
                >
                  Total Licences
                </TableSortLabel>
              </TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold', width: '12%' }}>
                <TableSortLabel
                  active={orderBy === 'active_licenses'}
                  direction={orderBy === 'active_licenses' ? order : 'asc'}
                  onClick={() => handleRequestSort('active_licenses')}
                >
                  Active Licenses
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.$id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align='center'>Corp</TableCell>
                  <TableCell>{row.license_type}</TableCell>
                  <TableCell align='center'>
                        <Checkbox size='small' checked={row.spla_license} disabled />
                  </TableCell>
                  <TableCell align='right'>{row.total_licenses}</TableCell>
                  <TableCell align='right'>{row.active_licenses}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PaginatedClientTable;
