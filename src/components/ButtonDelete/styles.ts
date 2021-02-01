import styled from "styled-components";
import { Delete } from "@styled-icons/material/Delete";

export const Button = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #eb4740;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 10px;

  cursor: pointer;
`;

export const DeleteIcon = styled(Delete)`
  width: 20px;
  fill: #fff;
`;
