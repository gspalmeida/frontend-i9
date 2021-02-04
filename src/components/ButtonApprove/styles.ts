import styled from "styled-components";
import { Delete } from "@styled-icons/material/Delete";
import {Check} from '@styled-icons/boxicons-regular/Check';

export const Button = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: green;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 10px;
  margin-right: 10px;

  cursor: pointer;
`;

export const DeleteIcon = styled(Delete)`
  width: 20px;
  fill: #fff;
`;

export const ApproveIcon = styled(Check)`
  width: 20px;
  fill: #fff;
`;
