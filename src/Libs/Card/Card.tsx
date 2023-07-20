import React from "react";
import {
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Card,
} from "@mui/material";

type CryptoCardProps = {
  title?: string;
  createdDate?: string;
  description?: string;
};
const CryptoCard: React.FC<CryptoCardProps> = (props) => {
  const { title, createdDate, description } = props;
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
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
};

export { CryptoCard };
