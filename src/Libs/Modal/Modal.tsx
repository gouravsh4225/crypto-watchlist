import React, { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Close } from "@mui/icons-material";
import "./Modal.scss";

type CrypoModalProps = {
  children: ReactNode;
  open: boolean;
  title: string;
  onCloseHanlder: () => void;
};

const CrypoModal: React.FC<CrypoModalProps> = (props) => {
  const { children, open, onCloseHanlder, title } = props;
  const onCloseModal = () => {
    if (onCloseHanlder) {
      onCloseHanlder();
    }
    return;
  };
  return (
    <Dialog maxWidth={"lg"} open={open} onClose={(e) => onCloseModal()}>
      <DialogTitle>
        <div className="dialog-header">
          <div className="dialog-title">{title}</div>
          <div className="dialog-icon" title="Close" onClick={onCloseModal}>
            <Close />
          </div>
        </div>
      </DialogTitle>
      <DialogContent style={{ paddingBlock: "10px" }}>{children}</DialogContent>
    </Dialog>
  );
};

export { CrypoModal };
