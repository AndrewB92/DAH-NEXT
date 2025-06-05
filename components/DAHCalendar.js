import { useState, useEffect } from 'react'
import CalendarBox from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
// import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import BKPriceDisplay from './BKPriceDisplay'
import styles from '../styles/Calendar.module.css'
import datetime from 'date-and-time'
import { encode as base64_encode } from 'base-64'
import { set } from 'js-cookie'
import { server } from '../config'

function DAHCalendar({ property, calendarArray, pricing }) {
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const propertyImageUrl = property.pictures[0].original || "nothing"
    const propertyThumbnail = 
        property.picture.hasOwnProperty('thumbnail') && property.picture['thumbnail']
        ? property.picture.thumbnail
        : 'https://dublinathome.com/img/no_image.png'
    /* Get latest token */
    async function getToken() {
        let token
        let formBody = []
        const data = {
            authdata: process.env.GUESTY_AUTH
        }
        for(let item in data) {
            const encodedKey = encodeURIComponent(item)
            const encodedValue = encodeURIComponent(data[item])
            formBody.push(encodedKey + "=" + encodedValue)
        }
        await fetch('https://ckghosting.com/guesty/booking_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
        .then(response => response.json())
        .then((tokenArray) => {
            token = tokenArray.token.data[0].booking_token
        })

        return token
    }

    /* Calendar event functions */

    const tileDisabled = ({ date }) => {
        return disabledArray.find(dDate => datetime.isSameDay(dDate, date));
    }

    const getPrice = async (data) => {
        let calendarArray
        const startDate = datetime.format(data[0], 'YYYY-MM-DD')
        const endDate = datetime.format(data[1], 'YYYY-MM-DD')
        if (startDate === endDate) {
            return
        }
    
        const result = await fetch(`${apiUrl}/api/guesty/calendar?listingId=${property._id}&from=${startDate}&to=${endDate}`, { method: 'GET' })
            .then((response) => {
                return response.json().then(json => {
                    return { ok: response.ok, json }
                }).catch(err => {
                    throw err
                })
            })
            .then(({ ok, json }) => {
                if (ok) {
                    calendarArray = json
                    setBookingCalendar(calendarArray)
                    getQuote(property._id, startDate, endDate, calendarArray)
                } else {
                    throw new Error('API response not OK')
                }
            })
            .catch(error => {
                console.error('There was an error with getting the price:', error)
            })
    }

    const onMonthChange = async (data) => {
        const activeStartDate = data.activeStartDate
        const firstDayDate = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth(), 1)
        const lastDayDate = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 2, 0)
        const startDate = datetime.format(firstDayDate, 'YYYY-MM-DD')
        const endDate = datetime.format(lastDayDate, 'YYYY-MM-DD')
        const listingId = property._id

        const result = await fetch(`${apiUrl}/api/guesty/calendar?listingId=${listingId}&from=${startDate}&to=${endDate}`, { method: 'GET' })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(response => {
                calendarArray = response
                setCurrentCalendar(calendarArray)
                const returnArray = []
                calendarArray.map(function (val, i) {
                    if (calendarArray[i].status !== "available") {
                        returnArray.push(new Date(calendarArray[i].date))
                    }
                })
                setDisabledArray(returnArray)
            })
            .catch(error => {
                console.log('There was an error')
            })
        return
    }

    /* Get a quote */
    const getQuote = async (listingId, checkIn, checkOut, bookingArray) => {
        let bookable = true;
        // setPriceActive('Getting price...')
        const checkInStart = new Date(checkIn)
        const checkInEnd = new Date(checkOut)
        const nightCount = daysDiff(checkIn, checkOut) -1

        // Check validity of booking period dates (min stay and already booked dates)
        bookingArray.forEach(
            (calendarItem, i) => {
                const minNights = calendarItem.minNights
                const checkDate = new Date(calendarItem.date)
                let startMarkedDate

                if (checkDate.getTime() >= checkInStart.getTime() && checkDate.getTime() < checkInEnd.getTime()) {

                    // Just check minNights for first day of stay
                    if (checkDate.getTime() == checkInStart.getTime()) {
                        if (minNights >= nightCount + 1) {/* <<<<---- +1 Here */
                            setDateErrorMessage(`You have chosen a ${nightCount} night stay. Minimum stay is 14 nights. Try again! `)
                            setShowDateError(true)
                            bookable = false
                        }
                    }

                    if (calendarItem.status !== 'available') {
                        startMarkedDate = new Date(calendarItem.blockRefs[0].startDate)
                        if (checkDate !== calendarItem.blockRefs[0].startDate) {
                            if (startMarkedDate.toString() != checkDate.toString()) {
                                setDateErrorMessage('Some of those dates are not available')
                                setShowDateError(true)
                                bookable = false
                            }
                        }
                    }
                }
            }
        )

        if (bookable === true) {
            // It's ok to book, let's go
            // setPriceActive('not active')
            setArrivalDate(datetime.format(checkInStart, 'MMM, D, YYYY'))
            setDepartureDate(datetime.format(checkInEnd, 'MMM, D, YYYY'))
            setFormArrivalDate(datetime.format(checkInStart, 'YYYY-MM-DD'))
            setFormDepartureDate(datetime.format(checkInEnd, 'YYYY-MM-DD'))

            const searchParams = {
                'listingId': listingId,
                'checkIn': checkIn,
                'checkOut': checkOut
            }

            // Get quote
            const quote = await fetch(`${apiUrl}/api/guesty/quote?listingId=${searchParams.listingId}&checkIn=${searchParams.checkIn}&checkOut=${searchParams.checkOut}&guestsCount=1`)
            const data = await quote.json()
            const quoteId = data._id
            const ratePlan = data.rates.ratePlans[0].ratePlan
            const ratePlanId = ratePlan._id
            const accommodationPrice = ratePlan.money.fareAccommodation
            const accommodationCleaning = ratePlan.money.fareCleaning || 0
            const accommodationTotal = accommodationPrice + accommodationCleaning
            
            // Get payment policy
            const paymentPolicy = await fetch(`${apiUrl}/api/guesty/paymentpolicy?listingId=${searchParams.listingId}`)
            const policyObject = await paymentPolicy.json()
            const depositPercent = policyObject.autoPayments.policy[0].amount
            const depositDays = policyObject.autoPayments.policy[1].scheduleTo.timeRelation.amount

            setPrice(accommodationTotal)
            setDepositPercent(depositPercent)
            setDepositDays(depositDays)
            setPriceMessage('Price includes utilities')
            // setPriceActive('Searching...')

            // Set cookie for order
            const order = {
                propertyId: listingId,
                propertyName: propertyName,
                price: accommodationTotal,
                depositPercent: depositPercent,
                depositDays: depositDays,
                arrivalDate: checkIn,
                departureDate: checkOut,
                quoteId: quoteId,
                ratePlanId: ratePlanId,
                propertyImageUrl: propertyImageUrl,
            }

            fetch(`${apiUrl}/api/saveorder`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ order: JSON.stringify(order) })
            })
        } else {
            console.log('not bookable')
            return
        }
    }

    const onPriceView = (data) => {
        const date1 = new Date(data[1])
        const date2 = new Date(data[2])
        const searchData = [date1, date2]
        getPrice(searchData)
    }

    /*** 
     Field declarations
    */
    let propertyName = property.title.includes(' by Dublin At Home') ? property.title.replace(/ by Dublin At Home$/, '') : property.title;
    
    if (property.customFields) {
        if (property.customFields) {

            property.customFields.forEach(field => {
                if (field.fieldId === "62865b7c8b924100391ae1fc") {
                    propertyName = field.value
                }
            });

        }
    }
    const proxy = process.env.PROXY
    const [currentCalendar, setCurrentCalendar] = useState(calendarArray)
    const arrival = pricing.fromDate || 'Arrival'
    const departure = pricing.toDate || 'Departure'
    // priceView is a binary to tell if we are searching for price or not
    // temp hidden for testin, or permanently if state workd let priceView = pricing.priceView
    const [priceView, setPriceView] = useState(pricing.priceView || false)
    const [arrivalDate, setArrivalDate] = useState(arrival)
    const [departureDate, setDepartureDate] = useState(departure)
    const [priceMessage, setPriceMessage] = useState('Per night. Pick dates for exact price')
    const [priceActive, setPriceActive] = useState('not active')
    const [price, setPrice] = useState(property.prices.basePrice)

    useEffect(() => {
        if (priceView) {
            const incomingDateArray = [property._id, arrival, departure];
            onPriceView(incomingDateArray);
            setPriceView(false); // Prevent repeated calls
        }
    }, [priceView]);

    const [formArrivalDate, setFormArrivalDate] = useState('')
    const [formDepartureDate, setFormDepartureDate] = useState('')
    const [depositPercent, setDepositPercent] = useState(15)
    const [depositDays, setDepositDays] = useState(0)

    const [bookingCalendar, setBookingCalendar] = useState('')

    // Modal error handler
    const [dateErrorMessage, setDateErrorMessage] = useState(null)
    const [showDateError, setShowDateError] = useState(false)
    const dateErrorClose = () => setShowDateError(false)

    const daysDiff = (startDate, endDate) => {
        const date1 = new Date(startDate)
        const date2 = new Date(endDate)
        const diffInDays = datetime.subtract(date2, date1).toDays() + 1 // +1 converts amount of days to amount of nights!
        return diffInDays
    }

    const nonAvailableCalendar = []
    calendarArray.map(function (val, i) {
        if (calendarArray[i].status !== "available") {
            nonAvailableCalendar.push(new Date(calendarArray[i].date))
        }
    });

    /*
    if (priceView) {
        // pricing.priceView = false
        setPriceView[false]
        const incomingDateArray = [property._id, arrival, departure]
        onPriceView(incomingDateArray)
    }
    */

    const [disabledArray, setDisabledArray] = useState(nonAvailableCalendar)

    return (
        <>
            <div className={styles.reactCalendar}>
                <CalendarBox
                    id="dah"
                    className={styles.reactCalendarBox}
                    onChange={getPrice}
                    selectRange={true}
                    returnValue="range"
                    minDate={new Date()}
                    tileDisabled={tileDisabled}
                    onActiveStartDateChange={onMonthChange}
                />
                <div className={styles.ticket}>
                    <div>
                        <div className={styles.bookMessage}>Book {propertyName}</div>
                        <div className={styles.cardText}>
                            <div className={styles.dateLabel}>{arrivalDate} <img className={styles.arrow} src="/img/date_arrow.png" /> {departureDate}</div>
                            <BKPriceDisplay price={price} priceMessage={priceMessage} priceActive={priceActive} propertyThumbnail={propertyThumbnail} />
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showDateError} onHide={dateErrorClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Date Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{dateErrorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={dateErrorClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )



}

export default DAHCalendar