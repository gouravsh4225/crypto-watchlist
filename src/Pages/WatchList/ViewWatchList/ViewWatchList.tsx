import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
} from "@mui/material";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { GetItem } from "../../../Utlis/SessionStorageUtlis";
import { AttachMoneyOutlined } from "@mui/icons-material";

const ViewWatchList = () => {
  const findSessionFavList = GetItem("fav-list");
  const params = useParams();
  const findItem =
    findSessionFavList &&
    Array.isArray(findSessionFavList) &&
    findSessionFavList.length
      ? findSessionFavList.filter((item: any) => item.id === params.id)
      : [];

  return (
    <Container>
      <div>
        <h2>Name: {findItem[0]?.title}</h2>
        <p>Description :{findItem[0]?.description}</p>
        <p>Created At : {findItem[0]?.createdDate}</p>
        <p>Total Asset Count : {findItem[0]?.assets?.length}</p>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {findItem.map((item: any) => (
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
export { ViewWatchList };
