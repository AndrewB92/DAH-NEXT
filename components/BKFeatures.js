import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/BKGlobal.module.css'

const BKFeatures = ( properties ) => {

    function truncateAtFullStop(description, maxLength) {
        if (description.length <= maxLength) return description
        let truncated = description.substring(0, maxLength)
        let lastFullStop = truncated.lastIndexOf('.')
        if (lastFullStop !== -1) {
          return description.substring(0, lastFullStop + 1)
        }
        let nextFullStop = description.indexOf('.', maxLength)
        if (nextFullStop !== -1) {
          return description.substring(0, nextFullStop + 1)
        }
        return truncated + "..."
      }
    
    const propertyArray = properties.properties

    return (
        <>
            {/* Featured properties header */}
            <section
                className="cont cont-col gap-24 page-title featured-properties max-1680"
                style={{ backgroundImage: 'url("/img/Page_title-BG.png")' }}
            >
                <div className="wrapper cont cont-col gap-24">
                    <h2>Portfolio</h2>
                    <h1 className="featured-properties--title">Featured Properties</h1>
                    <p className="featured-properties--description">Explore our diverse portfolio of properties.</p>
                </div>
            </section>

            {/* Featured properties 3 x listing */}
            <section className="cont cont-col gap-40 portfolio-list color-blue max-full">
                <div className="portfolio-grid max-1380">
                    {/* Property 1 */}
                    <article className="cont cont-col property-card">
                        <a href={`property/${propertyArray[0]._id}`} className="proprty-link">
                            <img loading="lazy" src={propertyArray[0].picture.thumbnail} className="property-image" alt="Property image" />
                        </a>
                        <div className="cont cont-col gap-30 property-content">
                            <div className="cont cont-col gap-16 property-info">
                                <div className="cont cont-col gap-24 property-text">
                                    <a href="#" className="proprty-link">
                                        <h3 className="property-title">{propertyArray[0].title}</h3>
                                    </a>
                                    <p className="property-description">
                                        {truncateAtFullStop(propertyArray[0].publicDescription.summary, 500)}
                                    </p>
                                </div>
                                <div className="cont cont-row gap-8 property-tags">
                                    <span className="property-tag">Luxury</span>
                                    <span className="property-tag">Modern</span>
                                    <span className="property-tag">Spacious</span>
                                    <span className="property-tag">Spacious</span>
                                </div>
                            </div>
                            <a className="cta-main green" href={`property/${propertyArray[0]._id}`}>
                                <span className="button-text">See Property</span>
                                <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.6383 21.5096L10.9901 20.8614C10.8111 20.6824 10.8111 20.3922 10.9901 20.2132L18.8785 12.3249L13.1162 12.3314C12.994 12.3319 12.8766 12.2835 12.7902 12.1971C12.7038 12.1107 12.6555 11.9934 12.656 11.8711L12.6624 10.9572C12.6619 10.835 12.7103 10.7177 12.7967 10.6312C12.8831 10.5448 13.0004 10.4965 13.1227 10.497L21.0758 10.4905C21.2581 10.4904 21.433 10.5627 21.562 10.6915L21.8083 10.9378C21.9354 11.0679 22.0074 11.242 22.0092 11.4239L22.0027 19.3771C22.0032 19.4993 21.9549 19.6166 21.8685 19.7031C21.7821 19.7895 21.6647 19.8378 21.5425 19.8373L20.6221 19.8373C20.5014 19.8385 20.3853 19.7911 20.2999 19.7058C20.2146 19.6204 20.1672 19.5043 20.1684 19.3836L20.1749 13.6212L12.2865 21.5096C12.1075 21.6886 11.8173 21.6886 11.6383 21.5096Z" fill="white"/>
                                </svg>                                
                            </a>
                        </div>
                    </article>
                    {/* Property 2 The Lookout */}
                    <article className="cont cont-col property-card">
                        <a href={`property/${propertyArray[3]._id}`} className="proprty-link">
                            <img loading="lazy" src={propertyArray[3].picture.thumbnail} className="property-image" alt="Property image" />
                        </a>
                        <div className="cont cont-col gap-30 property-content">
                            <div className="cont cont-col gap-16 property-info">
                                <div className="cont cont-col gap-24 property-text">
                                    <a href="#" className="proprty-link">
                                        <h3 className="property-title">{propertyArray[3].title}</h3>
                                    </a>
                                    <p className="property-description">
                                        {truncateAtFullStop(propertyArray[3].publicDescription.summary, 500)}
                                    </p>
                                </div>
                                <div className="cont cont-row gap-8 property-tags">
                                    <span className="property-tag">Luxury</span>
                                    <span className="property-tag">Modern</span>
                                </div>
                            </div>
                            <a className="cta-main green" href={`property/${propertyArray[3]._id}`}>
                                <span className="button-text">See Property</span>
                                <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.6383 21.5096L10.9901 20.8614C10.8111 20.6824 10.8111 20.3922 10.9901 20.2132L18.8785 12.3249L13.1162 12.3314C12.994 12.3319 12.8766 12.2835 12.7902 12.1971C12.7038 12.1107 12.6555 11.9934 12.656 11.8711L12.6624 10.9572C12.6619 10.835 12.7103 10.7177 12.7967 10.6312C12.8831 10.5448 13.0004 10.4965 13.1227 10.497L21.0758 10.4905C21.2581 10.4904 21.433 10.5627 21.562 10.6915L21.8083 10.9378C21.9354 11.0679 22.0074 11.242 22.0092 11.4239L22.0027 19.3771C22.0032 19.4993 21.9549 19.6166 21.8685 19.7031C21.7821 19.7895 21.6647 19.8378 21.5425 19.8373L20.6221 19.8373C20.5014 19.8385 20.3853 19.7911 20.2999 19.7058C20.2146 19.6204 20.1672 19.5043 20.1684 19.3836L20.1749 13.6212L12.2865 21.5096C12.1075 21.6886 11.8173 21.6886 11.6383 21.5096Z" fill="white"/>
                                </svg>                                
                            </a>
                        </div>
                    </article>
                    {/* Property 3 Fernbank */}
                    <article className="cont cont-col property-card">
                    <a href={`property/${propertyArray[6]._id}`} className="proprty-link">
                        <img loading="lazy" src={propertyArray[6].picture.thumbnail} className="property-image" alt="Property image" />
                    </a>
                    <div className="cont cont-col gap-30 property-content">
                        <div className="cont cont-col gap-16 property-info">
                            <div className="cont cont-col gap-24 property-text">
                                <a href="#" className="proprty-link">
                                    <h3 className="property-title">{propertyArray[6].title}</h3>
                                </a>
                                <p className="property-description">
                                    {truncateAtFullStop(propertyArray[6].publicDescription.summary, 500)}
                                </p>
                            </div>
                            <div className="cont cont-row gap-8 property-tags">
                                <span className="property-tag">Luxury</span>
                                <span className="property-tag">Modern</span>
                                <span className="property-tag">Spacious</span>
                            </div>
                        </div>
                        <a className="cta-main green" href={`property/${propertyArray[6]._id}`}>
                            <span className="button-text">See Property</span>
                            <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.6383 21.5096L10.9901 20.8614C10.8111 20.6824 10.8111 20.3922 10.9901 20.2132L18.8785 12.3249L13.1162 12.3314C12.994 12.3319 12.8766 12.2835 12.7902 12.1971C12.7038 12.1107 12.6555 11.9934 12.656 11.8711L12.6624 10.9572C12.6619 10.835 12.7103 10.7177 12.7967 10.6312C12.8831 10.5448 13.0004 10.4965 13.1227 10.497L21.0758 10.4905C21.2581 10.4904 21.433 10.5627 21.562 10.6915L21.8083 10.9378C21.9354 11.0679 22.0074 11.242 22.0092 11.4239L22.0027 19.3771C22.0032 19.4993 21.9549 19.6166 21.8685 19.7031C21.7821 19.7895 21.6647 19.8378 21.5425 19.8373L20.6221 19.8373C20.5014 19.8385 20.3853 19.7911 20.2999 19.7058C20.2146 19.6204 20.1672 19.5043 20.1684 19.3836L20.1749 13.6212L12.2865 21.5096C12.1075 21.6886 11.8173 21.6886 11.6383 21.5096Z" fill="white"/>
                            </svg>                                
                        </a>
                    </div>
                    </article>
                </div>
                <button className="view-all-button">View All</button>
            </section>
            
        </>
    )
}

export default BKFeatures