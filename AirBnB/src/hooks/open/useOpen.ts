import { useState } from 'react';

interface UseOpenReturn {
  open: boolean;
  onClose: () => void;
  handleClickOpen: () => void;
}

const useOpen = (): UseOpenReturn => {
  const [open, setOpen] = useState<boolean>(false);

  const onClose = (): void => {
    setOpen(false);
  };

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  return { open, onClose, handleClickOpen };
};

export default useOpen;
