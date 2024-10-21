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

  const handleMspSelection = (clickedMsp) => {
//        console.log(clickedMssp);
    setSelectedMsp(clickedMsp.$id);
//    onClickMsp(clickedMsp, clientList);

    setClientList(clickedMsp.client);
  };


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
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  MSP Name
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
                  active={orderBy === 'devices'}
                  direction={orderBy === 'devices' ? order : 'asc'}
                  onClick={() => handleRequestSort('devices')}
                >
                  Devices
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'purchased_licenses'}
                  direction={orderBy === 'purchased_licenses' ? order : 'asc'}
                  onClick={() => handleRequestSort('purchased_licenses')}
                >
                  Purchased Licences
                </TableSortLabel>
              </TableCell>
              <TableCell>
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
                  <TableCell>{row.license_type}</TableCell>
                  <TableCell>{row.devices}</TableCell>
                  <TableCell>{row.purchased_licenses}</TableCell>
                  <TableCell>
                    <Chip
                        label={`${row.client.length} Client(s)`}
                            sx={{
                              backgroundColor: theme.palette.card.main,
                              color: theme.palette.card.contrastText,
                            }}
                        variant="outlined"
                        onClick={() => handleMspSelection(row)}
                      />
                  </TableCell>
                </TableRow>
                {
                            selectedMsp && selectedMsp == row.$id ? (
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell colSpan={5}>
                                <PaginatedClientTable mspId={selectedMsp} clientRows={clientList} />
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
