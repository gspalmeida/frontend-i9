import React from "react";
import { Button, DeleteIcon } from "./styles";

interface IButtonDelete {
  onClick?: () => void;
}

const ButtonDelete: React.FC<IButtonDelete> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <DeleteIcon />
    </Button>
  );
};

export default ButtonDelete;
