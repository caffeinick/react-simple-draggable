import { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';

import Draggable from './components/draggable';
import Box from './components/box';

const todoTest = [
  {
    id: '0',
    text: '코딩하기',
  },
  {
    id: '1',
    text: '책 읽기',
  },
  {
    id: '2',
    text: '일기 쓰기',
  },
  {
    id: '3',
    text: '병원 예약하기',
  },
  {
    id: '4',
    text: '장 보러 가기',
  },
];

function App() {
  const [dragList, setDragList] = useState(todoTest);

  const listRef = useRef(todoTest);
  const startIndex = useRef(-1); // 시작한 인덱스 저장
  const leave = useRef(-1);
  const over = useRef(-1);

  const setTodo = useCallback(
    (value, index) => {
      const mapped = dragList.map((val, idx) =>
        idx !== index ? val : { id: val.id, text: value }
      );

      setDragList(mapped);
      listRef.current = mapped;
    },
    [dragList]
  );

  const handleDragStart = useCallback((index) => {
    startIndex.current = index;
  }, []);

  const setInDraggingList = useCallback(() => {
    const { reducedList } = dragList.reduce(
      (prev, cur, idx, arr) => {
        if (idx === leave.current) {
          prev.reducedList.push(arr[over.current]);
          return prev;
        }

        if (idx === over.current) {
          prev.reducedList.push({ ...arr[leave.current] });
          return prev;
        }

        prev.reducedList.push(cur);
        return prev;
      },
      { reducedList: [] }
    );

    setDragList(reducedList);
  }, [dragList]);

  const handleDragOver = useCallback(
    (index) => {
      const indexInt = parseInt(index, 10);

      if (over.current === indexInt) {
        return;
      }

      leave.current = over.current;
      over.current = indexInt;

      if (leave.current < 0) {
        leave.current = over.current;
      }

      setInDraggingList();
    },
    [setInDraggingList]
  );

  const handleDrop = useCallback(() => {
    // console.log(`from ${startIndex.current}, leave ${leave.current}, over ${over.current}`);

    // 부모 벗어나면 버그 발생
    // const mapped = dragList.map((cur) => {
    //   if (cur.text === '') {
    //     return listRef.current[startIndex.current];
    //   }
    //   return cur;
    // });

    // setDragList(mapped);
    // listRef.current = mapped;
    // }, [dragList]);
  }, []);

  const handleDragEnd = useCallback(
    (e) => {
      // console.log(e);
      handleDrop();
    },
    [handleDrop]
  );

  const handleResetFlags = useCallback(() => {
    startIndex.current = -1;
    leave.current = -1;
    over.current = -1;
  }, []);

  const renderBox = useCallback(() => {
    if (dragList.length === 0) {
      return null;
    }

    return dragList.map(({ id, text }, idx) => (
      <Box
        key={id}
        index={idx}
        value={text}
        onChange={setTodo}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        onReset={handleResetFlags}
      />
    ));
  }, [
    dragList,
    setTodo,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    handleResetFlags,
  ]);

  return (
    <Container>
      <Draggable>{renderBox()}</Draggable>
    </Container>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  padding: 10px;
  background-color: black;
`;
