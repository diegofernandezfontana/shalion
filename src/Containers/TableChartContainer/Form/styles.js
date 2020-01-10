import styled from 'styled-components';

export const FormWrapper = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  width: 340px;

  @media screen and (min-width: 450px) {
    width: 430px;
  }
  @media screen and (min-width: 650px) {
    width: 85%;
    max-width: 800px;
  }

  margin-bottom: 50px;
  min-height: 200px;
`;
