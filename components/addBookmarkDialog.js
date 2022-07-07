import axios from "axios";
import { useRef } from "react";
import { supabase } from "../utils/supabase";
// import CloseIcon from "./../CloseIcon";
import CloseIcon from "./closeIcon";

export default function AddBookmarkDialog({ closeModal }) {
  const formRef = useRef();

  async function addBookmark() {
    var { title, content } = formRef.current;
    title = title.value;
    content = content.value;

    await supabase
      .from("bookmark")
      .insert([{ title, content, synopsis: content.slice(0, 100) + "..." }]);

    // await axios.post("http://localhost:1337/bookmarks", {
    //   title,
    //   content,
    //   synopsis: content.slice(0, 100) + "...",
    // });
    window.location.reload();
  }

  return (
    <div className="modal fixed -top-0 left-0 w-full h-full flex flex-col z-0 items-center">
      <div
        className="modal-backdrop opacity-70 bg-gray-50 fixed w-full h-full z-10"
        onClick={closeModal}
      ></div>
      <div className="modal-content z-20 w-2/5 mt-5 bg-white shadow-md">
        <div className="modal-header flex justify-between items-center bg-red-600 p-3 text-white">
          <h3 className="text-white font-bold">Add Bookmark</h3>
          <span
            style={{ padding: "10px", cursor: "pointer" }}
            onClick={closeModal}
          >
            <CloseIcon />
          </span>
        </div>
        <div className="modal-body content m-2 p-5 z-50">
          <form ref={formRef}>
            <div className="w-full">
              <div className="pl-2">
                <span>TITLE</span>
              </div>

              <input
                type="text"
                className="border-gray-200 border-2 w-full m-2 p-2 rounded-md"
                placeholder="Type in title.."
                name="title"
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
                name="content"
              ></textarea>
            </div>
          </form>
        </div>
        <div className="modal-footer flex justify-between p-4 bg-gray-200">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
            onClick={addBookmark}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
