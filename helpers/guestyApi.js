import axios from 'axios'
import datetime from 'date-and-time'
import { decode as base64_decode, encode as base64_encode } from 'base-64'


export const getMonthCalendarForProperty = () => {
    fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain'
        }
    })
    .then((response) => {
        return response.json()
    })
    .then(user => {
        return user
    })
}

export const getMonthCalendarForPropertyA = async () => {
    const credentialString = base64_encode(process.env.GUESTY_CREDENTIAL)
    const authorizationString = 'Basic ' + credentialString
    const activeStartDate = new Date()
    const firstDayDate = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth(), 1)
    const lastDayDate = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 0)
    const startDate = datetime.format(firstDayDate, 'YYYY-MM-DD')
    const endDate = datetime.format(lastDayDate, 'YYYY-MM-DD')
    const listingId = '606ef57114d399002e77e4be'

    // console.log(`https://api.guesty.com/api/v2/availability-pricing/api/calendar/listings/${listingId}?startDate=${startDate}&endDate=${endDate}`)
    // let headers = new Headers({
    //     "Accept"       : "application/json",
    //     "Content-Type" : "application/json",
    //     'Authorization': authorizationString,
    //     "User-Agent"   : "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"
    // });
    // const result = await fetch(`https://api.guesty.com/api/v2/availability-pricing/api/calendar/listings/${listingId}?startDate=${startDate}&endDate=${endDate}`, {
    //     method: 'GET',
    //     headers: headers
    // }).then(response => {
    //     console.log(response.text)
    // })
    // return 'ok'
}