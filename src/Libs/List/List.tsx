import {
  Avatar,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";

type CrypoListProps = {
  primaryText: string;
  secondaryText: string;
  onChangeCheckbox: (data: CrypoListProps, e: React.ChangeEvent) => void;
  imageurl?: string;
  checkboxValue?: boolean;
};
const CryptoList: React.FC<CrypoListProps> = (props) => {
  const {
    primaryText,
    secondaryText,
    onChangeCheckbox,
    imageurl,
    checkboxValue = false,
  } = props;

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <img src={imageurl ?? "https://picsum.photos/200"} alt="pic" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={primaryText} secondary={secondaryText} />
        <div>
          <Checkbox
            checked={checkboxValue}
            value={Boolean(checkboxValue)}
            color="primary"
            onChange={(e: React.ChangeEvent) => onChangeCheckbox(props, e)}
          />
        </div>
      </ListItem>
      <Divider />
    </List>
  );
};

export { CryptoList };
