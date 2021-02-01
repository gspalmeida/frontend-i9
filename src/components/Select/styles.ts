import styled from "styled-components";

import MSelect from "@material-ui/core/Select";

export const SelectStylized = styled(MSelect)`
  width: 100%;
  height: 45px;

  border: 0;
  border-radius: 10px;
  background-color: #f8f8f8;

  outline: 0;

  padding: 0 20px;

  font-size: 15px;
  color: #777 !important;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px !important;

  margin-bottom: 10px;
  &.MuiInput-underline:before,
  &.MuiInput-underline:after {
    display: none !important;
  }
`;
