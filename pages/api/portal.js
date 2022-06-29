import { supabase } from "../../utils/supabase";
import cookie from "cookie";
import initStripe from "stripe";

const handler = async (req, res) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return res.status(401).send("Unauthorised");
  }

  const token = cookie.parse(req.headers.cookie)["sb-access-token"];

  supabase.auth.session = () => ({
    access_token: token,
  });

  const {
    data: { stripe_customer },
  } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id", user.id)
    .single();

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.billingPortal.sessions.create({
    customer: stripe_customer,
    return_url: `${process.env.CLIENT_URL}/dashbord`,
  });

  res.send({
    url: session.url,
  });
};

export default handler;

// We want to know Which stripe customer are we charging
// api routeでstripe customerを知るためにcookieの設定を行う
