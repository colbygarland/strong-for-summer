import styled from 'styled-components';
import { colors } from '../theme/colors';

const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 63px;
  background-color: ${colors.slate};
  min-height: 100vh;
`;

export const Page = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};
