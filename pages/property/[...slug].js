import { useState, useEffect } from 'react'
import Head from 'next/head'
import {decode as base64_decode, encode as base64_encode} from 'base-64'
import { fetchBookingToken } from '@utils/tokenManager'
import BKBanner from '@components/BKBanner'
import BKPropertyDetail from '@components/BKPropertyDetail'
import BKBreadcrumbs from '@components/BKBreadcrumbs'
import BKGallery from '@components/BKGallery'
import BKPropertyInfo from '@components/BKPropertyInfo'
import DAHCalendar from '@components/DAHCalendar'
import BKEnquiryCard from '@components/BKEnquiryCard'
import BKTestimonialHeading from '@components/BKTestimonialHeading'
import BKTestimonialList from '@components/BKTestimonialList'
import BKTestimonialRender from '@components/BKTestimonialRender'
import BKTestimonialSlider from '@components/BKTestimonialSlider'
import BKMapSingle from '@components/BKMapSingle'

const view = ({property, guestyCalendarArray, pricing}) => {
    /* GMap details */
    const lat = property.address.lat || '53.3498'
    const lng = property.address.lng || '-6.2603'
    const zoom = 17
    const calendarArray = guestyCalendarArray
    const propertyBeds = property.bedrooms
    const propertyBaths = property.bathrooms
    const amenities = property.amenities
    const propertyId = property._id
    const basePrice = property.prices.basePrice
    let propertyName = property.title.includes(' by Dublin At Home') ? property.title.replace(/ by Dublin At Home$/, '') : property.title;
    let propertyDescription = 'A Dublin at Home Property'
    let propertyNeighborhood = 'Neighbourhood information to come.'
    let propertyTransit = 'Transit information to come.'
    let propertySpace = 'More information to come about surrounding space.'
    if(property.publicDescription) {
        propertyDescription = property.publicDescription.summary.replace(new RegExp('\r?\n','g'), '<br />') || 'No description yet'
        propertyNeighborhood = 
            property.publicDescription.hasOwnProperty('neighborhood') && property.publicDescription['neighborhood']
             ? property.publicDescription.neighborhood.replace(new RegExp('\r?\n','g'), '<br />')
             : 'No description yet'
        propertyTransit =
            property.publicDescription.hasOwnProperty('transit') && property.publicDescription['transit']
            ? property.publicDescription.transit.replace(new RegExp('\r?\n','g'), '<br />')
            : 'No description yet'
        propertySpace =
            property.publicDescription.hasOwnProperty('space') && property.publicDescription['space']
            ? property.publicDescription.space.replace(new RegExp('\r?\n','g'), '<br />')
            : 'No description yet'
    }
    let customFields = ''

    if(property.customFields) {
        if(property.customFields) {
            property.customFields.forEach(field => {
                if(field.fieldId === "62865b7c8b924100391ae1fc") {
                    let propertyName = field.value.replace(/ by Dublin At Home$/, '');
                }
                if(field.fieldId === "627beb0ae6d957003690d672") {
                    propertyStars = field.value 
                }
            });
        }
    }

    const bannerTopHeading = "Dublin At Home"
    const bannerMainHeading = propertyName
    const bannerBottomHeading = "Full details for your property"
    const bannerImage = property.pictures[0].original || "/img/Page_title-BG.png"

    // Tab code //
    // This state will manage the currently active tab
    const [activeTab, setActiveTab] = useState('description');
    const [isMobile, setIsMobile] = useState(false);

    // Tab identifiers, keeping them based on your HTML structure
    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'nearby-attractions', label: 'Nearby Attractions' },
        { id: 'facilities', label: 'Facilities' }
    ];

    const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    };

    const handleMobileSelect = (e) => {
    setActiveTab(e.target.value);
    };

    const checkScreenWidth = () => {
    if (window.innerWidth <= 1024) {
        setIsMobile(true);
    } else {
        setIsMobile(false);
    }
    };

    // Add a listener for window resizing to check if the screen is mobile
    useEffect(() => {
        checkScreenWidth();
        window.addEventListener('resize', checkScreenWidth);
        return () => window.removeEventListener('resize', checkScreenWidth);
    }, []);

    return (
        <section className="page-content color-blue">
            {/* <!-- Page header/banner --> */}
            <BKBanner bannerTopHeading={bannerTopHeading} bannerMainHeading={bannerMainHeading} bannerBottomHeading={bannerBottomHeading} bannerImage={bannerImage} />
            {/* <!-- /Page banner--> */}

            {/* <!-- Breadcrumbs, gallery--> */}
                <section className="cont cont-col gap-24 max-1160 apartment-section content-delivery">

                    {/* <!-- Breadcrumbs --> */}
                    <BKBreadcrumbs propertyId={propertyId} propertyTitle={propertyName} />
                    
                    {/* <!-- Gallery --> */}
                    <BKGallery imagesArray={property.pictures} />

                    {/* <!-- Property details and calendar --> */}
                    <div className="cont cont-col max-1380 content-container">
                        <div className="cont cont-row two-column-layout">

                            {/* Left Column */}
                            <div className="cont cont-col left-column">
                                <div className="cont cont-col gap-30 apartment-details">
                                    <BKPropertyInfo property={property} />
                                </div>
                            </div>
                            {/* End Left Column */}
    

                            {/* Right Column */}
                            {/* Calendar */}
                            <div className="cont cont-col right-column">
                                <div className="cont cont-col gap-30 booking-container">
                                    <div className="cont cont-col booking-card">
                                        <div className="cont cont-col booking-details">
                                            <p className="booking-price">&euro;{basePrice} per night</p>
                                            <p className="booking-description">Book {propertyName}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="cont cont-col calendar-container">
                                        <DAHCalendar property={property} pricing={pricing} calendarArray={calendarArray} />
                                </div> {/* calendar-container end */}
                            <BKEnquiryCard />
                            </div> {/* right-column end */}
                        </div> {/* two-column-layout end */}
                    </div> {/* content-container end */}
                </section>
                {/* Section end */}

                {/* Some sort of more info section */}
                <section className="cont cont-col gap-24 max-full color-blue property-map-section">

                    {/* beginning of second div in more info section */}
                    <div className="cont cont-col gap-24 max-1680 wrapper centered">
                    <div className="single-map-container">
                        <BKMapSingle lat={lat} lng={lng} zoom={zoom} />
                    </div>
                        <BKTestimonialHeading />
                        <BKTestimonialList />
                    </div>
                    {/* end of second div in more info section */}

                </section>
        </section>
    )

}

