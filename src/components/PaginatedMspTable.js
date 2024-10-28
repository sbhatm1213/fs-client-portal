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
  Checkbox
} from '@mui/material';
import theme from '../theme.js';
import PaginatedClientTable from './PaginatedClientTable.js';


const PaginatedMspTable = ({ msspId, mspRows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const [selectedMsp, setSelectedMsp] = useState(null);
  const [clientList, setClientList] = useState([]);

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
  const filteredRows = mspRows.filter((row) =>
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

  const handleMspSelection = (event, clickedMsp) => {
    event.preventDefault();
//        console.log(clickedMssp);
    setSelectedMsp(clickedMsp.$id);
//    onClickMsp(clickedMsp, clientList);
    setClientList(clickedMsp.client);
  };

  const closeClientTable = (event) => {
    event.preventDefault();
    setSelectedMsp(null);
    setClientList([]);
  };


  return (
    <Paper elevation={2}>
      <TextField
        label="Filter by Name"
        variant="outlined"
        size="small"
        value={filterText}
        onChange={handleFilterChange}
        style={{ margin: '16px', width: '300px' }}
      />
      <TableContainer>
        <Table stickyHeader size='small'>
          <TableHead sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', width: '22%' }}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  MSP Name
                </TableSortLabel>
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold', width: '8%' }}>
                  Type
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold', width: '22%' }}>
                <TableSortLabel
                  active={orderBy === 'license_type'}
                  direction={orderBy === 'license_type' ? order : 'asc'}
                  onClick={() => handleRequestSort('license_type')}
                >
                  Licence Type
                </TableSortLabel>
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold', width: '8%' }}>
                <TableSortLabel
                  active={orderBy === 'spla_license'}
                  direction={orderBy === 'spla_license' ? order : 'asc'}
                  onClick={() => handleRequestSort('spla_license')}
                >
                  SPLA License
                </TableSortLabel>
              </TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold', width: '12%' }}>
                <TableSortLabel
                  active={orderBy === 'purchased_licenses'}
                  direction={orderBy === 'purchased_licenses' ? order : 'asc'}
                  onClick={() => handleRequestSort('purchased_licenses')}
                >
                  Purchased Licences
                </TableSortLabel>
              </TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold', width: '12%' }}>
                <TableSortLabel
                  active={orderBy === 'devices'}
                  direction={orderBy === 'devices' ? order : 'asc'}
                  onClick={() => handleRequestSort('devices')}
                >
                  Devices
                </TableSortLabel>
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold', width: '16%' }}>
                <TableSortLabel
                  active={orderBy === 'client'}
                  direction={orderBy === 'client' ? order : 'asc'}
                  onClick={() => handleRequestSort('client')}
                >
                  Client Count
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (<>
                <TableRow key={row.$id} selected={row.$id === selectedMsp} >
                  <TableCell>{row.name}</TableCell>
                  <TableCell align='center'>Reseller</TableCell>
                  <TableCell>{row.license_type}</TableCell>
                  <TableCell align='center'>
                        <Checkbox size='small'
                                  checked={row.spla_license} disabled />
                  </TableCell>
                  <TableCell align='right'>{row.purchased_licenses}</TableCell>
                  <TableCell align='right'>{row.devices}</TableCell>
                  <TableCell align='center'>
                    <Chip
                        label={`${row.client.length} Client(s)`}
                            sx={{
                              backgroundColor: theme.palette.card.main,
                              color: theme.palette.card.contrastText,
                              width: '100px',
                              textAlign: 'center'
                            }}
                        variant="outlined"
                        onClick={(event) => handleMspSelection(event, row)}
                      />
                  </TableCell>
                </TableRow>
                {
                            selectedMsp && selectedMsp == row.$id ? (
                          <TableRow>
                            <TableCell colSpan={7}>
                                <PaginatedClientTable mspId={selectedMsp} clientRows={clientList} closeTable={closeClientTable} />
                            </TableCell>
                          </TableRow>
                          ) : null
                }
                </>
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

export default PaginatedMspTable;
