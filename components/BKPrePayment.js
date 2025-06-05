import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import datetime from 'date-and-time'
import Modal from 'react-bootstrap/Modal'
import styles from '../styles/Payment.module.css'
import { fetchBookingToken} from '../utils/tokenManager'


const BKPrePayment = ({orderData}) => {
    const startDate = new Date(orderData.arrivalDate)
    const endDate = new Date(orderData.departureDate)
    const displayStartDate = datetime.format(startDate, 'ddd, MMM DD YYYY')
    const displayEndDate = datetime.format(endDate, 'ddd, MMM DD YYYY')
    const nights = datetime.subtract(endDate, startDate).toDays()
    const router = useRouter()
    const [propertyPic, setPropertyPic] = useState('')
    const [checkoutError, setCheckoutError] = useState()
    const [checkoutSuccess, setCheckoutSuccess] = useState()
    const [showPaymentTabs, setShowPaymentTabs] = useState(false)
    const [depositPayment, setDepositPayment] = useState(false)
    let depositAmount = ((orderData.depositPercent / 100) * orderData.price).toFixed(2)
        depositAmount = Math.round(depositAmount).toFixed(2)
    const today = new Date()
    const arrivalDateCheck = new Date(orderData.arrivalDate)
    const depositPaymentDate = datetime.addDays(arrivalDateCheck, -orderData.depositDays)
    const propertyThumbnail = router.query.propertyThumbnail

    const [terms, setTerms] = useState(false)
    const toggleTerms = (e) => {
        e.preventDefault()
        setTerms(!terms)
    }

    function toHumanReadableDate(dateString) {
        const date = new Date(dateString);
    
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
    
        // Function to add the ordinal suffix
        const getOrdinal = (n) => {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return s[(v - 20) % 10] || s[v] || s[0];
        };
    
        return `${day}${getOrdinal(day)} ${month} ${year}`;
    }

    // From 'react-hook-form'
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    let depositPaymentAllowed = false
    let paymentType = 'full'
    if(today <= depositPaymentDate) {
        depositPaymentAllowed = true
    }else{
        depositPaymentAllowed = false
    }
    let amountDue = orderData.price.toFixed(2)

    const setAsDepositPayment = () => {
        setDepositPayment(true)
    }

    const setAsFullPayment = () => {
        setDepositPayment(false)
    }

    const onSubmit = async (data, event) => {

        const propertyArrivalDate = toHumanReadableDate(orderData.arrivalDate)
        const propertyDepartureDate = toHumanReadableDate(orderData.departureDate)

        if(depositPayment) {
            amountDue = depositAmount
            paymentType = 'Deposit'
        }else{
            amountDue = orderData.price
            paymentType = 'Full payment'
        }
        data.amountDue = amountDue
        data.paymentType = paymentType
        data.arrivalDate = propertyArrivalDate
        data.departureDate = propertyDepartureDate
        data.property = orderData.propertyName
        data.propertyCode = orderData.propertyId
        data.propertyImageUrl = orderData.propertyImageUrl
        data.propertyName = orderData.propertyName
        data.propertyId = orderData.propertyId

        // Save data to cookie
        fetch("/api/savepaymentrequest", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({paymentData: JSON.stringify(data)})
        })

        // Send email to admin
        const result = await fetch('/api/customer_sales_intent_email', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.text()
        })
        .then((data) => {
            router.push({
                pathname: '/payment'
            })
        })
    }

    const renderPaymentButtons = () => {
        if(depositPaymentAllowed) {
            return (
                <>
                    <div className={styles.submitButton}>
                        <button
                            id="depositPaymentButton"
                            type="submit"
                            name="depositButton"
                            onClick={setAsDepositPayment}
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
                            Pay a deposit of &euro;{depositAmount}
                            <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.6383 21.5096L10.9901 20.8614C10.8111 20.6824 10.8111 20.3922 10.9901 20.2132L18.8785 12.3249L13.1162 12.3314C12.994 12.3319 12.8766 12.2835 12.7902 12.1971C12.7038 12.1107 12.6555 11.9934 12.656 11.8711L12.6624 10.9572C12.6619 10.835 12.7103 10.7177 12.7967 10.6312C12.8831 10.5448 13.0004 10.4965 13.1227 10.497L21.0758 10.4905C21.2581 10.4904 21.433 10.5627 21.562 10.6915L21.8083 10.9378C21.9354 11.0679 22.0074 11.242 22.0092 11.4239L22.0027 19.3771C22.0032 19.4993 21.9549 19.6166 21.8685 19.7031C21.7821 19.7895 21.6647 19.8378 21.5425 19.8373L20.6221 19.8373C20.5014 19.8385 20.3853 19.7911 20.2999 19.7058C20.2146 19.6204 20.1672 19.5043 20.1684 19.3836L20.1749 13.6212L12.2865 21.5096C12.1075 21.6886 11.8173 21.6886 11.6383 21.5096Z" fill="white"></path></svg>
                        </button>
                    </div>
                </>
            )
        }else{
            return (
                <>
                    <div className={styles.submitButton}>
                        <button
                            id="fullPaymentButton"
                            type="submit"
                            name="fullPaymentButton"
                            onClick={setAsFullPayment}
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
                            Make full payment of &euro;{amountDue}
                            <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.6383 21.5096L10.9901 20.8614C10.8111 20.6824 10.8111 20.3922 10.9901 20.2132L18.8785 12.3249L13.1162 12.3314C12.994 12.3319 12.8766 12.2835 12.7902 12.1971C12.7038 12.1107 12.6555 11.9934 12.656 11.8711L12.6624 10.9572C12.6619 10.835 12.7103 10.7177 12.7967 10.6312C12.8831 10.5448 13.0004 10.4965 13.1227 10.497L21.0758 10.4905C21.2581 10.4904 21.433 10.5627 21.562 10.6915L21.8083 10.9378C21.9354 11.0679 22.0074 11.242 22.0092 11.4239L22.0027 19.3771C22.0032 19.4993 21.9549 19.6166 21.8685 19.7031C21.7821 19.7895 21.6647 19.8378 21.5425 19.8373L20.6221 19.8373C20.5014 19.8385 20.3853 19.7911 20.2999 19.7058C20.2146 19.6204 20.1672 19.5043 20.1684 19.3836L20.1749 13.6212L12.2865 21.5096C12.1075 21.6886 11.8173 21.6886 11.6383 21.5096Z" fill="white"></path></svg>
                        </button>
                    </div>
                </>
            )
        }
    }

    return (
        <div className="cont cont-col gap-24 max-full color-blue">
  <Container className={styles.bookingContainer}>
    <Row className="d-flex flex-column flex-lg-row"> 
      {/* Right Column (Property data) - Moves Above on Mobile */}
      <Col lg={6} md={12} className="order-md-1 order-lg-2">  
        <Row>
          <Col>
            <img className={styles.ticketPic} src={orderData.propertyImageUrl} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={styles.propertyData}>
              <h4>{orderData.propertyName}</h4>
              <h4>{displayStartDate} &mdash; {displayEndDate}</h4>
            </div>
            <div className={styles.propertySubData}>
              <p><span className={styles.bolder}>Payment Terms:</span> If your arrival date is more than 30 days from booking date, you need only pay a booking deposit of 30%, although you may pay in full if you prefer. Any balance payable is due 30 days prior to arrival.</p>
              <p><span className={styles.bolder}>Standard Cancellation Terms:</span> More than 30 days prior to arrival booking deposit is non-refundable. Within 30 days of arrival, no refund.</p>
            </div>
            <Row>
              <Col>
                <div className={styles.propertySubData}>
                  <h5>Total in Euro:</h5>
                  {depositPaymentAllowed && <h5>Deposit if due:</h5>}
                </div>
              </Col>
              <Col>
                <div className={styles.propertySubDataRight}>
                  <h5>&euro; {amountDue}</h5>
                  {depositPaymentAllowed && <h5>&euro; {depositAmount}</h5>}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

      {/* Left Column (Form) - Moves Below on Mobile */}
      <Col lg={6} md={12} className="order-md-2 order-lg-1">
        <Form method="post" onSubmit={handleSubmit(onSubmit)}>
          <Row className={styles.formRow}>
            <Col>
              <h3 className={styles.bookingHeader}>Your personal details</h3>
              <h6 className={styles.bookingSubHeader}>Booking Details</h6>
              <Row>
                <Col>
                  {errors.firstName && (<small className={styles.danger}>{errors.firstName.message}</small>)}
                  <Form.Control type="text" placeholder="First Name" {...register("firstName", { required: "* First name is required" })} />
                </Col>
                <Col>
                  {errors.surname && (<small className={styles.danger}>{errors.surname.message}</small>)}
                  <Form.Control type="text" placeholder="Last Name" {...register("surname", { required: "* Surname is required" })} />
                </Col>
              </Row>
              <Row>
                <Col>
                  {errors.email && (<small className={styles.danger}>{errors.email.message}</small>)}
                  <Form.Control type="email" placeholder="Your email address" {...register("email", { required: "* Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "* Invalid email address" } })} />
                </Col>
              </Row>
              <Row>
                <Col>
                  {errors.address && (<small className={styles.danger}>{errors.address.message}</small>)}
                  <Form.Control as="textarea" rows={5} placeholder="Postal address" {...register("address", { required: "* Your address is required" })} />
                </Col>
              </Row>
              <Row>
                <Col>
                  {errors.phone && (<small className={styles.danger}>{errors.phone.message}</small>)}
                  <Form.Control type="text" placeholder="Phone (Full international dialling code) e.g. +353 1 12345678" {...register("phone", { required: "* Phone number is required" })} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control type="text" {...register("company")} placeholder="Company name (if applicable)" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control as="select" {...register("guests")}>
                    <option value="" disabled hidden selected>Number of Guests</option>
                    <option>One</option>
                    <option>Two</option>
                    <option>Three</option>
                    <option>Four</option>
                    <option>Five</option>
                    <option>Six</option>
                    <option>Seven</option>
                    <option>Eight</option>
                    <option>More than 8</option>
                  </Form.Control>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control type="text" placeholder="Special Requirements e.g. Airport collection etc." {...register("requirements")} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className={styles.checkboxContainer}>
                    <Form.Check className={styles.spacey} {...register("termsread", { required: "* You must accept our terms and conditions to proceed" })} />
                    I have read, and agree to the <a href="#" onClick={toggleTerms}>Dublin At Home Terms & Conditions of sale</a>.<br />
                    {errors.termsread && (<small className={styles.danger}>{errors.termsread.message}</small>)}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  {renderPaymentButtons()}
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  </Container>
</div>
    )
}

export default BKPrePayment