// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex, Yn) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  if (Yn === true) {
    result.forEach((item, index) => {
      item.index = index;
    });
  }

  return result;
};

export default reorder;

// 데이터 추가 후 list 재정렬 함수
export const addData = (datas, key, data) => {
  const current = [...datas[key]];
  current.unshift(data);

  current.forEach((item, index) => {
    item.index = index;
  });
  const result = {
    ...datas,
    [key]: current,
  };

  return result;
};

// 데이터 변경 후 list 재정렬 함수
export const reorderQuoteMap = ({ quoteMap, source, destination }) => {
  const current = [...quoteMap[source.droppableId]];
  const next = [...quoteMap[destination.droppableId]];
  const target = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index, true);
    const result = {
      ...quoteMap,
      [source.droppableId]: reordered,
    };
    return {
      quoteMap: result,
    };
  }
  // moving to different list
  if (source.droppableId !== destination.droppableId) {
    // remove from original
    current.splice(source.index, 1);
    current.forEach((item, index) => {
      item.index = index;
    });
    // insert into next
    next.splice(destination.index, 0, target);
    next.forEach((item, index) => {
      item.index = index;
    });
    const result = {
      ...quoteMap,
      [source.droppableId]: current,
      [destination.droppableId]: next,
    };
    return {
      quoteMap: result,
    };
  }
};
