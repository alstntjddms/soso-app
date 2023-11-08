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

  console.log("result1");
  console.log(result);

  return result;
};

export default reorder;

export const reorderQuoteMap = ({ quoteMap, source, destination }) => {
  //기존 데이터
  console.log("quoteMap");
  console.log(quoteMap);

  // 기존에 있던 위치
  console.log("source");
  console.log(source);

  // 새로운 위치
  console.log("destination");
  console.log(destination);

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

    console.log("result2");
    console.log(result);
    return {
      quoteMap: result,
    };
  }
};

export function moveBetween({ list1, list2, source, destination }) {
  const newFirst = Array.from(list1.values);
  const newSecond = Array.from(list2.values);

  const moveFrom = source.droppableId === list1.id ? newFirst : newSecond;
  const moveTo = moveFrom === newFirst ? newSecond : newFirst;

  const [moved] = moveFrom.splice(source.index, 1);
  moveTo.splice(destination.index, 0, moved);

  return {
    list1: {
      ...list1,
      values: newFirst,
    },
    list2: {
      ...list2,
      values: newSecond,
    },
  };
}
