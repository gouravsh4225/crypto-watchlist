import React, { useEffect, useState } from "react";
import { CrypoModal } from "../../Libs/Modal/Modal";
import { CryptoList } from "../../Libs/List/List";
import { GetItem, SetItem } from "../../Utlis/SessionStorageUtlis";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add, Save } from "@mui/icons-material";
import { findAndUpdateAssetInWatchList } from "../../Utlis/CommonUtlis";

type DashboardAddFavModalType = {
  open: boolean;
  onClose: () => void;
  data: any;
};

const DashboardAddFavModal: React.FC<DashboardAddFavModalType> = (props) => {
  const { open, onClose, data } = props;
  const [watchlist, setWatchList] = useState<any>([]);
  const fetchSessionFavList: any[] = GetItem("fav-list");
  const navigate = useNavigate();
  useEffect(() => {
    if (Array.isArray(fetchSessionFavList) && fetchSessionFavList.length) {
      setWatchList(fetchSessionFavList);
    }
    return () => {
      setWatchList([]);
    };
  }, [props.open]);

  const goToAddWatcList = () => {
    navigate("/create-watchlist");
  };

  const removeFromList = (currentAsset: any) => {
    return currentAsset?.filter((ass: any) => ass.id !== data.id);
  };

  const onChangeAddStatus = (selectCard: any, e: any) => {
    const { checked } = e.target;
    const newUpdateWatchList = watchlist.map((item: any) => {
      if (item.id === selectCard.id) {
        return {
          ...item,
          assets: checked
            ? findAndUpdateAssetInWatchList(item?.assets, data)
            : removeFromList(item?.assets),
          checked: checked,
        };
      }
      return item;
    });
    setWatchList(newUpdateWatchList);
  };

  const updateWatchList = () => {
    SetItem("fav-list", watchlist);
    onClose();
  };

  return (
    <CrypoModal
      open={open}
      title="Add Into Watchlist"
      onCloseHanlder={() => onClose()}
    >
      {watchlist.length > 0 ? (
        watchlist.map((item: any) => (
          <CryptoList
            checkboxValue={item.checked}
            primaryText={item.title}
            secondaryText={item.createdDate}
            key={item.id}
            onChangeCheckbox={onChangeAddStatus}
            {...item}
          />
        ))
      ) : (
        <>
          <Alert severity="info" className="mblock-top-10">
            No Watch list is found. Please create one to add.
          </Alert>
        </>
      )}
      <div
        style={{
          gap: "1rem",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button variant="contained" color="primary" onClick={goToAddWatcList}>
          <Add /> New
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={updateWatchList}
          disabled={false}
        >
          <Save /> Save
        </Button>
      </div>
    </CrypoModal>
  );
};

export { DashboardAddFavModal };
