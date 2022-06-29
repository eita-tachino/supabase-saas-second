import { supabase } from "../../utils/supabase";

const handler = async (req, res) => {
  await supabase.auth.api.setAuthCookie(req, res);
};

export default handler;

// call this end-point whenever the state of the user changes
