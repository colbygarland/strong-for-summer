import styled from 'styled-components';
import { Header } from '../components/Header';

const Page = styled.div`
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
`;

export default function Leaderboard() {
  return (
    <>
      <Header pageTitle="Leaderboard" />
      <Page>coming soon!</Page>
    </>
  );
}
