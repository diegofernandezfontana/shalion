import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  min-height: 250px;
  width: 340px;

  @media screen and (min-width: 450px) {
    width: 430px;
  }
  @media screen and (min-width: 650px) {
    width: 85%;
    max-width: 800px;
  }
`;

export const ProductsListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

export const SelectedProductWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 500px;
  margin: 0px;
`;

export const Text = styled.p`
  font-size: 12px;
  margin: 0;
  margin-right: 5px;
  color: grey;
`;

export const CloseButton = styled.button`
  border-radius: 100%;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: 0px;

  &:hover {
    cursor: pointer;
  }
`;
