import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const Label = styled.label`
  color: ${(props) => props.theme.COLORS.textColor400};
  font-size: ${(props) => props.theme.FONT_SIZES.sm};
  margin-left: 4px;
`;

export const Select = styled.select`
  width: 100%;
  background-color: ${(props) => props.theme.COLORS.inputBackground};
  color: ${(props) => props.theme.COLORS.inputPlaceholderColor};
  border: 1px solid ${(props) => props.theme.COLORS.inputBorderColor};
  outline: none;
  padding: 10px 14px;
  box-sizing: border-box;
  transition: all 0.3s;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.inputBackgroundHover};
  }

  &:focus {
    border-color: ${(props) => props.theme.COLORS.inputBorderColorFocus};
  }
`;
