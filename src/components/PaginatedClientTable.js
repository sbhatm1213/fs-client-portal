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
  Checkbox,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import Papa from 'papaparse';
import theme from '../theme.js';


const PaginatedClientTable = ({ mspId, clientRows, closeTable, mspName }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('client_name');


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
    row.client_name.toLowerCase().includes(filterText.toLowerCase())
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

      const exportToCSV = () => {
        const processedRows = sortedRows.map((row) => ({
            'ID': row.id,
            'NAME': row.name,
            'CUSTOMER TYPE': row.customer_type,
            'LICENSE TYPE': row.license_type,
            'SPLA': row.spla_license,
            'DEVICES': row.active_licenses,
            'PURCHASED LICENSES': row.purchased_licenses,
        }));
        console.log(processedRows);
      const csv = Papa.unparse(processedRows);

      const date = new Date();
      const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const fileName = `CLIENT_LIST_OF_${mspName}_${dateString}.csv`;

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    };


  return (
    <Paper style={{ width: '90%', margin: 'auto' }}>
          <Box display="flex" alignItems="center" justifyContent="flex-end" width="100%" mb={0}>

      <IconButton onClick={(event) => handleTableClose(event)} >
          <CloseIcon fontSize="small"  />
        </IconButton>
        </Box>
      <TableContainer>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '16px' }}>
          <TextField
            label="Filter by Name"
            variant="outlined"
            size="small"
            value={filterText}
            onChange={handleFilterChange}
            style={{ width: '300px' }}
          />
          <Button variant="contained"
                      startIcon={<DownloadIcon />}
                      onClick={exportToCSV}
                      sx={{ textTransform: "none", fontWeight: "medium" }} >
                Export to CSV
          </Button>
          </div>

        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell  sx={{ fontWeight: 'bold', width: '30%' }}>
                <TableSortLabel
                  active={orderBy === 'client_name'}
                  direction={orderBy === 'client_name' ? order : 'asc'}
                  onClick={() => handleRequestSort('client_name')}
                >
                  Client Name
                </TableSortLabel>
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold', width: '6%' }}>
                <TableSortLabel
                  active={orderBy === 'customer_type'}
                  direction={orderBy === 'customer_type' ? order : 'asc'}
                  onClick={() => handleRequestSort('customer_type')}
                >
                  Type
                </TableSortLabel>
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
                  active={orderBy === 'purchased_licenses'}
                  direction={orderBy === 'purchased_licenses' ? order : 'asc'}
                  onClick={() => handleRequestSort('purchased_licenses')}
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
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align='center'>{row.customer_type.toUpperCase()}</TableCell>
                  <TableCell>{row.license_type}</TableCell>
                  <TableCell align='center'>
                        <Checkbox size='small' checked={row.spla_license} disabled />
                  </TableCell>
                  <TableCell align='right'>{row.purchased_licenses}</TableCell>
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
