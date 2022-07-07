// import CloseIcon from "./../CloseIcon";
import CloseIcon from "./closeIcon";

export default function ViewBookmarkDialog({ closeModal, bookmark }) {
  return (
    <div className="modal fixed -top-0 left-0 w-full h-full flex flex-col z-0 items-center">
      <div
        className="modal-backdrop opacity-70 bg-gray-50 fixed w-full h-full z-10"
        onClick={closeModal}
      ></div>
      <div className="modal-content z-20 w-2/5 mt-5 bg-white shadow-md">
        <div className="modal-header flex justify-between items-center bg-red-600 p-3 text-white">
          <h3 className="text-white font-bold">View Bookmark</h3>
          <span
            style={{ padding: "10px", cursor: "pointer" }}
            onClick={closeModal}
          >
            <CloseIcon />
          </span>
        </div>
        <div className="modal-body content m-2 p-5 z-50">
          <div className="w-full">
            <div className="pl-2">
              <span>TITLE</span>
            </div>

            <input
              type="text"
              className="border-gray-200 border-2 w-full m-2 p-2 rounded-md"
              placeholder="Type in title.."
              defaultValue={bookmark?.title}
              disabled={true}
            />
          </div>
          <div className="w-full">
            <div className="pl-2 mt-3">
              <span>CONTENT</span>
            </div>

            <textarea
              type="text"
              className="border-gray-200 border-2 w-full m-2 p-2 rounded-md"
              placeholder="Type in content.."
              disabled={true}
              defaultValue={bookmark?.content}
            ></textarea>
          </div>
        </div>
        <div className="modal-footer flex justify-between p-4 bg-gray-200">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