export const getServerSideProps = async (context) => {

    async function getTokenWithRetry(retries = 3) {
        let token;
        for (let i = 0; i < retries; i++) {
            token = await fetchBookingToken();  // Your function to get the token
            if (token) return token;
            console.warn(`Token attempt ${i + 1} failed. Retrying in 500ms...`);
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait before retrying
        }
        throw new Error("Failed to retrieve token after retries.");
    }

    const { slug } = context.params;
    const id = slug[0];
    const searchDateBegin = slug[1] || '';
    const searchDateEnd = slug[2] || '';
    const searchArea = slug[3] || '';
    const priceView = Boolean(slug[1]);

    const now = new Date();
    const firstDayDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayDate = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    const startDate = firstDayDate.toISOString().split('T')[0];
    const endDate = lastDayDate.toISOString().split('T')[0];

    const handleApiResponse = async (response) => {
        const contentType = response.headers.get('content-type');
        const responseText = await response.text();

        if (!response.ok) {
            console.error('API response error:', response.status, response.statusText, responseText);
            throw new Error(`Failed to fetch API: ${response.status} ${response.statusText}`);
        }
        if (contentType && contentType.includes('application/json')) {
            return JSON.parse(responseText);
        } else {
            console.error('Unexpected response content-type:', contentType, responseText);
            throw new Error('Unexpected response content-type');
        }
    };

    try {
        const token = await getTokenWithRetry();

        const res = await fetch(`https://booking.guesty.com/api/listings/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const property = await handleApiResponse(res);

        let pricing = {};
        if (priceView) {
            const url = `https://booking.guesty.com/api/reservations/money?listingId=${id}&guestsCount=1&checkIn=${startDate}&checkOut=${endDate}`;
            const priceResult = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            pricing = await handleApiResponse(priceResult);
            pricing.fromDate = searchDateBegin;
            pricing.toDate = searchDateEnd;
            pricing.searchArea = searchArea;
            pricing.priceView = priceView;
        }

        const calendarResult = await fetch(`https://booking.guesty.com/api/listings/${id}/calendar?from=${startDate}&to=${endDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const guestyCalendarArray = await handleApiResponse(calendarResult);

        return {
            props: {
                property,
                guestyCalendarArray,
                pricing,
            },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            props: {
                error: 'Failed to load property data',
            },
        };
    }
};


export default view