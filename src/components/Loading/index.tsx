import { HashLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { Container, Label } from './styles';

export const Loading = () => {
  const theme = useTheme();

  return (
    <Container>
      <HashLoader color={theme.COLORS.primary} />
      <Label>Loading...</Label>
    </Container>
  );
};

export default Loading;
