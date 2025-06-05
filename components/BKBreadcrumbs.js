

const BKBreadcrumbs = ({ propertyId, propertyTitle }) => {
    return (
        <nav className="cont cont-row breadcrumbs" aria-label="Breadcrumb">
            <a href="/properties" className="breadcrumb-link">Browse All</a>
            <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.47099 7.79976L5.27565 3.9951L1.47099 0.19043L0.52832 1.1331L3.39032 3.9951L0.52832 6.8571L1.47099 7.79976Z" fill="#707070"></path></svg>
            <a href={`/property/${propertyId}`}className="breadcrumb-link">Property Details</a>
            <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.47099 7.79976L5.27565 3.9951L1.47099 0.19043L0.52832 1.1331L3.39032 3.9951L0.52832 6.8571L1.47099 7.79976Z" fill="#707070"></path></svg>
            <a href={`/property/${propertyId}`} className="breadcrumb-link">{propertyTitle}</a>
        </nav>
    )
}

export default BKBreadcrumbs