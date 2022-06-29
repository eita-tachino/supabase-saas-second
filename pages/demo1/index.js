import { supabase } from "../../utils/supabase";
import Link from "next/link";

export default function Demo({ lessons }) {
  return (
    <>
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className="flex flex-col items-center px-5 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8"
        >
          <div className="flex flex-col items-center pb-10 mx-auto my-10 border-b border-gray-400 w-full sm:flex-row">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 text-neutral-600 rounded-full bg-gray-50 sm:mr-10">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="12" cy="12" r="9"></circle>
                <line x1="3.6" y1="15" x2="14.15" y2="15"></line>
                <line
                  x1="3.6"
                  y1="15"
                  x2="14.15"
                  y2="15"
                  transform="rotate(72 12 12)"
                ></line>
                <line
                  x1="3.6"
                  y1="15"
                  x2="14.15"
                  y2="15"
                  transform="rotate(144 12 12)"
                ></line>
                <line
                  x1="3.6"
                  y1="15"
                  x2="14.15"
                  y2="15"
                  transform="rotate(216 12 12)"
                ></line>
                <line
                  x1="3.6"
                  y1="15"
                  x2="14.15"
                  y2="15"
                  transform="rotate(288 12 12)"
                ></line>
              </svg>
            </div>
            <Link key={lesson.id} href={`/demo1/${lesson.id}`}>
              <a>{lesson.title}</a>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export const getStaticProps = async () => {
  const { data: lessons } = await supabase.from("lesson").select("*");

  return {
    props: {
      lessons,
    },
  };
};
