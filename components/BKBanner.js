
const BKBanner = ({ bannerTopHeading, bannerMainHeading, bannerBottomHeading, bannerImage }) => {
    return (
        <section
            className="cont cont-col gap-24 page-title featured-properties max-1680"
            style={{ backgroundImage: `url(${bannerImage})` }}
        >
            <div className="wrapper cont cont-col gap-24">
                <h2>{bannerTopHeading}</h2>
                <h1 className="featured-properties--title">{bannerMainHeading}</h1>
                <p className="featured-properties--description">{bannerBottomHeading}</p>
            </div>
        </section>
    )
}

export default BKBanner