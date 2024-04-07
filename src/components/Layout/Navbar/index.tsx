import { useState } from 'react';
import { BiExit, BiFullscreen } from 'react-icons/bi';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { TbLogout } from 'react-icons/tb';
import { useAuth } from '../../../hooks/auth';
import { useTheme } from '../../../hooks/theme';
import { Container, Icon, LeftSide, RightSide } from './styles';

export const Navbar = () => {
  const [fullScreenEnabled, setFullScreenEnabled] = useState(false);

  const { handleToggleTheme, theme } = useTheme();
  const { handleSignOut } = useAuth();

  const handleToggleFullScreen = async () => {
    let enabled = true;

    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      await document.exitFullscreen();
      enabled = false;
    }

    setFullScreenEnabled(enabled);
  };

  return (
    <Container>
      <LeftSide>
        <Icon onClick={handleToggleFullScreen}>
          {fullScreenEnabled ? <BiExit /> : <BiFullscreen />}
        </Icon>
      </LeftSide>

      <RightSide>
        <Icon onClick={handleToggleTheme}>
          {theme === 'dark' ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </Icon>

        <Icon onClick={handleSignOut}>
          <TbLogout />
        </Icon>
      </RightSide>
    </Container>
  );
};
