import { Checkbox } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FormBlock } from '../components/forms/shared';
import { Header } from '../components/Header';
import { getActivity, setActivity } from '../services/api/activity';
import { colors } from '../theme/colors';

const Page = styled.div`
  background-color: ${colors.primary};
  min-height: 100vh;
  color: ${colors.white};
  padding-left: 20px;
  padding-right: 20px;
`;

const H2 = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
`;

function Activity({ children }: { children: string }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getActivity(children).then((resp) => {
      setChecked(resp);
    });
  }, []);

  return (
    <FormBlock>
      <Checkbox
        isChecked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          setActivity(children, e.target.checked);
        }}
      >
        {children}
      </Checkbox>
    </FormBlock>
  );
}

export default function Home() {
  return (
    <Page>
      <Header pageTitle="Strong For Summer 💪" />
      <H2>March 8th</H2>
      <Activity>45 minute workout</Activity>
      <Activity>8 cups of water</Activity>
      <Activity>10,000 steps</Activity>
      <Activity>3 servings of vegetables</Activity>
      <Activity>Activity or class</Activity>
      <Activity>4 cups of water</Activity>
      <Activity>7,000 steps</Activity>
      <Activity>5 minutes of meditation</Activity>
      <Activity>Read 10 pages of a book</Activity>
      <Activity>Get 8 hours of sleep</Activity>
      <Activity>Hit your protein goal</Activity>
      <Activity>Make the bed</Activity>
      <Activity>Go outside</Activity>
    </Page>
  );
}
