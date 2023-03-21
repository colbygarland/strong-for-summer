import { TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import { ACTIVITIES, getActivityDetailsByUser } from '../services/api/activity';
import { getCurrentDate } from '../utils/date';

const Name = styled(Td)`
  text-transform: capitalize;
`;

const StyledPage = styled.div`
  margin-top: 90px;
`;

const LoadingContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
`;

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState<string[]>([]);
  const [body, setBody] = useState<string[]>([]);

  useEffect(() => {
    const getActivities = async () => {
      const date = getCurrentDate();
      const [bre, colby, danica, harry, robyn] = await Promise.all([
        getActivityDetailsByUser('Bre', date),
        getActivityDetailsByUser('Colby', date),
        getActivityDetailsByUser('Danica', date),
        getActivityDetailsByUser('Harry', date),
        getActivityDetailsByUser('Robyn', date),
      ]);
      const activities = {
        bre,
        colby,
        danica,
        harry,
        robyn,
      };
      const h = [];
      const b = [];
      for (const acts in activities) {
        h.push(acts);
        b.push(activities[acts]);
      }
      setHeadings(h);
      setBody(b);
      setLoading(false);
    };
    getActivities();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }

  return (
    <>
      <Header pageTitle="Admin" />
      <StyledPage>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Person</Th>
                <Th>Activity for Today</Th>
              </Tr>
            </Thead>
            <Tbody>
              {headings.map((name, index) => {
                let totalForToday = 0;
                const acts = body[index]
                  ? Object.entries(body[index])
                      // @ts-ignore
                      .filter((e) => e[1].completed)
                      .map((e) => {
                        totalForToday += ACTIVITIES[e[0]].points;
                        return e.toString();
                      })
                      .join('<br /> ')
                      .replaceAll(',[object Object]', '')
                  : null;

                return (
                  <Tr key={index}>
                    <Name>
                      <strong>{name}</strong>
                    </Name>
                    <Td>
                      {body[index] === null ? (
                        '-'
                      ) : (
                        <>
                          <span dangerouslySetInnerHTML={{ __html: acts as string }} />
                          <br />
                          <br />
                          Today's points so far: <strong>{totalForToday}</strong>
                        </>
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </StyledPage>
    </>
  );
}
