import React from "react";
import { Button, ApproveIcon } from "./styles";

interface IButonApprove {
  onClick?: () => void;
}

const ButonApprove: React.FC<IButonApprove> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <ApproveIcon />
    </Button>
  );
};

export default ButonApprove;
