import React, {useEffect} from "react"
import Button from './Button'


const Checkout = () => {
  let stripe;
  
  useEffect(() => {
    stripe = window.Stripe("pk_test_jG9s3XMdSjZF9Kdm5g59zlYd")// Initialise Stripe.js with your publishable key
  }, [])

  const redirectToCheckout = async (e) => {
    e.preventDefault();
    const { error } = await stripe.redirectToCheckout({
      items: [{ sku: "sku_DjQJN2HJ1kkvI3", quantity: 1 }],
      successUrl: `http://localhost:8000/page-2/`,
      cancelUrl: `http://localhost:8000/`,
    });
    if (error) {
      console.warn("Error:", error)
    }
  }

  return (
    <Button
      onClick={e => redirectToCheckout(e)}
    >
      BUY IT!
    </Button>
  )
}
export default Checkout