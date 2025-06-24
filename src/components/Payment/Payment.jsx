import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
const Payment = () => {
    return (
        <div className='pt-20 px-10'>
            <Elements
            stripe={stripePromise}
            >
                <CheckoutForm></CheckoutForm>
            </Elements>
        </div >
    )
}

export default Payment