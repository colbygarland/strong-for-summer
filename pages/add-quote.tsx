import { Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { FormBlock, Label } from '../components/forms/shared';
import { Header } from '../components/Header';
import { setQuote } from '../services/api/quote';

const Page = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

export default function AddQuote() {
  const [quote, setQ] = useState('');

  function onSubmit() {
    if (quote !== '') {
      setQuote(quote);
      setQ('');
    }
  }

  return (
    <>
      <Header pageTitle="Add a Quote" />
      <Page>
        <FormBlock>
          <Label>Enter an inspirational quote</Label>
          <Textarea
            placeholder="Enter a quote"
            value={quote}
            onChange={(e) => {
              setQ(e.target.value.trim());
            }}
          />
          <Button onClick={onSubmit}>Submit</Button>
        </FormBlock>
      </Page>
    </>
  );
}
