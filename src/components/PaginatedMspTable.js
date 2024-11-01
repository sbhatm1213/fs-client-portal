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
  Checkbox,
  Button
} from '@mui/material';
import theme from '../theme.js';
import DownloadIcon from '@mui/icons-material/Download';
import Papa from 'papaparse';
import PaginatedClientTable from './PaginatedClientTable.js';


const PaginatedMspTable = ({ msspId, mspRows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('msp_name');

  const [selectedMsp, setSelectedMsp] = useState(null);
  const [selectedMspName, setSelectedMspName] = useState(null);
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
    row.msp_name.toLowerCase().includes(filterText.toLowerCase())
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
    setSelectedMspName(clickedMsp.msp_name);
//    onClickMsp(clickedMsp, clientList);
    setClientList(clickedMsp.client_ids);
  };

  const closeClientTable = (event) => {
    event.preventDefault();
    setSelectedMsp(null);
    setClientList([]);
  };


    const exportToCSV = () => {

        const processedRows = [];

        for (let i = 0; i < sortedRows.length; i++) {
            const row = sortedRows[i];
            processedRows.push({
                'ID': row.$id,
                'NAME': row.msp_name,
                'CUSTOMER TYPE': row.customer_type,
                'LICENSE TYPE': row.license_type,
                'SPLA': row.spla_license,
                'DEVICES': row.devices,
                'PURCHASED LICENSES': row.purchased_licenses,
                'CLIENT COUNT': row.client_ids.length,
            });

            // Loop through clients
            for (let j = 0; j < row.client_ids.length; j++) {
                const clientObj = row.client_ids[j];
                processedRows.push({
                    'ID': clientObj.$id,
                    'NAME': clientObj.client_name,
                    'CUSTOMER TYPE': clientObj.customer_type,
                    'LICENSE TYPE': clientObj.license_type,
                    'SPLA': clientObj.spla_license,
                    'DEVICES': clientObj.active_licenses,
                    'PURCHASED LICENSES': clientObj.total_licenses
                });
            }
        }
        console.log(processedRows);
      const csv = Papa.unparse(processedRows);

      const date = new Date();
      const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const fileName = `MSP_LIST_${dateString}.csv`;

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    };


  return (
    <Paper elevation={2} >
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

        <Table stickyHeader size='small'>
          <TableHead sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', width: '22%' }}>
                <TableSortLabel
                  active={orderBy === 'msp_name'}
                  direction={orderBy === 'msp_name' ? order : 'asc'}
                  onClick={() => handleRequestSort('msp_name')}
                >
                  MSP Name
                </TableSortLabel>
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold', width: '8%' }}>
                <TableSortLabel
                  active={orderBy === 'customer_type'}
                  direction={orderBy === 'customer_type' ? order : 'asc'}
                  onClick={() => handleRequestSort('customer_type')}
                >
                  Type
                </TableSortLabel>
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
                  active={orderBy === 'client_ids'}
                  direction={orderBy === 'client_ids' ? order : 'asc'}
                  onClick={() => handleRequestSort('client_ids')}
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
                  <TableCell>{row.msp_name}</TableCell>
                  <TableCell align='center'>{row.customer_type.toUpperCase()}</TableCell>
                  <TableCell>{row.license_type}</TableCell>
                  <TableCell align='center'>
                        <Checkbox size='small'
                                  checked={row.spla_license} disabled />
                  </TableCell>
                  <TableCell align='right'>{row.purchased_licenses}</TableCell>
                  <TableCell align='right'>{row.devices}</TableCell>
                  <TableCell align='center'>
                    <Chip
                        label={`${row.client_ids.length} Client(s)`}
                            sx={{
                              backgroundColor: theme.palette.card.main,
                              color: theme.palette.card.contrastText,
                              width: '100px',
                              textAlign: 'center',
                              '&:hover': {
                                  backgroundColor: theme.palette.card.contrastText,
                                  color: theme.palette.card.main,
                                },
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
                                <PaginatedClientTable mspId={selectedMsp}
                                                      clientRows={clientList}
                                                      closeTable={closeClientTable}
                                                      mspName={selectedMspName} />
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
