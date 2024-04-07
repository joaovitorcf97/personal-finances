import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { useAuth } from '../../hooks/auth';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
  Link,
  SubCardTitle,
  Wrapper,
} from './styles';

type Props = {
  type: 'signin' | 'signup';
};

export const Auth = ({ type }: Props) => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showAlert, setShowAlert] = useState({
    type: 'error',
    message: '',
    show: false,
  });

  const { handleSignIn, handleSignUp } = useAuth();

  const navigate = useNavigate();

  const handleOnClick = async () => {
    const [name, email, password] = [nameInput, emailInput, passwordInput];

    if ((type === 'signup' && !name) || !email || !password) {
      setShowAlert({
        type: 'error',
        message: 'Preencha todos os campos',
        show: true,
      });
      return;
    }

    const request = await (type === 'signin'
      ? handleSignIn({ email, password })
      : handleSignUp({ name, email, password }));

    if (request !== true) {
      setShowAlert({
        type: 'error',
        message: request,
        show: true,
      });
      return;
    }

    navigate('/');
  };

  useEffect(() => {
    setShowAlert({ type: 'error', message: '', show: false });
  }, [type]);

  return (
    <Wrapper>
      <Container>
        <Alert
          type={showAlert.type}
          show={showAlert.show}
          setShow={(show) => setShowAlert({ ...showAlert, show })}
          title={showAlert.message}
        />

        <Card>
          <CardHeader>
            <CardTitle>{type === 'signin' ? 'Entrar' : 'Cadastrar'}</CardTitle>
            <SubCardTitle>
              Insira as informações abaixo para
              {type === 'signin' ? ' entrar' : ' cadastrar'}
            </SubCardTitle>
          </CardHeader>

          <CardBody>
            {type === 'signup' && (
              <TextInput
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                borderRadius="sm"
                placeholder="Digite seu nome"
              />
            )}

            <TextInput
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              borderRadius="sm"
              placeholder="Digite seu e-mail"
            />

            <TextInput
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              borderRadius="sm"
              placeholder="Digite sua senha"
            />
          </CardBody>

          <CardFooter>
            <Button onClick={handleOnClick} size="md">
              {type === 'signin' ? 'Entrar' : 'Cadastrar'}
            </Button>

            {type === 'signin' ? (
              <Link to="/signup">Não tem conta? Registre-se</Link>
            ) : (
              <Link to="/signin">Não tem conta? Registre-se</Link>
            )}
          </CardFooter>
        </Card>
      </Container>
    </Wrapper>
  );
};
