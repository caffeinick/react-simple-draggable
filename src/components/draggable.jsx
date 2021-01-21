import { useRef, useCallback } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Box from './box';

const Draggable = ({ list: dragList = [], setList: setDragList = () => {} }) => {
  const listRef = useRef(dragList);
  const startIndex = useRef(-1); // 시작한 인덱스 저장
  const leave = useRef(-1);
  const over = useRef(-1);

  const boxRefs = useRef([]);

  const setItem = useCallback(
    (value, index) => {
      const mapped = dragList.map((val, idx) =>
        idx !== index ? val : { id: val.id, text: value }
      );

      setDragList(mapped);
      listRef.current = mapped;
    },
    [dragList, setDragList]
  );

  const createItem = useCallback(
    (index) => {
      console.log(boxRefs.current);

      setDragList(dragList.concat({ id: uuidv4(), text: ' ' }));

      setTimeout(() => {
        boxRefs.current[index + 1]?.focus();
      });
    },
    [dragList, setDragList]
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
  }, [dragList, setDragList]);

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

  const handleRef = (ref, index) => {
    boxRefs.current[index] = ref;
  };

  const renderBox = useCallback(() => {
    if (dragList.length === 0) {
      return null;
    }

    return dragList.map(({ id, text }, idx) => (
      <Box
        ref={(ref) => handleRef(ref, idx)}
        key={id}
        index={idx}
        value={text}
        onChange={setItem}
        onCreate={createItem}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        onReset={handleResetFlags}
      />
    ));
  }, [
    dragList,
    setItem,
    createItem,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    handleResetFlags,
  ]);

  return <DraggableContainer>{renderBox()}</DraggableContainer>;
};

export default Draggable;

const DraggableContainer = styled.div`
  height: 100%;
  padding: 20px;
  background-color: rgb(245, 223, 77);
`;
