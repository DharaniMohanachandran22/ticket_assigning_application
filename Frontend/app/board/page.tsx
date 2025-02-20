"use client";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ShareModal from "./share";
import TicketModal from "./ticket"; // Updated TicketModal

export default function BoardPage() {
  const [boards] = useState(["My Trello Board", "Test Board"]);
  const [lists, setLists] = useState([
    {
      id: "1",
      title: "To Do",
      cards: [
        { id: "1", title: "Task 1" },
        { id: "2", title: "Task 2" },
      ],
    },
    {
      id: "2",
      title: "In Progress",
      cards: [
        { id: "3", title: "Fix Bug" },
        { id: "4", title: "UI Update" },
      ],
    },
    { id: "3", title: "Done", cards: [{ id: "5", title: "Deploy App" }] },
  ]);

  const [visibility, setVisibility] = useState("Private");
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isTicketModalOpen, setTicketModalOpen] = useState(false);

  const openTicketModal = () => {
    setTicketModalOpen(true);
  };

  // Handle drag and drop
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, type } = result;

    if (type === "list") {
      // Dragging entire lists
      const reorderedLists = [...lists];
      const [movedList] = reorderedLists.splice(source.index, 1);
      reorderedLists.splice(destination.index, 0, movedList);
      setLists(reorderedLists);
    } else {
      // Dragging cards between lists
      const sourceList = lists.find((list) => list.id === source.droppableId);
      const destList = lists.find(
        (list) => list.id === destination.droppableId
      );

      const sourceCards = [...sourceList.cards];
      const destCards = [...destList.cards];

      const [movedCard] = sourceCards.splice(source.index, 1);

      if (source.droppableId === destination.droppableId) {
        // Moving within the same list
        sourceCards.splice(destination.index, 0, movedCard);
        sourceList.cards = sourceCards;
      } else {
        // Moving to another list
        destCards.splice(destination.index, 0, movedCard);
        sourceList.cards = sourceCards;
        destList.cards = destCards;
      }

      setLists([...lists]);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-60 bg-gray-900 text-white p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold">Boards</h2>
            <button className="bg-white text-gray-900 px-4 py-2 rounded-md shadow-md hover:bg-gray-200">
              Create
            </button>
            <ul className="mt-4 space-y-2">
              {boards.map((board, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
                >
                  {board}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Board Content */}
        <main className="flex-1 bg-pink-500 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">My Point Board</h1>
              {/* Visibility Dropdown */}
              <select
                className="text-sm bg-white text-gray-700 px-2 py-1 rounded cursor-pointer"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <button
              onClick={() => setShareModalOpen(true)}
              className="bg-white text-gray-900 px-4 py-2 rounded-md shadow-md hover:bg-gray-200"
            >
              Share
            </button>
          </div>

          {/* Lists */}
          <Droppable droppableId="board" type="list" direction="horizontal">
            {(provided) => (
              <div
                className="flex space-x-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists.map((list, index) => (
                  <Draggable key={list.id} draggableId={list.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="w-64 bg-white rounded-md p-3 shadow-md"
                      >
                        <h3 className="font-semibold">{list.title}</h3>
                        <Droppable droppableId={list.id} type="card">
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="mt-2 space-y-2"
                            >
                              {list.cards.map((card, cardIndex) => (
                                <Draggable
                                  key={card.id}
                                  draggableId={card.id}
                                  index={cardIndex}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="p-3 bg-blue-100 rounded shadow cursor-pointer"
                                      onClick={openTicketModal}
                                    >
                                      {card.title}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        <button className="mt-2 w-full bg-gray-200 p-2 text-sm rounded">
                          + Add a card
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <div className="w-64 bg-white rounded-md p-3 shadow-md flex items-center justify-center text-gray-500 cursor-pointer">
                  + Add another list
                </div>
              </div>
            )}
          </Droppable>
        </main>

        {/* Modals */}
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setShareModalOpen(false)}
        />
        <TicketModal
          isOpen={isTicketModalOpen}
          onClose={() => setTicketModalOpen(false)}
        />
      </div>
    </DragDropContext>
  );
}
