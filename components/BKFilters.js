import { useState, useEffect} from 'react'
import Router from 'next/router'
import DatePicker from 'react-datepicker'
import datetime from 'date-and-time'
import Cookies from 'js-cookie'
import 'react-datepicker/dist/react-datepicker.css'
import styles from '@styles/Selector.module.css'

const BKFilters = ( {properties} ) => {

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [rooms, setRooms] = useState(1)

    useEffect(() => {
        setStartDate( new Date(Cookies.get('fromDate') || new Date()))
        setEndDate(new Date(Cookies.get('toDate') || new Date()))
        setRooms(Cookies.get('rooms') || '1')
    }, [])

    const roomDropDown = 'rooms';

    const onStartChange = (date) => {
        setStartDate(date);
        setEndDate(date)
    }

    const onEndChange = (date) => {
        setEndDate(date);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const fromDate = datetime.format(startDate, 'YYYY-MM-DD')
        const toDate = datetime.format(endDate, 'YYYY-MM-DD')
        const searchUrl = `/availability/${fromDate}/${toDate}/${rooms}/Dublin`
        // Check for someone putting in same dates and if so, point them to the browse page
        if(fromDate == toDate) {
            Router.push({
                pathname: '/properties'
            })
        }else{
            Cookies.set('fromDate', fromDate, {expires: 7})
            Cookies.set('toDate', toDate, {expires: 7})
            Cookies.set('rooms', rooms, {expires: 7})
            Cookies.set('area', 'Dublin')
            const searchUrl = `/availability/${fromDate}/${toDate}/${rooms}/Dublin`
            Router.push({
                pathname: searchUrl
            })

        }
    }


    return (
        <>
            <div className="cont cont-col gap-24 max-1380 filter-section">

                <form className="cont cont-row gap-24" onSubmit={handleSubmit}>

                    <div className="filter-option">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => onStartChange(date)}
                            dateFormat="MMMM d, yyyy"
                            className={styles.datePickerInput}
                            minDate={new Date()}
                            placeholderText="Arriving..."
                        />
                    </div>

                    <div className="filter-option">
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => onEndChange(date)}
                            dateFormat="MMMM d, yyyy"
                            className={styles.datePickerInput}
                            minDate={startDate}
                            placeholderText="Departing..."
                        />
                    </div>

                    <div className="filter-option">
                        <select
                            name="first"
                            value={rooms}
                            onChange={(e) => {
                                setRooms(e.target.value)
                            }}
                        >
                            <option value="1">1 Bed or more</option>
                            <option value="2">2 Beds or more</option>
                            <option value="3">3 Beds or more</option>
                            <option value="4">Any Beds</option>
                        </select>
                    </div>

                    <div>
                        <button type="submit" className="cta-main green">
                            <span className="button-text">Find Property</span><svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.6383 21.5096L10.9901 20.8614C10.8111 20.6824 10.8111 20.3922 10.9901 20.2132L18.8785 12.3249L13.1162 12.3314C12.994 12.3319 12.8766 12.2835 12.7902 12.1971C12.7038 12.1107 12.6555 11.9934 12.656 11.8711L12.6624 10.9572C12.6619 10.835 12.7103 10.7177 12.7967 10.6312C12.8831 10.5448 13.0004 10.4965 13.1227 10.497L21.0758 10.4905C21.2581 10.4904 21.433 10.5627 21.562 10.6915L21.8083 10.9378C21.9354 11.0679 22.0074 11.242 22.0092 11.4239L22.0027 19.3771C22.0032 19.4993 21.9549 19.6166 21.8685 19.7031C21.7821 19.7895 21.6647 19.8378 21.5425 19.8373L20.6221 19.8373C20.5014 19.8385 20.3853 19.7911 20.2999 19.7058C20.2146 19.6204 20.1672 19.5043 20.1684 19.3836L20.1749 13.6212L12.2865 21.5096C12.1075 21.6886 11.8173 21.6886 11.6383 21.5096Z" fill="white"></path></svg>
                        </button>
                    </div>
                </form>
            </div>
            <hr className="divider" />
            </>
    )

}

export default BKFilters

/*

            <div className="cont cont-col gap-24 section-title max-1680">
                <div className="wrapper cont cont-row gap-24">
                    <div className="cont cont-col gap-24">
                        <h2 className="main-heading">All Properties</h2>
                        <p className="description">Search for properties by date or type of property</p>
                    </div>
                    <a href="#" className="cta-main view-all-btn">View all</a>
                </div>
            </div>
*/