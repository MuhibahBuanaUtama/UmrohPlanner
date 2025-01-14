import { useState } from "react";

const DialogUtil = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return { dialogOpen, handleOpenDialog, handleCloseDialog };
};

export default DialogUtil;
