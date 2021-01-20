import { useCallback } from 'react';
import styled from 'styled-components';

const Box = ({ index = 0, value = '', onChange = () => {}, onSwap = () => {} }) => {
  const handleChange = useCallback(
    (e) => {
      onChange(e?.target?.value, index);
    },
    [index, onChange]
  );

  const handleDragStart = useCallback(
    (e) => {
      e?.dataTransfer?.setData('index', index);
    },
    [index]
  );

  const handleDrop = useCallback(
    (e) => {
      onSwap(parseInt(e?.dataTransfer?.getData('index'), 10), index);
    },
    [index, onSwap]
  );

  return (
    <BoxContainer>
      <BoxInput
        type={'input'}
        id={`box-input-${index}`}
        value={value}
        onChange={handleChange}
        autoComplete={'off'}
        draggable={true}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      />
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
  width: 90%;
`;
