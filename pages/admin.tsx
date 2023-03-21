import { TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header';
import { ACTIVITIES, getActivityDetailsByUser } from '../services/api/activity';
import { getCurrentDate } from '../utils/date';

const Name = styled(Td)`
  text-transform: capitalize;
`;

const StyledPage = styled.div`
  margin-top: 90px;
`;

export default function Admin({ activities }: { activities: any }) {
  const [headings, setHeadings] = useState([]);
  const [body, setBody] = useState([]);

  useEffect(() => {
    const hs = [];
    const b = [];
    for (const acts in activities) {
      hs.push(acts);
      b.push(activities[acts]);
    }
    // @ts-ignore
    setHeadings(hs);
    // @ts-ignore
    setBody(b);
  }, []);

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

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const date = getCurrentDate();
  const [bre, colby, danica, harry, robyn] = await Promise.all([
    getActivityDetailsByUser('Bre', date),
    getActivityDetailsByUser('Colby', date),
    getActivityDetailsByUser('Danica', date),
    getActivityDetailsByUser('Harry', date),
    getActivityDetailsByUser('Robyn', date),
  ]);

  return {
    props: {
      activities: {
        bre,
        colby,
        danica,
        harry,
        robyn,
      },
    },
  };
};
