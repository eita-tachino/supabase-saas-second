import initStripe from "stripe";
// import { supabase } from "../../utils/supabase";
import { getServiceSupabase } from "../../utils/supabase";

const hundler = async (req, res) => {
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    res.status(401).send("You are not authorized to call this API");
  }

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const customer = await stripe.customers.create({
    email: req.body.record.email,
  });

  const supabase = getServiceSupabase();

  await supabase
    .from("profile")
    .update({
      stripe_customer: customer.id,
    })
    .eq("id", req.body.record.id);

  res.send({ message: `stripe cutomer created ${customer.id}` });
};

export default hundler;
