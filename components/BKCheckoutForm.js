import React from 'react'
import { useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import datetime from 'date-and-time'
import Tab from 'react-bootstrap/Tab'
import Image from 'react-bootstrap/Image'
import { useRouter } from 'next/router'
import styles from '../styles/Payment.module.css'
import {decode as base64_decode, encode as base64_encode} from 'base-64'
import cookie from 'cookie'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

function BKCheckoutForm({ paymentIntent, order, paymentRequest, openApiToken }) {
    const orderObject = JSON.parse(order)
    const fullPrice = orderObject.price
    const paymentType = paymentRequest.paymentType
    const startDate = new Date(orderObject.arrivalDate)
    const endDate = new Date(orderObject.departureDate)
    const displayStartDate = datetime.format(startDate, 'ddd, MMM DD YYYY')
    const displayEndDate = datetime.format(endDate, 'ddd, MMM DD YYYY')
    const propertyImageUrl = orderObject.propertyImageUrl
    const router = useRouter()
    const stripe = useStripe()
    const elements = useElements()
    const [checkoutError, setCheckoutError] = useState('')
    const [formArrivalDate, setFormArrivalDate] = useState('')
    const formatToCurrency = amount => {
        return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
    };
    const formatPaypalCurrency = amount => {
        return amount.toFixed(2)
    }
    const paymentAmount = formatToCurrency(paymentIntent.amount/100)
    const paypalPaymentAmount = formatPaypalCurrency(paymentIntent.amount/100);

    async function makeReservation(order, paymentMethodId) {
        const response = await fetch('/api/guesty/makereservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + openApiToken
            },
            body: JSON.stringify({
                guest: {
                    firstName: paymentRequest.firstName,
                    lastName: paymentRequest.surname,
                    email: paymentRequest.email,
                    phone: paymentRequest.phone
                },
                ratePlanId: orderObject.ratePlanId,
                quoteId: orderObject.quoteId,
                ccToken: paymentMethodId
            })
        });
        
        if (!response.ok) {
            console.log("HTTP-Error: " + response.status)
            const text = await response.text()
            throw new Error('Failed to create reservation')
        }
        
        const text = await response.text() // Get the response text to check if it's valid JSON
        
        try {
            const reservation = JSON.parse(text)
            let data = {}
            order = {}
            
            // Empty payment cookie
            fetch("/api/savepaymentrequest", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({paymentData: JSON.stringify(data)})
            })
    
            // Empty order cookies
            fetch("/api/saveorder", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({order: JSON.stringify(order)})
            })
        
            return reservation.confirmationCode
        } catch (e) {
            console.error("Parsing error:", e)
            throw e; // Rethrow or handle parsing error appropriately
        }   

    }

    const makeStripePaymentMethod = async (event) => {
        event.preventDefault()
        const stripeResult = await stripe.createPaymentMethod({
            elements,
            params: {
                billing_details: {
                    name:  `${paymentRequest.firstName} ${paymentRequest.surname}`,
                    phone: `${paymentRequest.phone}`,
                    email: `${paymentRequest.email}`
                }
            }  
        })
        .then(function(result) {
            if(result.error) {
                setCheckoutError(`Error: ${result.error.code}`)
            }else{
                const paymentMethodId = result.paymentMethod.id
                makeReservation(order, paymentMethodId)
                .then(function(reservation) {
                    const propertyName = orderObject.propertyName
                    const receiptData = {
                        customerFirstName: paymentRequest.firstName,
                        propertyName: orderObject.propertyName,
                        fullPrice: fullPrice,
                        amountDue: paymentAmount,
                        paymentType: paymentType,
                        displayStartDate: displayStartDate,
                        displayEndDate: displayEndDate,
                        propertyImageUrl: propertyImageUrl,
                        reservation: reservation
                    }
                    router.push({
                        pathname: '/thanks',
                        query: {
                            receiptData: JSON.stringify(receiptData)
                        }
                    })
                })
                .catch(function(error) {
                    console.error("Failed to make reservation: ", error)
                    setCheckoutError(`Reservation failed: ${error.message}`)
                })
            }
        });
    }

    return (
        <div class="cont cont-col gap-24 max-full color-blue">
        <Container className={styles.bookingContainer}>
        <Row>
            <Col>
                <Row className={styles.formRow}>

                    {/* Left column */}
                    <Col>
                        <Row>
                            <Col>
                                <h3 className={styles.bookingHeader}>Payment Details</h3>
                                <div className={styles.ccList}>
                                    <img src="/img/cc_group.png" />
                                </div>
                                <h5 className={styles.bookingSmallSubHeader}>Pay in confidence with Stripe payments. Enter your details below.</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className={styles.cardSurround}>
                                    <form onSubmit={makeStripePaymentMethod}>
                                        <CardElement className={styles.stripeCard} /><br />
                                        <div className={styles.submitButton}>
                                        <button
                                            variant="primary"
                                            type="submit"
                                            disabled={!stripe}
                                            style={{
                                                color: 'white',
                                                fontWeight: 700,
                                                textAlign: 'center',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '100%'
                                            }}
                                        >
                                            Pay &euro;{paymentAmount} Now<svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.6383 21.5096L10.9901 20.8614C10.8111 20.6824 10.8111 20.3922 10.9901 20.2132L18.8785 12.3249L13.1162 12.3314C12.994 12.3319 12.8766 12.2835 12.7902 12.1971C12.7038 12.1107 12.6555 11.9934 12.656 11.8711L12.6624 10.9572C12.6619 10.835 12.7103 10.7177 12.7967 10.6312C12.8831 10.5448 13.0004 10.4965 13.1227 10.497L21.0758 10.4905C21.2581 10.4904 21.433 10.5627 21.562 10.6915L21.8083 10.9378C21.9354 11.0679 22.0074 11.242 22.0092 11.4239L22.0027 19.3771C22.0032 19.4993 21.9549 19.6166 21.8685 19.7031C21.7821 19.7895 21.6647 19.8378 21.5425 19.8373L20.6221 19.8373C20.5014 19.8385 20.3853 19.7911 20.2999 19.7058C20.2146 19.6204 20.1672 19.5043 20.1684 19.3836L20.1749 13.6212L12.2865 21.5096C12.1075 21.6886 11.8173 21.6886 11.6383 21.5096Z" fill="white"></path></svg>
                                        </button><br />
                                        </div>
                                        {checkoutError && <span style={{ color: "red" }}>{checkoutError}</span>}
                                    </form>
                                </div>
                                <div className={styles.tempSpacer} />
                            </Col>
                        </Row>
                    </Col>
                    {/* End left column */}

                    {/* Right column */}
                    <Col className="colRightCol">
                        <Row>
                            <Col>
                                <img className={styles.ticketPic} src={propertyImageUrl} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className={styles.propertyData}>
                                    <h4>{orderObject.propertyName}</h4>
                                    <h4>{displayStartDate} &mdash; {displayEndDate}</h4>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr className={styles.greyLine} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className={styles.propertySubData}>
                                    <h5>{paymentType === 'Deposit' ? 'Deposit Due Today:' : 'Due Today:'}</h5>
                                </div>
                            </Col>
                            <Col>
                                <div className={styles.propertySubDataRight}>
                                    <h5>&euro; {paymentAmount}</h5>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    {/* End right column */}

                </Row>
            </Col>
        </Row>
        </Container>
        </div>
    )
}

export default BKCheckoutForm