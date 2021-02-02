import styled from "styled-components";

interface IButton {
  color: string;
  outlined?: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  //padding-top: 250px;
`;

export const Left = styled.div`
  display: flex;
`;
export const Right = styled.div``;

export const DatepickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;
export const Label = styled.label`
  font-weight: bold;
  color: #4b5c6b;
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

  cursor: pointer;

  border-radius: 15px;
  box-shadow: 4px 4px 5px rgb(0 0 0 / 20%);

  margin-left: 20px;

  font-size: 16px;
`;
