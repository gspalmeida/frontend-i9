import styled from "styled-components";
import {Close} from '@styled-icons/evaicons-solid/Close';

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

export const DisaproveIcon = styled(Close)`
  width: 20px;
  fill: #fff;
`;
