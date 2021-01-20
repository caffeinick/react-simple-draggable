import { useCallback } from 'react';
import styled from 'styled-components';

const Box = ({ index = 0, value = '', onChange = () => {} }) => {
  const handleChange = useCallback(
    (e) => {
      onChange(e?.target?.value, index);
    },
    [index, onChange]
  );

  return (
    <BoxContainer>
      <BoxInput type={'input'} value={value} onChange={handleChange} />
    </BoxContainer>
  );
};

export default Box;

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  border: 1px solid white;
  background-color: rgb(147, 149, 151);
  color: white;
`;

const BoxInput = styled.input`
  height: 50px;
  border: 0;
  background-color: white;
  width: 100%;
`;
