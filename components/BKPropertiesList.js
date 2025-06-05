import dynamic from 'next/dynamic'
import styles from '../styles/Properties.module.css'
const BKPropertyCard = dynamic(() => import('./BKPropertyCard'))

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
        <div className="portfolio-grid max-1380">
                    {properties.map((property) => (
                        <BKPropertyCard property={property} listType={listType} query={query} key={property._id} />
                    ))}
        </div>
    )
}

export default Browse
