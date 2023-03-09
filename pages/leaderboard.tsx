import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header';
import { ACTIVITIES, getLeaderboard } from '../services/api/activity';

const Page = styled.div`
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
`;

export default function Leaderboard() {
  const [rankings, setRankings] = useState([{}]);

  useEffect(() => {
    getLeaderboard().then((data) => {
      const ranks = [];
      for (const [user, values] of Object.entries(data)) {
        let points = 0;
        // @ts-ignore
        for (const [_date, activities] of Object.entries(values)) {
          // @ts-ignore
          Object.keys(activities).forEach((key) => {
            // add up all the keys here
            points += ACTIVITIES[key].points;
          });
        }
        ranks.push({ [user]: points });
      }
      ranks.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);
      setRankings(ranks);
    });
  }, []);

  return (
    <>
      <Header pageTitle="Leaderboard" />
      <Page>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Person</Th>
                <Th>Points</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rankings.map((rank) => {
                const user = Object.keys(rank);
                return (
                  <Tr>
                    <Td>{user}</Td>
                    <Td>
                      {/* @ts-ignore */}
                      {rank[user]}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Page>
    </>
  );
}
