import Image from 'next/image'

const BKTestimonialRender = ({ review }) => {

    const { rating, text, author_name } = review

    return (
        // Beginning of Card Slide
        <div className="cont cont-col gap-20 testimonial-card slide">
        <div className="cont cont-row gap-16 user-info">
            <Image
                src={review.profile_photo_url}
                alt={review.author_name}
                className="user-avatar"
                width={50} // Set your desired width
                height={50} // Set your desired height
            />
            
            <div className="cont cont-col gap-8 user-details">
                <h3 className="user-name">{review.author_name}</h3>
                <div className="cont cont-row gap-24 rating-container">
                    <div className="cont cont-row gap-5 star-rating">
                    {Array(rating).fill().map((_, index) => (
                    <svg
                        key={index}
                        width="20"
                        height="19"
                        viewBox="0 0 20 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                    <path d="M9.04894 0.927052C9.3483 0.00574112 10.6517 0.00573993 10.9511 0.927051L12.4697 5.60081C12.6035 6.01284 12.9875 6.2918 13.4207 6.2918H18.335C19.3037 6.2918 19.7065 7.53141 18.9228 8.10081L14.947 10.9894C14.5966 11.244 14.4499 11.6954 14.5838 12.1074L16.1024 16.7812C16.4017 17.7025 15.3472 18.4686 14.5635 17.8992L10.5878 15.0106C10.2373 14.756 9.7627 14.756 9.41221 15.0106L5.43648 17.8992C4.65276 18.4686 3.59828 17.7025 3.89763 16.7812L5.41623 12.1074C5.55011 11.6954 5.40345 11.244 5.05296 10.9894L1.07722 8.10081C0.293507 7.53141 0.696283 6.2918 1.66501 6.2918H6.57929C7.01252 6.2918 7.39647 6.01284 7.53035 5.60081L9.04894 0.927052Z" fill="#FFC663" />
                    </svg>
                    ))}
                    </div>
                    <span className="review-date">{review.relative_time_description}</span>
                </div>
            </div>

            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M31.96 17.354C31.96 16.249 31.8608 15.1865 31.6767 14.1665H17V20.2015H25.3867C25.0183 22.1423 23.9133 23.7857 22.2558 24.8907V28.8148H27.3133C30.26 26.0948 31.96 22.0998 31.96 17.354Z" fill="#4285F4"/>
                <path d="M16.9996 32.5834C21.2071 32.5834 24.7346 31.1951 27.3129 28.8151L22.2554 24.8909C20.8671 25.8259 19.0962 26.3926 16.9996 26.3926C12.9479 26.3926 9.50539 23.6584 8.27289 19.9751H3.08789V23.9984C5.65206 29.0843 10.9079 32.5834 16.9996 32.5834Z" fill="#34A853"/>
                <path d="M8.27366 19.9606C7.96199 19.0256 7.77782 18.034 7.77782 16.9998C7.77782 15.9656 7.96199 14.974 8.27366 14.039V10.0156H3.08866C2.02616 12.1123 1.41699 14.4781 1.41699 16.9998C1.41699 19.5215 2.02616 21.8873 3.08866 23.984L7.12616 20.839L8.27366 19.9606Z" fill="#FBBC05"/>
                <path d="M16.9996 7.6215C19.2946 7.6215 21.3346 8.41484 22.9637 9.94484L27.4262 5.48234C24.7204 2.96067 21.2071 1.4165 16.9996 1.4165C10.9079 1.4165 5.65206 4.91567 3.08789 10.0157L8.27289 14.039C9.50539 10.3557 12.9479 7.6215 16.9996 7.6215Z" fill="#EA4335"/>
            </svg>     
                               
        </div>
        <h2 className="testimonial-header">{review.header}&hellip;</h2>
        <p className="testimonial-text">{review.text}&hellip;</p>
    </div>
    )
}

export default BKTestimonialRender