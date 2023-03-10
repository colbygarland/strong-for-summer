import {
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { HiCalendar } from 'react-icons/hi';
import styled from 'styled-components';
import { FormBlock, Label } from '../components/forms/shared';
import { Header } from '../components/Header';
import { Page } from '../components/Page';
import { Quote } from '../components/Quote';
import { getActivity, setActivity } from '../services/api/activity';
import { getQuotes } from '../services/api/quote';
import { colors } from '../theme/colors';
import { from } from '../theme/mediaQueries';
import { getCurrentDate, getCurrentDatePretty } from '../utils/date';

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
        }}
      >
        {checked ? <Span>{children}</Span> : children}
      </Checkbox>
    </FormBlock>
  );
}

export default function Home({ quote }: { quote: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [date, setDate] = useState(getCurrentDate());
  const prettyDate = getCurrentDatePretty(date);

  return (
    <>
      <Header leftActionButton={<Calendar onClick={onOpen} />} pageTitle="Strong For Summer 💪" />
      <Page>
        {quote && <Quote quote={quote} />}
        <H2 onClick={onOpen}>{prettyDate}</H2>
        <Row>
          <Group>
            <H3>20 Points</H3>
            <Activity date={date}>🏋️ 45 minute workout</Activity>
          </Group>
          <Group>
            <H3>10 Points</H3>
            <Activity date={date}>💦 8 cups of water</Activity>
            <Activity date={date}>🏃‍♂️ 10,000 steps</Activity>
            <Activity date={date}>🥗 3 servings of vegetables</Activity>
            <Activity date={date}>🧘 Activity or class</Activity>
          </Group>
          <Group>
            <H3>5 Points</H3>
            <Activity date={date}>💦 4 cups of water</Activity>
            <Activity date={date}>🏃‍♂️ 7,000 steps</Activity>
            <Activity date={date}>🧘 5 minutes of meditation</Activity>
            <Activity date={date}>📖 Read 10 pages of a book</Activity>
            <Activity date={date}>💤 Get 8 hours of sleep</Activity>
            <Activity date={date}>💪 Hit your protein goal</Activity>
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
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change the date</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormBlock>
              <Label>Date</Label>
              <Input
                value={date}
                type="date"
                onChange={(e) => {
                  setDate(e.target.value);
                  onClose();
                }}
              />
            </FormBlock>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (_context) => {
  let quotes = await getQuotes();
  quotes = Object.values(quotes);
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  return {
    props: {
      quote,
    },
    revalidate: 10,
  };
};
