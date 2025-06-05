import Head from 'next/head'
// import Header from '../components/Header'
// import PrePayment from '../components/PrePayment'
import BKBanner from '@components/BKBanner'
import BKPrePayment from '@components/BKPrePayment'

const bannerTopHeading='Dublin At Home Payment'
const bannerMainHeading='Dublin At Home Booking Engine'
const bannerBottomHeading='Make a secure payment to Dublin At Home'
const bannerImage='/img/Page_title-BG.png'

const prepayment = ({ order }) => {
    const pageTitle = 'Make a booking'
    const orderData = JSON.parse(decodeURIComponent(order))
    
    return (
        <div>
            <BKPrePayment orderData={orderData} />
        </div> 
    )
}

export const getServerSideProps = ({ req, res }) => {
    return {
        props: {
            order: req.cookies.order || ""
        }
    }
}

export default prepayment