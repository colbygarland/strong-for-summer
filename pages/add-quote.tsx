import { Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../components/Button';
import { FormBlock, Label } from '../components/forms/shared';
import { Header } from '../components/Header';
import { Page } from '../components/Page';
import { setQuote } from '../services/api/quote';

export default function AddQuote() {
  const [quote, setQ] = useState('');

  function onSubmit() {
    if (quote !== '') {
      setQuote(quote);
      setQ('');
      toast.success('Thanks! It has been added!');
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
              setQ(e.target.value);
            }}
          />
          <Button onClick={onSubmit}>Submit</Button>
        </FormBlock>
      </Page>
    </>
  );
}
