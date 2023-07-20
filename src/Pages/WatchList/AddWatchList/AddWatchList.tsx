import React, { useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import "./AddWatchList.scss";
import { GetItem, SetItem } from "../../../Utlis/SessionStorageUtlis";
import { useNavigate } from "react-router-dom";

const DasboardAddWatchForm: React.FC = () => {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    title: "",
    description: "",
    isButtonDisabled: true,
  });
  const onChangeInput = (e: React.ChangeEvent) => {
    const { name, value }: any = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onSubmitForm = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description } = userForm;
    const newUpdateForm = {
      id:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      title,
      description,
      createdDate: new Date().toDateString(),
    };
    const fetchAllFavList: any = GetItem("fav-list");
    if (fetchAllFavList && fetchAllFavList.length) {
      fetchAllFavList.push(newUpdateForm);
      SetItem("fav-list", fetchAllFavList);
      navigate("/watchlist");
    } else {
      const newList = [{ ...newUpdateForm }];
      SetItem("fav-list", newList);
      navigate("/watchlist");
    }
  };

  const checkIsFormValid = () => {
    const { title, description }: any = userForm;
    if (title.length > 0 && description.length > 0) {
      return false;
    }
    return true;
  };
  return (
    <Container style={{ marginTop: "10px" }}>
      <form onSubmit={onSubmitForm}>
        <div className="mb-1">
          <TextField
            id="title"
            label="Title"
            name="title"
            variant="outlined"
            className="w-100"
            value={userForm.title}
            onChange={onChangeInput}
            required={true}
          />
        </div>
        <div className="mb-1">
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            name="description"
            className="w-100"
            value={userForm.description}
            onChange={onChangeInput}
            required={true}
          />
        </div>
        <div className="text-center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={checkIsFormValid()}
            // disabled={checkIsFormValid}
          >
            Create New Watchlist
          </Button>
        </div>
      </form>
    </Container>
  );
};
export { DasboardAddWatchForm };
