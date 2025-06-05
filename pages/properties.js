import Head from 'next/head'
import BKPropertiesList from '@components/BKPropertiesList'
import { useState } from 'react'
import { fetchOpenApiToken, fetchBookingToken} from '../utils/tokenManager'
import BKBanner from '@components/BKBanner'
import BKFilters from '@components/BKFilters'
import BKDatePicker from '@components/BKDatePicker'
import BKMapIntro from '@components/BKMapIntro'
import BKMap from '@components/BKMap'
import BKTestimonialHeading from '@components/BKTestimonialHeading'
import BKTestimonialList from '@components/BKTestimonialList'
import BKManagerInfo from '@components/BKManagerInfo'
import BKFaq from '@components/BKFaq'
import BKCallToAction from '@components/BKCallToAction'

function browse({ properties, query }) {

    const bannerTopHeading='Dublin At Home'
    const bannerMainHeading='Browse Properties'
    const bannerBottomHeading='Minimum stay 14 nights'
    const bannerImage='/img/new_header_image.jpg'

    const [loading, setLoading ] = useState(false)
    
    const pageTitle = 'Corporate rental properties available in Dublin.'

    const mapcoords = properties
    .filter(({ address }) => address && address.lat && address.lng)
    .map(({ address }) => ({
        lat: address.lat,
        lng: address.lng
    }));

    return (
        <>
            <Head>
                <title>Explore Our Dublin Serviced Apartments | Dublin At Home</title>
                <meta name="desription" content="Discover our range of premium serviced accomodation across Dublin,Ideal for a range of travel requirements, such as corporate, lesiure, film and tv crews, relocation, and travel management organisers. Browse detailed listings with photos, amenities. With live availability you can book today." />
            </Head>
            {/* <BKFeatures properties={properties} /> */}
            <BKBanner
                bannerTopHeading={bannerTopHeading}
                bannerMainHeading={bannerMainHeading}
                bannerBottomHeading={bannerBottomHeading}
                bannerImage={bannerImage}
            />
            
            <section className="cont color-blue cont-col max-1680 property-listings">
                {/* <BKFilters properties = {properties} /> */}
                <BKDatePicker />
            <div className="content-delivery">
                    <BKPropertiesList properties={properties} listType='browse' query={query} />
                    <section className="cont cont-col gap-24 max-full color-blue property-map-section">
                        <div className="cont cont-col gap-24 max-1680 wrapper centered">
                            <BKMap mapcoords = {mapcoords} defaultZoom = ' 12' />
                            <BKTestimonialHeading />
                            <BKTestimonialList />
                        </div>
                    </section>
                    </div>
            </section>
        </>
    )
}

export const getStaticProps = async (ctx) => {

    async function getTokenWithRetry(retries = 3) {
        let token;
        for (let i = 0; i < retries; i++) {
            token = await fetchOpenApiToken();  // Your function to get the token
            if (token) return token;
            console.warn(`Token attempt ${i + 1} failed. Retrying in 500ms...`);
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait before retrying
        }
        throw new Error("Failed to retrieve token after retries.");
    }

    const res = await fetch(`https://open-api.guesty.com/v1/listings?fields=title type pms bedrooms bathrooms customFields picture prices publicDescription address&limit=200`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await getTokenWithRetry()
            },
        }
    )

    const propertiesObject = await res.json()

    if(propertiesObject.error !== undefined) {
        const errorNotification = await fetch('https://maker.ifttt.com/trigger/dah_site_key_error/json/with/key/mtO0n0ZvUogiozMHzDE8mNfiv0MW4dT1VpYsSkyl1tA')
    }

    /* Filter properties for type and whether pms active */
    const properties = propertiesObject.results.filter(item => (item.type === "SINGLE" || item.type==="MTL") && item.pms && item.pms.active===true)
    
    /* Sort properties by customField */
    // Define the custom field ID we're interested in. This is the  'weighting' field '664b1b18959a150014de22c5'
    const targetCustomFieldId = "664365da27b69e0012d0ae5b"

    // Add a 'sortField' to each property
    properties.forEach(property => {
        const customField = property.customFields.find(cf => cf.fieldId === targetCustomFieldId)
        property.sortField = customField ? parseInt(customField.value, 10) : 999
    });

    // const properties = require('../propertyListing.json')

    // Sort the properties array based on the 'sortField'
    properties.sort((a, b) => a.sortField - b.sortField)

    return {
        props: {
            properties,
            revalidate: 86400
        }
    }
}

export default browse


