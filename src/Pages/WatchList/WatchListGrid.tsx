import { Fragment } from "react";
import { AvatarGroupsImage, WatchListCard } from "./WatchListCard";
import CryptoMenu from "../../Libs/Menu/Menu";
import { Button, MenuItem } from "@mui/material";
import { Add, Delete, Edit, MoreVert, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { SetItem } from "../../Utlis/SessionStorageUtlis";

export const WatchListGrid = (props: any) => {
  const { userWatchList } = props;
  const navigate = useNavigate();

  const getAvatarImage = (assets: any) => {
    if (assets && Array.isArray(assets)) {
      return assets.map((item: any) => item.image);
    }
    return [];
  };

  const onEditWatchList = (item: any) => {
    navigate(`/edit-watchlist/${item.id}`);
  };
  const onViewWatchList = (item: any) => {
    navigate(`/view-watchlist/${item.id}`);
  };
  const onDeleteWatchList = (deleteObject: any) => {
    const filterWatchList = userWatchList.filter(
      (item: any) => item.id !== deleteObject.id
    );
    SetItem("fav-list", filterWatchList);
    //   setUserWatchList(filterWatchList);
  };

  return (
    <div className="grid grid-auto-cols grid-gap-1">
      {userWatchList.map((item: any) => (
        <Fragment key={item.id}>
          <WatchListCard
            key={item.id}
            title={item.title}
            description={item.description}
            createdDate={item.createdDate}
            avatarGroupImages={getAvatarImage(item?.assets)}
            headerActions={
              <div>
                <CryptoMenu buttonIcon={<MoreVert />}>
                  <MenuItem onClick={() => onEditWatchList(item)}>
                    <Edit />
                    Edit
                  </MenuItem>
                  <MenuItem onClick={() => onViewWatchList(item)}>
                    <Visibility />
                    View
                  </MenuItem>
                  <MenuItem onClick={() => onDeleteWatchList(item)}>
                    <Delete />
                    Delete
                  </MenuItem>
                </CryptoMenu>
              </div>
            }
            cardActions={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <AvatarGroupsImage images={getAvatarImage(item?.assets)} />
                <Button
                  color="info"
                  variant="outlined"
                  onClick={() => props.onAddMoreAssets(item)}
                >
                  <Add /> Add More
                </Button>
              </div>
            }
          />
        </Fragment>
      ))}
    </div>
  );
};
