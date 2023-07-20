import { useEffect, useState } from "react";
import { getAllCryptoList } from "../../API/DashboardAPI";
import { Container, Typography } from "@mui/material";
import { DashboardTable } from "../../Components/DashboardCommonComp/DashboardTables";
import { useNavigate } from "react-router-dom";
import { DashboardAddFavModal } from "../../Components/DashboardCommonComp/DashboardAddFavModal";
import { DashboardMockData } from "../../../mock/DashboardMock";

// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7 -->  Chart
const Dashboard = () => {
  const navigate = useNavigate();
  const [cryptocurrencyList, setCryptocurrencyList] = useState<any[]>([]);
  const [openAddWatchModel, setOpenAddWatchModel] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState({});

  useEffect(() => {
    const localStorageData: any = localStorage.getItem("crytop-list");
    if (!localStorageData) {
      getAllCryptoList()
        .then((response: any) => {
          setCryptocurrencyList(response);
          localStorage.setItem("crytop-list", JSON.stringify(response));
        })
        .catch((error: any) => {
          /** If api give limit error use the local Data */
          setCryptocurrencyList(DashboardMockData);
          localStorage.setItem(
            "crytop-list",
            JSON.stringify(DashboardMockData)
          );
          console.log(error);
        });
    } else {
      setCryptocurrencyList(JSON.parse(localStorageData));
    }
  }, []);

  const addToWatchList = (row: any) => {
    setOpenAddWatchModel(true);
    setSelectedRow(row);
  };

  return (
    <Container maxWidth="xl">
      <DashboardAddFavModal
        open={openAddWatchModel}
        onClose={() => setOpenAddWatchModel(false)}
        data={selectedRow}
      />
      <Typography variant="h6" component="h6" style={{ marginBlock: "10px" }}>
        Today's Cryptocurrency Prices List
      </Typography>
      <DashboardTable
        data={cryptocurrencyList}
        onClickSaveStarHandler={addToWatchList}
      />
    </Container>
  );
};

export { Dashboard };
