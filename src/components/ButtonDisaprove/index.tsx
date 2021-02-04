import React from "react";
import { Button, DisaproveIcon } from "./styles";

interface IButtonDelete {
  onClick?: () => void;
}

const DisaproveButton: React.FC<IButtonDelete> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <DisaproveIcon />
    </Button>
  );
};

export default DisaproveButton;
