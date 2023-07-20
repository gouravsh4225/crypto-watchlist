import { GetItem } from "../../../Utlis/SessionStorageUtlis";
import { CryptoList } from "../../../Libs/List/List";
import { Button, TextField } from "@mui/material";
import React, { Fragment, useState } from "react";

const AddMoreAssets = (props: any) => {
  const { selectedRow, onCancelHandler, onSaveHandler } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const fullFavList = GetItem("crytop-list") ?? [];
  const selectedPreAssets: any[] = [];
  const createFavListWithPreSelected = fullFavList.map((item: any) => {
    const selectedFilters = selectedRow?.assets?.filter(
      (asset: any) => asset.id === item.id
    );
    if (selectedFilters && selectedFilters.length) {
      selectedPreAssets.push(selectedFilters[0]);
    }
    item.checkBoxValue =
      selectedFilters && selectedFilters.length ? true : false;
    return item;
  });
  const [favList, setFavList] = useState(createFavListWithPreSelected);
  const [selectedAssets, setSelectedAssets] =
    useState<any[]>(selectedPreAssets);

  const onChangeSearchTerm = (e: any) => {
    const { value } = e.target;
    setSearchTerm(value);
    if (value.length > 0) {
      const filterSearchTerm = createFavListWithPreSelected.filter(
        (item: any) => item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFavList(filterSearchTerm);
    } else {
      setFavList(createFavListWithPreSelected);
    }
  };

  const onSelectAssetOrUnSelect = (row: any, e: any) => {
    const { checked } = e.target;
    if (checked) {
      row.checkBoxValue = checked;
      setSelectedAssets([...selectedAssets, row]);
    } else {
      row.checkBoxValue = checked;
      const filterSelected = selectedAssets.filter(
        (item: any) => item.id !== row.id
      );
      setSelectedAssets(filterSelected);
    }
  };

  const onSave = () => {
    onSaveHandler(selectedAssets);
  };

  return (
    <Fragment>
      <TextField
        style={{
          width: "100%",
          position: "sticky",
          top: "0px",
          zIndex: "1",
          background: "white",
        }}
        placeholder="Search For "
        onChange={onChangeSearchTerm}
        value={searchTerm}
      />
      <div style={{ height: "400px", maxHeight: "400px", overflow: "auto" }}>
        {favList.map((item: any) => (
          <CryptoList
            checkboxValue={item.checkBoxValue}
            key={item.id}
            primaryText={item.name}
            secondaryText=""
            imageurl={item.image}
            onChangeCheckbox={(data: any, e: React.ChangeEvent) =>
              onSelectAssetOrUnSelect(item, e, data)
            }
          />
        ))}
      </div>
      <div
        style={{
          marginBlock: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          gap: "1rem",
        }}
      >
        <Button variant="contained" color="error" onClick={onCancelHandler}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={onSave}>
          Save
        </Button>
      </div>
    </Fragment>
  );
};

export { AddMoreAssets };
