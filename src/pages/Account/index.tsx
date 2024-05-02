import { useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { useAuth } from '../../hooks/auth';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setUser } from '../../redux/slices/authSlice';
import { deleteUser, updateUser } from '../../services/request';
import {
  Body,
  Container,
  Footer,
  Header,
  HeaderDeleteAccount,
  HeaderInfo,
  HeaderSubTitle,
  HeaderTitle,
  Loading,
} from './styles';

export const Account = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [nameValue, setNameValue] = useState(user?.name as string);
  const [emailValue, setEmailValue] = useState(user?.email as string);
  const [showAlert, setShowAlert] = useState({
    type: 'error',
    message: '',
    show: false,
  });
  const { handleSignOut } = useAuth();
  const theme = useTheme();

  const handleUpdateAccount = async () => {
    setLoadingRequest(true);
    const request = await updateUser(nameValue, emailValue);
    setLoadingRequest(false);

    if (request.error) {
      setShowAlert({ type: 'error', message: request.error, show: true });
    }

    if (request.data) {
      dispatch(setUser(request.data.user));
      setShowAlert({
        type: 'success',
        message: 'Dados Alterados com sucesso!',
        show: true,
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Tem ceteza que deseja deletar sua conta')) {
      setLoadingRequest(true);
      await deleteUser();
      handleSignOut();
      setLoadingRequest(false);
    }
  };

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Minha conta</HeaderTitle>
          <HeaderSubTitle>Edite seus dados ou exclua sua conta</HeaderSubTitle>
        </HeaderInfo>

        <HeaderDeleteAccount>
          <Button onClick={handleDeleteAccount} width="120px" size="md">
            Excluir conta
          </Button>
        </HeaderDeleteAccount>
      </Header>
      <Alert
        type={showAlert.type}
        title={showAlert.message}
        show={showAlert.show}
        setShow={(show) => setShowAlert({ ...showAlert, show })}
      />

      {loadingRequest && (
        <Loading>
          <ScaleLoader color={theme.COLORS.primary}></ScaleLoader>
        </Loading>
      )}

      {!loadingRequest && (
        <>
          <Body>
            <TextInput
              label="Seu nome"
              placeholder="Ex: João"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              borderRadius="sm"
            />
            <TextInput
              label="Seu E-mail"
              placeholder="Ex: joao@email.com"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              borderRadius="sm"
            />
          </Body>
          <Footer>
            <Button onClick={handleUpdateAccount} size="md" width="120px">
              Salvar
            </Button>
          </Footer>
        </>
      )}
    </Container>
  );
};
