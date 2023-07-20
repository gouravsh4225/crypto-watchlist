import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HeaderFooterLayout } from "./Layout/HeaderFooterLayout";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { WatchList } from "./Pages/WatchList/WatchList";
import { DasboardAddWatchForm } from "./Pages/WatchList/AddWatchList/AddWatchList";
import { ViewWatchList } from "./Pages/WatchList/ViewWatchList/ViewWatchList";
import { EditWatchList } from "./Pages/WatchList/EditWatchList/EditWatchList";

const AppRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/crypto-list" replace />} />
        <Route
          path="/crypto-list"
          element={
            <HeaderFooterLayout>
              <Dashboard />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/watchlist"
          element={
            <HeaderFooterLayout>
              <WatchList />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/create-watchlist"
          element={
            <HeaderFooterLayout>
              <DasboardAddWatchForm />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/view-watchlist/:id"
          element={
            <HeaderFooterLayout>
              <ViewWatchList />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/edit-watchlist/:id"
          element={
            <HeaderFooterLayout>
              <EditWatchList />
            </HeaderFooterLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouters;
