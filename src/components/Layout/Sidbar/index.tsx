import { useState } from 'react';
import {
  MdOutlineAddTask,
  MdOutlineDashboard,
  MdOutlineListAlt,
} from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import Button from '../../Button';
import {
  Container,
  Footer,
  Header,
  HeaderIcon,
  HeaderLogo,
  Link,
  Navigation,
  NavigationItem,
  NavigationItemIcon,
  NavigationItemLabel,
  User,
  UserAvatar,
  UserName,
} from './styles';

const menuItems = [
  {
    label: 'Dashboard',
    url: '/',
    icon: <MdOutlineDashboard />,
  },
  {
    label: 'Nova Transação',
    url: '/transacoes/nova',
    icon: <MdOutlineAddTask />,
  },
  {
    label: 'Dashboard',
    url: '/transacoes',
    icon: <MdOutlineListAlt />,
  },
];

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const auth = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();

  const handleToggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <Container $expanded={isExpanded}>
      <Header>
        {isExpanded && (
          <Link to="/">
            <HeaderLogo src="/logo.png" alt="Logo" />
          </Link>
        )}

        <Button onClick={handleToggleExpanded} borderRadius="rounded">
          <HeaderIcon />
        </Button>
      </Header>

      <Navigation>
        {menuItems.map((item, key) => (
          <Link to={item.url} key={key}>
            <NavigationItem $isActive={pathname === item.url}>
              <NavigationItemIcon>{item.icon}</NavigationItemIcon>
              {isExpanded && (
                <NavigationItemLabel>{item.label}</NavigationItemLabel>
              )}
            </NavigationItem>
          </Link>
        ))}
      </Navigation>

      <Footer>
        <Link to="/account">
          <User $isActive={pathname === '/account'}>
            <UserAvatar>{auth.user?.name.slice(0, 2)}</UserAvatar>
            {isExpanded && <UserName>{auth.user?.name}</UserName>}
          </User>
        </Link>
      </Footer>
    </Container>
  );
};
