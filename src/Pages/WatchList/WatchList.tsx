import React, { useEffect, useRef, useState } from "react";
import "./watchList.scss";
import { Container } from "@mui/material";
import { GetItem, SetItem } from "../../Utlis/SessionStorageUtlis";
import "./watchList.scss";
import { CrypoModal } from "../../Libs/Modal/Modal";
import { AddMoreAssets } from "./AddMoreAssets/AddMoreAssets";
import { WatchListGrid } from "./WatchListGrid";

const WatchList: React.FC = () => {
  const [userWatchList, setUserWatchList] = useState<any>([]);
  const [isOpenAddMore, setIsOpenAddMore] = useState<boolean>(false);
  const fetchWatlistFromLocalStorage = GetItem("fav-list");
  const currentOpenWatchItem = useRef(null);

  useEffect(() => {
    if (fetchWatlistFromLocalStorage) {
      setUserWatchList(fetchWatlistFromLocalStorage);
    }
  }, []);

  const onAddMoreAssets = (openCardRowDetails: any) => {
    currentOpenWatchItem.current = openCardRowDetails;
    setIsOpenAddMore(true);
  };

  const onCloseAddMoreAssetsModal = () => {
    currentOpenWatchItem.current = null;
    setIsOpenAddMore(false);
  };

  const findAndUpdateAssets = (assets: any, currentAsset: any) => {
    if (assets.length) {
      const newList = assets.map((item: any) => {
        const find =
          currentAsset?.filter((curr: any) => curr.id === item.id) ?? [];
        if (!find.length) {
          return item;
        }
        if (find && find.length) return item;
      });
      return newList;
    }
    return currentAsset;
  };

  const onAddMoreAssetSave = (data: any, currentRow: any) => {
    const newUpdateWatchList = userWatchList.map((item: any) => {
      if (item.id === currentRow?.id) {
        item.assets = findAndUpdateAssets(data, item.assets);
      }
      return item;
    });
    SetItem("fav-list", newUpdateWatchList);
    setUserWatchList(newUpdateWatchList);
    onCloseAddMoreAssetsModal();
  };

  return (
    <Container>
      <CrypoModal
        open={isOpenAddMore}
        title="Add More Assets"
        onCloseHanlder={onCloseAddMoreAssetsModal}
      >
        <AddMoreAssets
          selectedRow={currentOpenWatchItem?.current}
          onCancelHandler={onCloseAddMoreAssetsModal}
          onSaveHandler={(data: any) =>
            onAddMoreAssetSave(data, currentOpenWatchItem.current)
          }
        />
      </CrypoModal>
      <div className="watchlist-page-wrapper">
        <h2>Watch List</h2>

        <WatchListGrid
          userWatchList={userWatchList}
          onAddMoreAssets={(data: any) => onAddMoreAssets(data)}
        />
      </div>
    </Container>
  );
};

export { WatchList };
