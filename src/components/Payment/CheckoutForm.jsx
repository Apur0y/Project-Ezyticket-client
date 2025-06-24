import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import useTravelContext from '../../Hooks/TrevalHook/useTravelContext';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
  const [errorMsg, setErrorMsg] = useState("")
  const [clientSecret, setClientSecret] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure()
  const { busPassengerData, getBusPaymentData } = useTravelContext() // need price set hare for all section and make this state public for use all sections
  const { user } = useAuth()
  const navigate = useNavigate()


  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: busPassengerData?.totalPrices })
      .then(res => {
        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret)
      })
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement)

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })

    if (error) {
      console.log("payment Error", error)
      setErrorMsg(error.message)
    }
    else {
      console.log("payment methods", paymentMethod)
      setErrorMsg("")
    }
    // confirm payment

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user.email || "anonymous",
          name: user?.displayName || "anonymous",
        }
      }
    })

    if (confirmError) {
      console.log("Confirm Error", confirmError)
    }
    else {
      console.log("Payment Intent", paymentIntent)
      if (paymentIntent.status === "succeeded") {
        console.log('transaction id', paymentIntent.id)
        setTransactionId(paymentIntent.id)
        // save data in database
        if(busPassengerData.verifyData === "bus"){
          console.log(transactionId)
          getBusPaymentData({...busPassengerData, transactionId: paymentIntent.id}, navigate)
        }

      }
    }

  }

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Secure Card Payment</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm text-gray-600">Card Details</label>
        <div className="p-3 border rounded-lg mb-3">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#1a202c',
                  fontFamily: 'Arial, sans-serif',
                  '::placeholder': {
                    color: '#a0aec0',
                  },
                },
                invalid: {
                  color: '#e53e3e',
                },
              },
            }}
          />
        </div>
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        {transactionId && (
          <p className="text-green-600 text-sm my-2">Your transaction ID: {transactionId}</p>
        )}
        <button
          className='mt-4 w-full bg-main text-white py-2 rounded-lg hover:bg-main transition disabled:opacity-50'
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay Now
        </button>
      </form>
    </div>

  )
}

export default CheckoutForm;