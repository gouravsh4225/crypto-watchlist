import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  IconButton,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetItem, SetItem } from "../../../Utlis/SessionStorageUtlis";
import { AttachMoneyOutlined, Delete } from "@mui/icons-material";
export const EditWatchList = () => {
  const [editWatchListItem, setEditWatchListItem] = useState<any>([]);
  const params = useParams();

  const fetchWatchList = () => {
    const findSessionFavList = GetItem("fav-list");
    const findItem: any =
      findSessionFavList &&
      Array.isArray(findSessionFavList) &&
      findSessionFavList.length
        ? findSessionFavList.filter((item: any) => item.id === params.id)
        : [];
    setEditWatchListItem(findItem);
  };

  useEffect(() => {
    fetchWatchList();
  }, []);

  const onDeleteAsset = (data: any) => {
    const findSessionFavList = GetItem("fav-list");
    const updateFavList = findSessionFavList.map((item: any) => {
      if (item.id === editWatchListItem[0]?.id) {
        const deleteSelectedAsset = item.assets.filter(
          (asset: any) => asset.id !== data.id
        );
        item.assets = deleteSelectedAsset;
        return item;
      }
      return item;
    });
    SetItem("fav-list", updateFavList);
    fetchWatchList();
  };

  return (
    <Container>
      <div>
        <h2>Name: {editWatchListItem[0]?.title}</h2>
        <p>Description :{editWatchListItem[0]?.description}</p>
        <p>Created At : {editWatchListItem[0]?.createdDate}</p>
        <p>Total Asset Count : {editWatchListItem[0]?.assets?.length}</p>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Market Cap</TableCell>
              <TableCell>Volume (24h)</TableCell>
              <TableCell>Circulating Supply</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {editWatchListItem.map((item: any) => (
              <Fragment key={item.id}>
                {item.assets.map((asset: any, index: number) => (
                  <TableRow key={asset.id}>
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
                          src={asset.image}
                          style={{
                            width: "24px",
                            height: "24px",
                            objectFit: "cover",
                          }}
                        />
                        <p>{asset.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <AttachMoneyOutlined /> {asset.current_price}
                      </div>
                    </TableCell>
                    <TableCell>{asset.market_cap_change_24h}</TableCell>
                    <TableCell>{asset.total_volume}</TableCell>
                    <TableCell>{asset.circulating_supply}</TableCell>
                    <TableCell>
                      <IconButton
                        style={{ cursor: "pointer", color: "red" }}
                        title="Delete"
                        onClick={() => onDeleteAsset(asset)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
