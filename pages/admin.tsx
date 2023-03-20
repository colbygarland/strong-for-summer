import { TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import { Header } from '../components/Header';
import { Page } from '../components/Page';
import { getActivityDetailsByUser } from '../services/api/activity';
import { getCurrentDate } from '../utils/date';

const Name = styled(Td)`
  text-transform: capitalize;
`;

export default function Admin({ activities }: { activities: any }) {
  const headings = [];
  const body: any[] = [];

  for (const acts in activities) {
    headings.push(acts);
    body.push(activities[acts]);
  }

  return (
    <>
      <Header pageTitle="Admin" />
      <Page>
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
                const acts = body[index]
                  ? Object.entries(body[index])
                      .map((e) => e.toString())
                      .join('<br /> ')
                      .replaceAll(',[object Object]', '')
                  : null;

                return (
                  <Tr>
                    <Name>
                      <strong>{name}</strong>
                    </Name>
                    <Td>
                      {' '}
                      {body[index] === null ? '-' : <span dangerouslySetInnerHTML={{ __html: acts as string }} />}
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

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const date = getCurrentDate();
  const bre = await getActivityDetailsByUser('Bre', date);
  const colby = await getActivityDetailsByUser('Colby', date);
  const danica = await getActivityDetailsByUser('Danica', date);
  const harry = await getActivityDetailsByUser('Harry', date);
  const robyn = await getActivityDetailsByUser('Robyn', date);

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
