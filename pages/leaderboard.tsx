import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Page } from '../components/Page';
import { ACTIVITIES, getLeaderboard } from '../services/api/activity';

// @ts-ignore
function filterObject(obj, cb) {
  return Object.fromEntries(Object.entries(obj).filter(([key, val]) => cb(val, key)));
}

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
          const filtered = filterObject(activities, (val, key) => val.completed);
          // @ts-ignore
          Object.keys(filtered).forEach((key) => {
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
