import { Checkbox, useDisclosure } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { HiCalendar } from 'react-icons/hi';
import styled from 'styled-components';
import { DatePickerModal } from '../components/DatePickerModal';
import { FormBlock } from '../components/forms/shared';
import { Header } from '../components/Header';
import { Page } from '../components/Page';
import { Quote } from '../components/Quote';
import { getActivity, setActivity } from '../services/api/activity';
import { getQuotes } from '../services/api/quote';
import { colors } from '../theme/colors';
import { from } from '../theme/mediaQueries';
import { getCurrentDate, getCurrentDatePretty } from '../utils/date';
import { SITE_TITLE } from '../strings';

const H2 = styled.h2`
  font-size: 32px;
  margin-bottom: 15px;
  font-weight: 700;
`;

const H3 = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 700;
  color: ${colors.secondary};
`;

const Group = styled.div`
  margin-bottom: 30px;
`;

const Span = styled.span`
  text-decoration: line-through;
  opacity: 0.45;
`;

const Calendar = styled(HiCalendar).attrs({ size: 24 })`
  cursor: pointer;
`;

const Row = styled.div`
  ${from.xl`
    display: grid;
    grid-template-cols: repeat(4, minmax(0, 1fr));
    gap: 40px;
    grid-auto-flow: column;
  `}
`;

function Activity({ children, date }: { children: string; date: string }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getActivity(children, date).then((resp) => {
      setChecked(resp);
    });
  }, [date]);

  return (
    <FormBlock>
      <Checkbox
        isChecked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          setActivity(children, date, e.target.checked);

          // Ensure only one is ever checked
          if (children === '🏃‍♂️ 10,000 steps') {
            setActivity('🏃‍♂️ 7,000 steps', date, false);
          }
          if (children === '💦 8 cups of water') {
            console.log('setting 4 cups unchecked');
            setActivity('💦 4 cups of water', date, false);
          }
        }}
      >
        {checked ? <Span>{children}</Span> : children}
      </Checkbox>
    </FormBlock>
  );
}

export default function Home({ quote }: { quote: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [date, setDate] = useState(getCurrentDate());
  const prettyDate = getCurrentDatePretty(date);

  return (
    <>
      <Header leftActionButton={<Calendar onClick={onOpen} />} pageTitle={`${SITE_TITLE} 💪`} />
      <Page>
        <Quote quote={quote} />
        <H2 onClick={onOpen}>{prettyDate}</H2>
        <Row>
          <Group>
            <H3>20 Points</H3>
            <Activity date={date}>🏋️ 30 minute workout</Activity>
          </Group>
          <Group>
            <H3>10 Points</H3>
            <Activity date={date}>💦 8 cups of water</Activity>
            <Activity date={date}>🏃‍♂️ 10,000 steps</Activity>
            <Activity date={date}>🥗 3 servings of fruit or vegetables</Activity>
            <Activity date={date}>🧘 30 minute activity or class</Activity>
          </Group>
          <Group>
            <H3>5 Points</H3>
            <Activity date={date}>💦 4 cups of water</Activity>
            <Activity date={date}>🏃‍♂️ 7,000 steps</Activity>
            <Activity date={date}>🧘 5 minutes of meditation</Activity>
            <Activity date={date}>📖 Read 10 pages of a book</Activity>
            <Activity date={date}>💤 Get 8 hours of sleep</Activity>
            <Activity date={date}>💪 3 servings of protein</Activity>
          </Group>
          <Group>
            <H3>2 Points</H3>
            <Activity date={date}>🛏️ Make the bed</Activity>
          </Group>
          <Group>
            <H3>1 Point</H3>
            <Activity date={date}>🍃 Go outside</Activity>
          </Group>
        </Row>
      </Page>
      <DatePickerModal date={date} setDate={setDate} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const quotes = Object.values(await getQuotes());
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return {
    props: {
      quote,
    },
  };
};
