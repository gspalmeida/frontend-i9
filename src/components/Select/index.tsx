import React from "react";

import { SelectStylized } from "./styles";

interface ISelect {
  open: boolean;
  value: string | number;
  handleClose: () => void;
  handleOpen: () => void;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const Select: React.FC<ISelect> = ({
  open,
  value,
  handleClose,
  handleOpen,
  handleChange,
  children,
}) => {
  return (
    <SelectStylized
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      onChange={handleChange}
      value={value}
    >
      {children}
    </SelectStylized>
  );
};

export default Select;
