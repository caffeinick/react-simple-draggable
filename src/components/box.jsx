import { useState, useCallback } from 'react';
import styled from 'styled-components';

const Box = ({
  index = 0,
  value = '',
  onChange = () => {},
  onDragStart = () => {},
  onDragOver = () => {},
  onDragEnd = () => {},
  onDrop = () => {},
  onReset = () => {},
}) => {
  const [dragging, setDragging] = useState(false);

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
      onDragStart(index);

      setDragging(true);
    },
    [onDragStart, index]
  );

  // source가 위에 닿았을 때
  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      onDragOver(index);
    },
    [index, onDragOver]
  );

  // source가 dropped 됐을 때
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      onDrop(index);
      onReset();
    },
    [index, onDrop, onReset]
  );

  const handleDragEnd = useCallback(
    (e) => {
      e.preventDefault();
      onDragEnd(e);
      onReset();

      setDragging(false);
    },
    [onDragEnd, onReset]
  );

  return (
    <BoxContainer
      id={`box-input-${index}`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    >
      <BoxInput
        type={'input'}
        value={value}
        onChange={handleChange}
        autoComplete={'off'}
        disabled={dragging}
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
