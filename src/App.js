import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import Container from "./Container";

import Items from "./Items";

import { v4 as uuid4 } from "uuid";
import { restrictToHorizontalAxis, restrictToVerticalAxis } from "@dnd-kit/modifiers";

// const DNDType = {
//   id: UniqueIdentifier,
//   title: String,
//   items: {
//     id: UniqueIdentifier,
//     title: String
//   }
// }

/*

[
  {
      "Col 1": "a",
      "Col 2": "b"
  },
  {
      "Col 1": "c",
      "Col 2": "d"
  }
]
-------------------------
[
  {
    id: "column-" + uuid4()
    data: "Col 1"
    rows: [
      {
        id: "item-" + uuid4()
        data: "a" 
      },
      {
        id: "item-" + uuid4()
        data: "c" 
      }
    ]
  },
  {
    id: "column-" + uuid4()
    data: "Col 2"
    rows: [
      {
        id: "item-" + uuid4()
        data: "b" 
      },
      {
        id: "item-" + uuid4()
        data: "d" 
      }
    ]
  }
]

*/
const dymmyData = [
  {
    id: "container-" + uuid4(),
    title: "Column-1",
    items: [
      {
        id: "item-" + uuid4(),
        title: "Item-1",
      },
      {
        id: "item-" + uuid4(),
        title: "Item-10",
      },
      {
        id: "item-" + uuid4(),
        title: "Item-100",
      },
    ],
  },
  {
    id: "container-" + uuid4(),
    title: "Column-2",
    items: [
      {
        id: "item-" + uuid4(),
        title: "Item-2",
      },
      {
        id: "item-" + uuid4(),
        title: "Item-20",
      },
      {
        id: "item-" + uuid4(),
        title: "Item-200",
      },
    ],
  },
  {
    id: "container-" + uuid4(),
    title: "Column-3",
    items: [
      {
        id: "item-" + uuid4(),
        title: "Item-3",
      },
      {
        id: "item-" + uuid4(),
        title: "Item-30",
      },
      {
        id: "item-" + uuid4(),
        title: "Item-300",
      },
    ],
  },
];

function App() {
  const [containers, setContainers] = useState(dymmyData);
  const [activeId, setActiveId] = useState(null);
  const [columnHover, setColumnHover] = useState(false);


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function findValueOfItems(id, type) {
    if (type === "container") {
      return containers.find((item) => item.id === id);
    }
    if (type === "item") {
      return containers.find((container) =>
        container.items.find((item) => item.id === id)
      );
    }
  }

  const findItemTitle = (id) => {
    const container = findValueOfItems(id, "item");
    if (!container) return "";
    const item = container.items.find((item) => item.id === id);
    if (!item) return "";
    return item.title;
  };

  const findContainerTitle = (id) => {
    const container = findValueOfItems(id, "container");
    if (!container) return "";
    return container.title;
  };

  const findContainerItems = (id) => {
    const container = findValueOfItems(id, "container");
    if (!container) return [];
    return container.items;
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;
    if (id.toString().includes("item")) setColumnHover(false);
    else setColumnHover(true);
    setActiveId(id);
  };

  const handleDragMove = (event) => {
    const { active, over } = event;
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = activeContainer;

      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );

      let newItems = [...containers];
      newItems.forEach((container, activeContainerIndex) => {
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );
      });

      setContainers(newItems);
    }
  };
  
  // This is the function that handles the sorting of the containers and items when the user is done dragging.
  function handleDragEnd(event) {
    const { active, over } = event;

    // Handling Container Sorting
    if (
      active.id.toString().includes("container") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id
      );
      // Swap the active and over container
      let newItems = [...containers];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      setContainers(newItems);
    }

    // Handling item Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );
        setContainers(newItems);
      } else {
        // In different containers
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        setContainers(newItems);
      }
    }
    // Handling item dropping into Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
    setActiveId(null);
  }
  

  return (
    <div className="mx-auto max-w-7xl py-10">
      <div className="mt-10">
        <div className="grid grid-cols-3 gap-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            modifiers={[columnHover ? restrictToHorizontalAxis : restrictToVerticalAxis]}
          >
            <SortableContext
              items={containers.map((container) => container.id)}
            >
              {containers.map((container) => (
                <Container
                  key={container.id}
                  title={container.title}
                  id={container.id}
                >
                  <SortableContext
                    items={container.items.map((i) => i.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="flex items-start flex-col gap-y-4">
                      {container.items.map((item) => (
                        <Items key={item.id} id={item.id} title={item.title} />
                      ))}
                    </div>
                  </SortableContext>
                </Container>
              ))}
            </SortableContext>
            <DragOverlay>
              {activeId && activeId.toString().includes("item") && (
                <Items id={activeId} title={findItemTitle(activeId)} />
              )}
              {activeId && activeId.toString().includes("container") && (
                <Container id={activeId} title={findContainerTitle(activeId)}>
                  {findContainerItems(activeId).map((i) => (
                    <Items title={i.title} id={i.id} key={i.id} />
                  ))}
                </Container>
              )}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

export default App;
