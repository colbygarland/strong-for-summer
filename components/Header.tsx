import styled from 'styled-components';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useEffect, useState } from 'react';
import { zIndex } from '../theme/zIndex';
import { typography } from '../theme/typography';
import Link from 'next/link';
import { getUser } from '../utils/user';

const Container = styled.header`
  background: ${colors.primary};
  padding: ${spacing.sm};
  text-align: center;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-bottom: 40px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  height: 63px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${colors.white};
`;

const MenuButton = styled(HiOutlineMenuAlt3).attrs({ size: 30 })`
  fill: ${colors.white};
  stroke: ${colors.white};
  position: absolute;
  right: 20px;
  top: 15px;
  cursor: pointer;
`;

const LeftActionButton = styled.span`
  position: absolute;
  left: 20px;
  top: 20px;
  path {
    fill: ${colors.white};
    stroke: ${colors.white};
  }
`;

const Menu = styled.div<{ show?: boolean }>`
  text-align: left;
  position: fixed;
  inset: 0;
  height: 100%;
  width: 100%;
  background: ${colors.slate};
  color: ${colors.secondary};
  z-index: ${zIndex[50]};
  padding: ${spacing.lg};
  transition: 0.3s;
  opacity: 0;
  visibility: hidden;
  z-index: -1;

  ${({ show }) =>
    show &&
    `
    opacity: 1;
    visibility: visible;
    z-index: 100;
  `}
`;

const CloseButton = styled(HiOutlineX).attrs({ size: 30 })`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const MenuList = styled.ul`
  list-style: none;
  font-size: ${typography.size.xl};
  margin-top: 50px;
`;

const MenuItem = styled.li`
  margin-bottom: 15px;
  font-weight: 700;
`;

export const Header = ({
  pageTitle,
  leftActionButton,
  onTitleClick,
}: {
  pageTitle: string;
  leftActionButton?: React.ReactNode;
  onTitleClick?: () => void;
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [showAdminPage, setShowAdminPage] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (user === 'Colby' || user === 'Robyn' || user === 'Robyn ') {
      setShowAdminPage(true);
    }
  }, []);

  return (
    <Container>
      {leftActionButton && <LeftActionButton>{leftActionButton}</LeftActionButton>}
      <Title onClick={onTitleClick}>{pageTitle}</Title>
      <MenuButton onClick={() => setMenuVisible(!menuVisible)} />
      <Menu show={menuVisible}>
        <CloseButton onClick={() => setMenuVisible(false)} />
        <MenuList>
          <MenuItem>
            <Link href="/">Home</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/leaderboard">Leaderboard</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/add-quote">Add a Quote</Link>
          </MenuItem>
          {showAdminPage && (
            <MenuItem>
              <Link href="/admin">Admin</Link>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Container>
  );
};
