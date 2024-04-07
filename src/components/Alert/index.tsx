import { ReactNode, useEffect } from 'react';
import { MdDoneAll, MdInfoOutline } from 'react-icons/md';
import { Container, Content, Title } from './styles';

type Props = {
  type: string;
  show: boolean;
  setShow: (value: boolean) => void;
  authHideDuration?: number;
  title?: string;
  children?: ReactNode;
};

const Alert = ({
  type,
  show,
  setShow,
  authHideDuration = 4000,
  title,
  children,
}: Props) => {
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, authHideDuration);
  }, [show]);

  return (
    <Container $show={show} $type={type}>
      {type === 'error' && <MdInfoOutline className="icon" />}
      {type === 'success' && <MdDoneAll className="icon" />}

      <Content>
        {title && <Title>{title}</Title>}
        {children}
      </Content>
    </Container>
  );
};

export default Alert;
