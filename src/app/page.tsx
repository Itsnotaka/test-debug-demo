"use client";
import { useWindowSize } from "@react-hook/window-size";
import { useContainerPosition, useMasonry, usePositioner, useScroller } from "masonic";
import React, { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const [windowWidth, height] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    height
  ]);
  const positioner = usePositioner({ columnCount: 5, width, columnGutter: 8 });
  const { scrollTop, isScrolling } = useScroller(offset);
  const CardWithIsScrolling = React.useCallback(
    (props) => <FakeCard isScrolling={isScrolling} {...props} />,
    [isScrolling]
  );

  return (
    <main className={"w-full h-svh overflow-y-auto"}>
      {useMasonry({
        positioner,
        scrollTop,
        isScrolling,
        height,
        containerRef,
        items: items,
        overscanBy: 3,
        render: CardWithIsScrolling
      })}
    </main>
  );
};


const FakeCard = (props) => (
  <div className={"p-2 bg-gray-100 rounded-md"} style={{ height: props.data.height }}>
    <span>{props.data.id}</span>
    <span>Is scrolling? {String(props.isScrolling)}</span>
  </div>
);



const randInt = (min = 200, max = 500) =>
  Math.floor(Math.random() * (max - min)) + min;
const getFakeItems = (cur = 0) => {
  const fakeItems = [];
  for (let i = 5000 * cur; i < cur * 5000 + 5000; i++)
    fakeItems.push({ id: i, height: randInt() });
  return fakeItems;
};
const items = getFakeItems();
