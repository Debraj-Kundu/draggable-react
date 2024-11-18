import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import React from "react";

const Items = ({ id, val }) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: { type: "item" },
  });
  return (
    <div
      {...listeners}
      ref={setNodeRef}
      {...attributes}
      style={{ transition, transform: CSS.Translate.toString(transform) }}
      className={clsx(
        "px-2 py-2 bg-white shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex flex-center justify-between">
        {val}
        {/* <button
          className="border p-2 rounded-xl shadow-lg hover:shadow-xl"
          {...listeners}
        >
          Drag
        </button> */}
      </div>
    </div>
  );
};

export default Items;
