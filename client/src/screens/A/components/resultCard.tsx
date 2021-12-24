import React from "react";
import { useDrag, useDrop } from "react-dnd";

export default function ResultCard({ item, setShowModal, setModalData }: any) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const move = () => {
    console.log("Droip");
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "item",
      drop: () => move(),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <>
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}
        className="rounded-lg p-4 shadow-lg my-2 hover:shadow cursor-move select-none"
      >
        <h1 className="text-xl">{item?.title}</h1>
        <div className="flex justify-between">
          <span>= {item?.calculationResult}</span>
          <button
            onClick={() => {
              setShowModal(true);
              setModalData(item);
            }}
            className="bg-green-200 text-green-900 rounded-lg text-center text-xs px-2 p-1 hover:bg-green-300 capitalize font-semibold"
          >
            See input
          </button>
        </div>
      </div>

      <div ref={drop}>
        {isOver && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              zIndex: 1,
              opacity: 0.5,
              backgroundColor: "yellow",
            }}
          />
        )}
      </div>
    </>
  );
}
