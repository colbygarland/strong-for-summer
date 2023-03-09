import { Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { FormBlock, Label } from '../components/forms/shared';
import { Loader } from '../components/Loader';
import { colors } from '../theme/colors';

const Page = styled.div`
  background-color: ${colors.primary};
  min-height: 100vh;
  color: ${colors.white};
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

const StyledFormBlock = styled(FormBlock)`
  margin-top: 60px;
`;

const LoadingContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
`;

export default function EnterName() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      router.replace('/');
    }
  }, []);

  const onSubmit = () => {
    localStorage.setItem('user', name);
    console.log(localStorage.getItem('user'));
    setLoading(true);
    setTimeout(() => {
      router.replace('/');
    }, 2000);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }

  return (
    <Page>
      <Title>Strong For Summer 💪</Title>
      <StyledFormBlock>
        <Label>Enter your first name</Label>
        <Input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Button onClick={onSubmit}>Submit</Button>
      </StyledFormBlock>
    </Page>
  );
}
