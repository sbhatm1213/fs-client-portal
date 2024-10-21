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
  Chip
} from '@mui/material';
import theme from '../theme.js';


const PaginatedClientTable = ({ mspId, clientRows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

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
    <Paper>
      <TextField
        label="Filter by Name"
        variant="outlined"
        size="small"
        value={filterText}
        onChange={handleFilterChange}
        style={{ margin: '16px' }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === '$id'}
                  direction={orderBy === '$id' ? order : 'asc'}
                  onClick={() => handleRequestSort('$id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Client Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'license_type'}
                  direction={orderBy === 'license_type' ? order : 'asc'}
                  onClick={() => handleRequestSort('license_type')}
                >
                  Licence Type
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'active_licenses'}
                  direction={orderBy === 'active_licenses' ? order : 'asc'}
                  onClick={() => handleRequestSort('active_licenses')}
                >
                  Active Licenses
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'total_licenses'}
                  direction={orderBy === 'total_licenses' ? order : 'asc'}
                  onClick={() => handleRequestSort('total_licenses')}
                >
                  Total Licences
                </TableSortLabel>
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.$id}>
                  <TableCell>{row.$id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.license_type}</TableCell>
                  <TableCell>{row.active_licenses}</TableCell>
                  <TableCell>{row.total_licenses}</TableCell>

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
