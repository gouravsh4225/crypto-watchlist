import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import {
  GradeOutlined,
  Grade,
  AttachMoneyOutlined,
  Favorite,
} from "@mui/icons-material";
import { GetItem } from "../../Utlis/SessionStorageUtlis";

type DashboardTableProps = {
  data: any[];
  onClickSaveStarHandler: (row: any) => void;
  onSelectRowHandler?: (row: any) => void;
};

const DashboardTable: React.FC<DashboardTableProps> = (props) => {
  const { data, onClickSaveStarHandler, onSelectRowHandler } = props;

  const favList = GetItem("fav-list") ?? [];

  const fetchAllSavedValue: any[] = [];
  favList.map((favItem: any) => {
    if (favItem?.assets) {
      favItem?.assets?.map((assetItem: any) => {
        if (assetItem.id) {
          fetchAllSavedValue.push(assetItem.id);
        }
      });
    }
  });
  return (
    <>
      <TableContainer component={Paper} style={{ marginBlock: "10px" }}>
        <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center", color: "red" }}>
                <Favorite />
              </TableCell>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Market Cap</TableCell>
              <TableCell>Volume (24h)</TableCell>
              <TableCell>Circulating Supply</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any, index: number) => {
              return (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell style={{ textAlign: "center" }}>
                    <Button
                      variant="text"
                      color="inherit"
                      onClick={() => onClickSaveStarHandler(row)}
                    >
                      {fetchAllSavedValue.includes(row.id) ? (
                        <Grade />
                      ) : (
                        <GradeOutlined />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <img
                        src={row.image}
                        style={{
                          width: "24px",
                          height: "24px",
                          objectFit: "cover",
                        }}
                      />
                      <p>{row.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <AttachMoneyOutlined /> {row.current_price}
                    </div>
                  </TableCell>
                  <TableCell>{row.market_cap_change_24h}</TableCell>
                  <TableCell>{row.total_volume}</TableCell>
                  <TableCell>{row.circulating_supply}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export { DashboardTable };
