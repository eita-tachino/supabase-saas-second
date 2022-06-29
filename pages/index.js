import { supabase } from "../utils/supabase";
import { useUser } from "../context/user";

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <p>Working yo dude!</p>
    </div>
  );
}
