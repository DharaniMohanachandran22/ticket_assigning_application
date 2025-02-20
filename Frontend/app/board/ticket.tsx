"use client";
import { useState } from "react";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Comment {
  _id?: string;
  text: string;
  timestamp: Date;
  edited: boolean;
  user?: string;
}

export default function TicketModal({ isOpen, onClose }: TicketModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");

  const addComment = () => {
    if (!comment.trim()) return;
    const newComment: Comment = {
      _id: String(Date.now()),
      text: comment,
      timestamp: new Date(),
      edited: false,
      user: "Current User",
    };
    setComments([...comments, newComment]);
    setComment("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold">Create Ticket</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 w-full mt-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 w-full mt-2"
        />
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
          className="border p-2 w-full mt-2"
        />
        <input
          type="text"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          placeholder="Assignee"
          className="border p-2 w-full mt-2"
        />

        <div className="mt-4">
          <h3 className="font-semibold">Comments</h3>
          <div className="space-y-2">
            {comments.map((c) => (
              <div key={c._id} className="border p-2 rounded">
                <p>{c.text}</p>
                <span className="text-sm text-gray-500">
                  {new Date(c.timestamp).toLocaleString()}{" "}
                  {c.edited && "(edited)"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          className="border p-2 w-full mt-2"
        />
        <button
          onClick={addComment}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
        >
          Add Comment
        </button>

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}
