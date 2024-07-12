import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) //fine to expose

// export const options = {
//     // passing the client secret obtained from the server
//     clientSecret: "sk_test_51Pakk7EI22qc4TsuoQiYEOEzBbhSfdWW7eAFyP9CbvzW5XHq9Kcs0mCziO8zzwA6Vo6oZkCloaf68ssNFdlhKpWp00VMNnYVhI",
// };