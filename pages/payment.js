import Stripe from "stripe"
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import Head from 'next/head'
import BKBanner from "@components/BKBanner"
import BKCheckoutForm from '../components/BKCheckoutForm'
import { fetchOpenApiToken } from '../utils/tokenManager'
import styles from '../styles/Payment.module.css'

const payment = ({ order, paymentRequest, paymentIntent, openApiToken }) => {
    const pageTitle = 'Make a booking'
    const paymentData = JSON.parse(decodeURIComponent(paymentRequest))
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

    const bannerTopHeading='Dublin At Home Payment'
    const bannerMainHeading='Dublin At Home Booking Engine'
    const bannerBottomHeading='Make a secure payment to Dublin At Home'
    const bannerImage='/img/Page_title-BG.png'

    return (
        <>
            <Elements stripe={stripePromise}>
                <BKCheckoutForm paymentIntent={paymentIntent} order={order} paymentRequest={paymentData} openApiToken={openApiToken} />
            </Elements>
        </> 
    )

}

export const getServerSideProps = async ({ req, res }) => {
    const paymentInfo = JSON.parse(decodeURIComponent(req.cookies.paymentrequest))
    const orderInfo = JSON.parse(decodeURIComponent(req.cookies.order))
    const price = orderInfo.price
    const paymentDescription = paymentInfo.paymentType + ' for ' + orderInfo.propertyName
    const arrivalDate = orderInfo.arrivalDate
    const departureDate = orderInfo.departureDate
    const paymentIntentAmount = paymentInfo.amountDue * 100
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const openApiToken = await fetchOpenApiToken()
    const paymentIntent = await stripe.paymentIntents.create({
        'amount': paymentIntentAmount,
        'description': paymentDescription,
        'currency': 'eur',
        'metadata[Arriving]': arrivalDate,
        'metadata[Departing]': departureDate,
        'metadata[Price Offered]': paymentInfo.amountDue,
        'metadata[Full Price]': price
    })
    return {
        props: {
            order: req.cookies.order || "",
            paymentRequest: req.cookies.paymentrequest,
            paymentIntent,
            openApiToken
        }
    }
}

export default payment