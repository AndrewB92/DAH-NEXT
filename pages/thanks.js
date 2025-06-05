import React from 'react'
import { useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useRouter } from 'next/router'
import styles from '../styles/Payment.module.css'

function thanks() {
    
    const router = useRouter()
    const [receiptData, setReceiptData] = useState(null)

    useEffect(() => {
        if (router.isReady) {
            const receiptData = router.query.receiptData ? JSON.parse(router.query.receiptData) : null
            setReceiptData(receiptData)
        }
    }, [router.isReady, router.query.receiptData])

    if (!receiptData) return <p>Loading...</p>

    const customerFirstName = receiptData.customerFirstName || 'No data!'
    const propertyName = receiptData.propertyName || 'No data!'

    const amountDue = parseFloat(receiptData.amountDue.replace(/,/g, '')) || 0;
    const fullPrice = parseFloat(receiptData.fullPrice.toString().replace(/,/g, '')) || 0;
    const balanceDue = fullPrice - amountDue;

    const formattedFullPrice = fullPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedAmountDue = amountDue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedBalanceDue = balanceDue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const paymentType = receiptData.paymentType || 'No data!'
    const displayStartDate = receiptData.displayStartDate || 'No data!'
    const displayEndDate = receiptData.displayEndDate || 'No data!'
    const propertyImageUrl = receiptData.propertyImageUrl || 'No data!'
    const reservation = receiptData.reservation || 'No data!'

    return (
        <div className="cont cont-col gap-24 max-full color-blue">
        <Container className={styles.bookingContainer}>
        <Row>
            <Col>
                <Row className={styles.formRow}>

                    {/* Left column */}
                    <Col className={styles.leftHandBookingCol}>
                        <img src="/img/check_mark.png" />
                        <h3 className={styles.bookingHeading}>Booking Confirmation</h3>
                        <h4 className={styles.bookingSubHeading}>Your booking number <span className={styles.bolder}>{reservation}</span></h4>

                        <p className={styles.thanksMessage}>Thank you so much {customerFirstName} for booking with us. We look forward to having you stay with us at {propertyName}.</p>
                        <p className={styles.thanksMessage}>In the meantime, if you need anything at all, please reach out to us and quote your booking number.</p>

                        <hr width="100%" />
                        <Row className={styles.iconRow}>
                            <Col xs={1}>
                                <img src="/img/icon_email.png" />
                            </Col>
                            <Col xs={11}>
                                <p className={styles.midMessage}>
                                    Email<br />
                                    <a href="mailto:hello@dublinathome.com?subject=Hello%20there&body=I%20would%20like%20to%20contact%20you.">hello&#64;dublinathome.com</a>
                                </p>
                            </Col>
                        </Row>
                        <Row className={styles.iconRow}>
                            <Col xs={1}>
                                <img src="/img/icon_phone.png" />
                            </Col>
                            <Col xs={11}>
                                <p className={styles.midMessage}>
                                    Phone<br />
                                    <a href="tel:+35340464608">+353 404 64608</a>
                                </p>
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
                                    <h4>{propertyName}</h4>
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
                                    <h5>Total in Euro (&euro;)</h5>
                                    {paymentType === 'Deposit' && <h5>Deposit Paid</h5>}
                                    <h5>Remaining Balance</h5>
                                </div>
                            </Col>
                            <Col>
                                <div className={styles.propertySubDataRight}>
                                    <h5>&euro;{formattedFullPrice}</h5>
                                    {paymentType === 'Deposit' && (
                                        <h5>&euro;{formattedAmountDue}</h5>
                                    )}
                                    <h5>&euro;{formattedBalanceDue}</h5>
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

export default thanks


/*

http://localhost:3000/thanks?receiptData={%22customerFirstName%22%3A%22Mike%22%2C%22propertyName%22%3A%22Fernbank+One%22%2C%22fullPrice%22%3A3745.5%2C%22amountDue%22%3A%221%2C124.00%22%2C%22paymentType%22%3A%22Deposit%22%2C%22displayStartDate%22%3A%22Sun%2C+Mar+02+2025%22%2C%22displayEndDate%22%3A%22Sun%2C+Mar+30+2025%22%2C%22propertyImageUrl%22%3A%22https%3A%2F%2Fassets.guesty.com%2Fimage%2Fupload%2Fv1673272999%2Fproduction%2F6051f000c60c59002ca9341d%2Fiotkeb7fzoiyudsbwt5g.jpg%22%2C%22reservation%22%3A%22GY-HD4Negnr%22}
*/