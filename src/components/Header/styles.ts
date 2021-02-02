import styled from "styled-components";

import { Link } from "react-router-dom";

interface IButton {
  color: string;
  outlined?: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: #3e84bb;
  display: flex;
  justify-content: center;
  box-shadow: 4px 4px 5px rgb(0 0 0 / 20%);
`;

export const Wrapper = styled.div`
  width: min(1200px, 100%);

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Brand = styled.h1`
  color: #ebebeb;
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

export const Button = styled.button<IButton>`
  width: 200px;
  height: 40px;
  background-color: ${({ outlined, color }) =>
    outlined ? "transparent" : color};

  border: ${({ outlined, color }) =>
    outlined ? `2px solid ${color}77` : "none"};

  outline: none;

  color: ${({ outlined, color }) => (outlined ? color : "#fff")};
  border-radius: 3px;

  border-radius: 15px;
  box-shadow: 4px 4px 5px rgb(0 0 0 / 20%);

  cursor: pointer;

  margin-left: 20px;

  font-size: 16px;
`;
export const ButtonSm = styled.button<IButton>`
  width: 100px;
  background-color: ${({ outlined, color }) =>
    outlined ? "transparent" : color};

  border: ${({ outlined, color }) =>
    outlined ? `2px solid ${color}99` : "none"};

  outline: none;

  color: ${({ outlined, color }) => (outlined ? color : "#fff")};
  border-radius: 3px;

  border-radius: 15px;
  box-shadow: 4px 4px 5px rgb(0 0 0 / 20%);

  cursor: pointer;

  margin-left: 20px;

  font-size: 12px;

  font-weight: 500;

  padding: 4px;
`;
