import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useAuth } from './hooks/auth';
import { useTheme } from './hooks/theme';
import { MainRoutes } from './routes';
import { darkTheme } from './themes/darkTheme';
import { lightTheme } from './themes/lightTheme';

function App() {
  const { handleAuthenticateUser } = useAuth();
  const { handleInitTheme, theme } = useTheme();

  useEffect(() => {
    handleAuthenticateUser();
    handleInitTheme();
  }, []);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <MainRoutes />
    </ThemeProvider>
  );
}

export default App;
