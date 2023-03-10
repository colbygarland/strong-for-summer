import styled from 'styled-components';

const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 90px;
`;

export const Page = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};
