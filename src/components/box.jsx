import { useCallback } from 'react';
import styled from 'styled-components';

const Box = ({
  index = 0,
  value = '',
  onChange = () => {},
  onStart = () => {},
  onEnd = () => {},
  onOver = () => {},
  onDrop = () => {},
}) => {
  // Input 값 변경됐을 때
  const handleChange = useCallback(
    (e) => {
      onChange(e?.target?.value, index);
    },
    [index, onChange]
  );

  // 드래그 시작됐을 때 발생 (source가 타겟)
  const handleDragStart = useCallback(
    (e) => {
      onStart(index);
    },
    [onStart, index]
  );

  // source가 위에 닿았을 때
  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      onOver(index);
    },
    [index, onOver]
  );

  // source가 dropped 됐을 때
  const handleDrop = useCallback(
    (e) => {
      onDrop(index);
      onEnd();
    },
    [index, onDrop, onEnd]
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
        onDragOver={handleDragOver}
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
