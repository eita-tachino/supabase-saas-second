import { supabase } from "../../../utils/supabase";
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
  const { priceId } = req.query;

  const lineItems = [
    {
      price: priceId,
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    customer: stripe_customer,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: `${process.env.CLIENT_URL}/payment/success`,
    cancel_url: `${process.env.CLIENT_URL}/payment/cancelled`,
  });

  res.send({
    id: session.id,
  });

  // res.send({
  //   ...user,
  //   stripe_customer,
  // });
};

export default handler;

// We want to know Which stripe customer are we charging
// api routeでstripe customerを知るためにcookieの設定を行う