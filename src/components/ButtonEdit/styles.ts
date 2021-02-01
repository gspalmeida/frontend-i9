import styled from "styled-components";
import { Edit } from "@styled-icons/entypo/Edit";

export const Button = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #ffbc00;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export const EditIcon = styled(Edit)`
  width: 17px;
  fill: #fff;
`;
