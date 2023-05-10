import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import useCurrentTheme from '../../../consts/theme';
import colors from '../../../consts/colorPallete';
import { ContractProposeRemoval } from '../../../consts/smartContractFunctions';
import Button from '@mui/material/Button';
import TableCreation from '../../../components/TableCreation';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import InfoIcon from '@mui/icons-material/Info';
import { GetMinersRows, minerColumns, MinersData } from '../../../consts/tableData';

const MiningPool = () => {
  const { currentTheme } = useCurrentTheme();
  const minersRows = GetMinersRows();

  const handleMinerRemoveButtonClick = (address: string) => {
    ContractProposeRemoval(address);
  };

  const handleMinerInfoButtonClick = (address: string) => {
    // change this call to redirect the one who clicked to a new tab, or make a popup with the info of the given miner
    // the call is named 'readOnlyGetAllDataMinersInPool', but for now it gives read_length error (@deployer needs to fix it)
    // ContractVotePositiveJoin(address);
  };

  const minersRowContent = (_index: number, minersRow: MinersData) => {
    return (
      <React.Fragment>
        {minerColumns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.dataKey === 'address' ? 'left' : 'right'}
            sx={{
              color: colors[currentTheme].secondary,
            }}
          >
            {column.dataKey === 'proposeRemoval' ? (
              <Box>
                <Button sx={{ marginRight: 3 }} onClick={() => handleMinerRemoveButtonClick(minersRow['address'])}>
                  <PersonRemoveIcon fontSize="small" sx={{ color: 'red' }} />
                </Button>
              </Box>
            ) : (
              minersRow[column.dataKey]
            )}
            {column.dataKey === 'generalInfo' && (
              <Box>
                <Button onClick={() => handleMinerInfoButtonClick(minersRow['address'])}>
                  <InfoIcon fontSize="small" sx={{ color: colors[currentTheme].secondary }} />
                </Button>
              </Box>
            )}
          </TableCell>
        ))}
      </React.Fragment>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        minHeight: 'calc(100vh - 60px)',
      }}
      style={{
        backgroundColor: colors[currentTheme].accent2,
        color: colors[currentTheme].secondary,
      }}
    >
      <TableCreation
        rows={minersRows}
        rowContent={minersRowContent}
        columns={minerColumns}
        tableId="miners"
        customTableWidth="75%"
      />
    </Box>
  );
};

export default MiningPool;
