import { useEffect, useState } from 'react';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { Transaction } from '../../../@types/Transaction';
import Alert from '../../../components/Alert';
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import { TransactionsTable } from '../../../components/TransactionsTable';
import { deleteTransaction, getTransactions } from '../../../services/request';
import {
  Body,
  Container,
  Empty,
  EmptyIcon,
  EmptyLabel,
  Header,
  HeaderInfo,
  HeaderSearch,
  HeaderSearchIcon,
  HeaderSearchInput,
  HeaderSubTitle,
  HeaderTitle,
  Loading,
  Pagination,
  PaginationItem,
} from './styles';

export const Transactions = () => {
  const [loadingRequest, setLoadingRequest] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [showAlert, setShowAlert] = useState({
    type: 'error',
    message: '',
    show: false,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsFiltered, setTransactionsFiltered] = useState<
    Transaction[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleGetTransactions = async () => {
    setLoadingRequest(true);
    const request = await getTransactions(currentPage);
    setLoadingRequest(false);

    if (request.data) {
      if (!searchValue) {
        setTransactionsFiltered(request.data.transactions.items);
      }

      setTransactions(request.data.transactions.items);
      setTotalPages(request.data.transactions.pagesTotal);
    }

    if (request.error) {
      setShowAlert({ type: 'error', message: request.error, show: true });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSearch = () => {
    setTransactionsFiltered(
      transactions.filter((transactions) =>
        transactions.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const handleEditTransaction = (id: number) => {
    navigate(`/transacoes/${id}/editar`);
  };

  const handleDeleteTransaction = async (id: number) => {
    if (window.confirm('Tem certeza que desaja excluir esta transação')) {
      setLoadingRequest(true);
      await deleteTransaction(id);
      await handleGetTransactions();
      setLoadingRequest(false);

      setShowAlert({
        type: 'success',
        message: 'Transação excluida com sucesso',
        show: true,
      });
    }
  };

  useEffect(() => {
    handleGetTransactions();
  }, [currentPage]);

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Transações</HeaderTitle>
          <HeaderSubTitle>Todas transações</HeaderSubTitle>
        </HeaderInfo>

        <HeaderSearch>
          <HeaderSearchInput>
            <TextInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Pesquisar transação ..."
            />
          </HeaderSearchInput>
          <Button onClick={handleSearch} borderRadius="rounded">
            <HeaderSearchIcon />
          </Button>
        </HeaderSearch>
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
        <Body>
          {transactionsFiltered.length === 0 ? (
            <Empty>
              <EmptyIcon />{' '}
              <EmptyLabel>Nenhuma transação encontrada</EmptyLabel>
            </Empty>
          ) : (
            <>
              <TransactionsTable
                data={transactions}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />

              <Pagination>
                <PaginationItem $isLeft onClick={handlePreviousPage}>
                  <MdOutlineKeyboardArrowLeft size={21} />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem
                    $active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                    key={index}
                  >
                    {index + 1}
                  </PaginationItem>
                ))}

                <PaginationItem $isRight onClick={handleNextPage}>
                  <MdOutlineKeyboardArrowRight size={21} />
                </PaginationItem>
              </Pagination>
            </>
          )}
        </Body>
      )}
    </Container>
  );
};
