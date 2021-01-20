import { useCallback, useRef } from 'react';
import styled from 'styled-components';

const idPrefix = 'box-input-';

const Box = ({
  index = 0,
  value = '',
  onChange = () => {},
  onSwap = () => {},
  onSpace = () => {},
  onStart = () => {},
  onEnd = () => {},
}) => {
  const id = useRef('');

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
      e?.dataTransfer?.setData('index', index);
      onStart(index);
    },
    [onStart, index]
  );

  // source가 위에 닿았을 때
  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();

      if (id.current === e?.target?.id) {
        return;
      }

      id.current = e?.target.id;
      onSpace(index);
    },
    [index, onSpace]
  );

  // source가 dropped 됐을 때
  const handleDrop = useCallback(
    (e) => {
      onSwap(index);
      onEnd(index);
    },
    [index, onSwap, onEnd]
  );

  // source가 닿았다가 떠났을 때
  const handleDragLeave = useCallback((e) => {
    id.current = '';
  }, []);

  return (
    <BoxContainer>
      <BoxInput
        type={'input'}
        id={`${idPrefix}${index}`}
        value={value}
        onChange={handleChange}
        autoComplete={'off'}
        draggable={true}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
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
