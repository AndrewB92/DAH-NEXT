import Link from 'next/link'
import styles from '../styles/PropertyCard.module.css'
// import Image from 'react-bootstrap/Image'
import Image from 'next/image'

function PropertyCard({property, listType, query}) {

    // let propertyDescription = 'A Dublin at Home Property'
    // if(property.publicDescription) {
    //     propertyDescription = property.publicDescription.summary.split(' ').slice(0, 30).join(' ')
    // }

    let propertyDescription = property.publicDescription?.summary?.trim()
    ? property.publicDescription.summary.split(' ').slice(0, 30).join(' ')
    : 'A Dublin at Home Property';
    const propertyBeds = property.bedrooms
    const propertyBaths = property.bathrooms
    const propertyType = property.type
    const propertyWeight = property.sortField
    // let customFields = ''
    let propertyStars = 5
    let stars = []
    let propertyName = property.title

    // This is where we get custom fields like stars/property web name etc.
    if(property.customFields) {
        property.customFields.forEach(field => {
            if(field.fieldId === "62865b7c8b924100391ae1fc") {
                propertyName = field.value
            }
            if(field.fieldId === "627beb0ae6d957003690d672") {
                propertyStars = field.value 
            }
        });
    }

    for(let co=0; co<propertyStars; co++) {
        stars.push("/img/star.png")
    }

    const propertyImageTag = propertyName + ' main image'

    const querystring = query || ''

    let cardImage

    cardImage = property.picture.thumbnail || 'img/no_image.png'
    cardImage = cardImage.replace("/upload/", "/upload/c_fill,g_auto,w_400,h_200/");

    const renderPhotoLink = () => {
        if(listType === 'browse') {
            return (
                <>
                <Link href={`/property/${property._id}`} passHref>
                    <a>
                    <Image
                        className={styles.listingPhoto}
                        alt={propertyImageTag}
                        src={cardImage}
                        width={400}
                        height={200}
                        quality={10}
                        loading="lazy"
                    />
                    </a>
                </Link>
                </>
            )
        }else{
            return (
                <>
                    <Link href={`/property/${property._id}/${query.dateFrom}/${query.dateTo}/${query.rooms}/${query.area}`} passHref>
                        <a>
                        <Image
                            className={styles.listingPhoto}
                            alt={propertyImageTag}
                            src={cardImage}
                            width={400}
                            height={200}
                            quality={50}
                            loading="lazy"
                        />
                        </a>
                    </Link>
                </>
            )
        }
    }

    const renderLink = () => {
        if(listType === 'browse') {
            return (
                    <Link href={`/property/${property._id}`} passHref>
                        <button variant="secondary" className={styles.listingPageBookButton}>More...</button>
                    </Link>
            )
        }else{
            return (
                    <Link href={`/property/${property._id}/${query.dateFrom}/${query.dateTo}/${query.rooms}/${query.area}`} passHref>
                        <button variant="secondary" className={styles.listingPageBookButton}>More...</button>
                    </Link>
            )
        }
    }
    
    return (
        <div className={styles.propertyCard}>
            <Link href="https://www.google.com" passHref>
                {renderPhotoLink()}
            </Link>

            <div>
                <p>{propertyName}</p>
                <p></p>

            </div>
            <div>
                <div className={styles.cardTitle}>{propertyName}</div>
                <span className={styles.smallLabel}>Bedrooms: {propertyBeds} | Bathrooms: {propertyBaths}</span><div className={styles.starstrip}>
                            {stars.map((star, index) => (
                                <img key={index} src="/img/star.png" alt={`${stars.length} star rating star image`} width="20" height="20" />
                            ))}
                        </div>
                    <p>{propertyDescription} &#8230;</p>
            </div>
            <div className={styles.alignTextBottom}>
                <p className={styles.cardText}>
                    <span className={styles.priceLabel}><strong>&euro;{property.prices.basePrice}</strong><span className={styles.priceLabelSmall}> per night</span>
                    {renderLink()}
                    </span>
                </p>
            </div>
        </div>
)
}

export default PropertyCard
