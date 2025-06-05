import Link from 'next/link'
// import Image from 'react-bootstrap/Image'
import Image from 'next/image'

function PropertyCard({property, listType, query}) {

    function truncateAtFullStop(description, maxLength) {
        if (description.length <= maxLength) return description
        let truncated = description.substring(0, maxLength)
        let lastFullStop = truncated.lastIndexOf('.')
        if (lastFullStop !== -1) {
            return description.substring(0, lastFullStop + 1); // Include full stop
        }
        let lastSpace = truncated.lastIndexOf(' ')
        if (lastSpace !== -1) {
            return description.substring(0, lastSpace) + "..."
        }
        return truncated + "..."
    }
    
    const maxDescripChars = 500

    let propertyDescription = 'A Dublin at Home Property'
    if(property.publicDescription.summary.length >= 1) {
        propertyDescription = property.publicDescription.summary
    }else{
        propertyDescription = 'A Dublin At Home quality property.'
    }
    const propertyBeds = property.bedrooms
    const propertyBaths = property.bathrooms
    const propertyType = property.type
    const propertyWeight = property.sortField
    // let customFields = ''
    let propertyStars = 5
    let stars = []
    let propertyName = property.title.includes(' by Dublin At Home') ? property.title.replace(/ by Dublin At Home$/, '') : property.title;

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

    const generateUrl = () => {
        if(listType === 'browse') {
            return (`/property/${property._id}`)
        }else{
            return (`/property/${property._id}/${query.dateFrom}/${query.dateTo}/${query.rooms}/${query.area}`)
        }
    }
    
    return (
        <article className="cont cont-col property-card">
            <a href={generateUrl()} className="proprty-link">
                <img loading="lazy" src={cardImage} className="property-image" alt="Property image" />
            </a>
            <div className="cont cont-col gap-30 property-content">
                <div className="cont cont-col gap-16 property-info">
                    <div className="cont cont-col gap-24 property-text">
                        <a href={generateUrl()} className="proprty-link">
                            <h3 className="property-title">{propertyName}</h3>
                            <div dangerouslySetInnerHTML={{ __html: `<!-- Sort field contains ${property.sortField} -->` }} />
                        </a>
                        <div className="property-specs">
                            <span className="bedroom">Bedrooms: {propertyBeds}</span> | <span className="bathroom">Bathrooms: {propertyBaths}</span>
                        </div>
                        <p className="propertyDescription">
                            {truncateAtFullStop(propertyDescription, maxDescripChars)}
                        </p>
                    </div>
                </div>
                <div className="cont cont-row gap-24 property-actions">
                    <p className="property-price"><span>From &euro;{property.prices.basePrice}</span> per night</p>
                    <a className="cta-main green circled" href={generateUrl()}>
                        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6383 21.5096L10.9901 20.8614C10.8111 20.6824 10.8111 20.3922 10.9901 20.2132L18.8785 12.3249L13.1162 12.3314C12.994 12.3319 12.8766 12.2835 12.7902 12.1971C12.7038 12.1107 12.6555 11.9934 12.656 11.8711L12.6624 10.9572C12.6619 10.835 12.7103 10.7177 12.7967 10.6312C12.8831 10.5448 13.0004 10.4965 13.1227 10.497L21.0758 10.4905C21.2581 10.4904 21.433 10.5627 21.562 10.6915L21.8083 10.9378C21.9354 11.0679 22.0074 11.242 22.0092 11.4239L22.0027 19.3771C22.0032 19.4993 21.9549 19.6166 21.8685 19.7031C21.7821 19.7895 21.6647 19.8378 21.5425 19.8373L20.6221 19.8373C20.5014 19.8385 20.3853 19.7911 20.2999 19.7058C20.2146 19.6204 20.1672 19.5043 20.1684 19.3836L20.1749 13.6212L12.2865 21.5096C12.1075 21.6886 11.8173 21.6886 11.6383 21.5096Z" fill="white"/>
                        </svg>                                    
                    </a>
                </div>
            </div>
        </article>
    )
}

export default PropertyCard
