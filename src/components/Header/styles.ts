import styled from "styled-components";

import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: #4b5c6b;
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: min(1200px, 100%);

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const NewServiceLink = styled(Link)`
  margin-left: 30px;
  color: #fff;
  font-weight: 700;

  text-decoration: none;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;
export const Right = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const Username = styled.span`
  margin-left: 15px;
  color: #fff;
  font-size: 15px;
`;
