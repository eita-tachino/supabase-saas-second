import BookmarkCard from "../../components/bookmarkCard";
import axios from "axios";
import { useEffect, useState } from "react";
// import AddBookmarkDialog from "./../AddBookmarkDialog";
import AddBookmarkDialog from "../../components/addBookmarkDialog";
import { supabase } from "../../utils/supabase";

export default function BookmarkList(params) {
  const [bookmarks, setBookmarks] = useState([]);
  const [showAddBookmarkDialog, setShowAddBookmarkDialog] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("bookmark").select("*");
      // setBookmarks(data?.data);
      setBookmarks(data);
      console.log(data);
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col flex-wrap justify-center">
      <div className="m-2 p-2 mx-auto">
        <button
          onClick={() => setShowAddBookmarkDialog(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Bookmark
        </button>
      </div>
      <div className="bg-zinc-50 mx-auto">
        {bookmarks
          ?.sort((a, b) => b.created_at.localeCompare(a.created_at))
          .map((bookmark, i) => (
            <BookmarkCard bookmark={bookmark} key={i} />
          ))}
      </div>
      {showAddBookmarkDialog ? (
        <AddBookmarkDialog closeModal={() => setShowAddBookmarkDialog(false)} />
      ) : null}
    </div>
  );
}
