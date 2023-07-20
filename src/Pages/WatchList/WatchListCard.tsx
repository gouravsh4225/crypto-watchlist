import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { AvatarGroup, CardActions } from "@mui/material";

type WatchListCardType = {
  title: string;
  createdDate: string;
  image?: string;
  description: string;
  avatarGroupImages?: any[];
  headerActions?: JSX.Element;
  cardActions?: JSX.Element;
};

const AvatarGroupsImage = (avatarGroupsProps: any) => {
  const { images } = avatarGroupsProps;
  return (
    <AvatarGroup max={4} style={{ justifyContent: "start" }}>
      {images.map((item: string) => (
        <Avatar alt="Remy Sharp" src={item} key={item} />
      ))}
    </AvatarGroup>
  );
};

const WatchListCard: React.FC<WatchListCardType> = (props) => {
  const { title, description, createdDate, headerActions, cardActions } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {title?.charAt(0)}
          </Avatar>
        }
        title={title}
        subheader={createdDate}
        action={headerActions}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://picsum.photos/200"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>{cardActions}</CardActions>
    </Card>
  );
};
export { WatchListCard, AvatarGroupsImage };
