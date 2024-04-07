import { Link as LinkRouter } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.COLORS.background};
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 420px;
`;

export const Card = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.COLORS.borderColor};
  padding: 30px;
  box-shadow: black 0px 3px 7px -6px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CardTitle = styled.h1`
  font-size: ${(props) => props.theme.FONT_SIZES.lg};
  font-weight: 800;
  color: ${(props) => props.theme.COLORS.authCardTitleColor};
`;

export const SubCardTitle = styled.h1`
  font-size: ${(props) => props.theme.FONT_SIZES.sm};
  font-weight: 800;
  color: ${(props) => props.theme.COLORS.authCardSubTitleColor};
`;

export const CardBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

export const CardFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const Link = styled(LinkRouter)`
  font-size: ${(props) => props.theme.FONT_SIZES.sm};
  color: ${(props) => props.theme.COLORS.primary};
`;
