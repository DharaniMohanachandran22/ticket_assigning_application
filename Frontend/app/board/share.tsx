import { useState } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [linkCreated, setLinkCreated] = useState(false);
  const shareLink = "https://yourapp.com/board/1234"; // Mock share link

  const handleCreateLink = () => {
    setLinkCreated(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied!");
  };

  const handleDeleteLink = () => {
    setLinkCreated(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Share Board</h2>

        {!linkCreated ? (
          <button
            onClick={handleCreateLink}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create Link
          </button>
        ) : (
          <div>
            <input
              type="text"
              value={shareLink}
              readOnly
              className="w-full p-2 border rounded mb-2"
            />
            <div className="flex justify-between">
              <button
                onClick={handleCopyLink}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                Copy Link
              </button>
              <button
                onClick={handleDeleteLink}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete Link
              </button>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-300 px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
