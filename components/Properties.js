import dynamic from 'next/dynamic'
import styles from '../styles/Properties.module.css'
// import PropertyCard from './PropertyCard'
const PropertyCard = dynamic(() => import('./PropertyCard'))

function Browse({properties, listType, query}) {

    if(!properties) {
        return (
            <Row>
                <h4>There has been a temporary error. Please check our properties again later...</h4>
                {/* https://maker.ifttt.com/trigger/website_error/json/with/key/mtO0n0ZvUogiozMHzDE8mNfiv0MW4dT1VpYsSkyl1tA */}
            </Row>
        )
    }
    return (
        <>
                    {properties.map((property) => (
                        <div className={styles.cardCell} key={property._id}>
                            <PropertyCard property={property} listType={listType} query={query} />
                        </div>
                    ))}
        </>
    )
}

export default Browse
