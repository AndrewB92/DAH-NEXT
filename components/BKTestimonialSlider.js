
const BKTestimonialSlider = () => {

    return (
        <>
            <div className="cont cont-row buttons-wrapper">
            <button id="prev">
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.275 8.89982C0.0991344 8.72417 0.000218815 8.48587 0 8.23732V7.76232C0.00288001 7.5143 0.101395 7.27697 0.275 7.09982L6.7 0.687315C6.81735 0.568995 6.9771 0.502441 7.14375 0.502441C7.3104 0.502441 7.47015 0.568995 7.5875 0.687315L8.475 1.57482C8.59258 1.69002 8.65884 1.8477 8.65884 2.01232C8.65884 2.17693 8.59258 2.33461 8.475 2.44982L2.9125 7.99981L8.475 13.5498C8.59332 13.6672 8.65987 13.8269 8.65987 13.9936C8.65987 14.1602 8.59332 14.32 8.475 14.4373L7.5875 15.3123C7.47015 15.4306 7.3104 15.4972 7.14375 15.4972C6.9771 15.4972 6.81735 15.4306 6.7 15.3123L0.275 8.89982Z"/>
                </svg>
            </button>
            <button id="next">
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.72472 7.09982C8.90058 7.27546 8.9995 7.51376 8.99972 7.76232V8.23732C8.99684 8.48533 8.89832 8.72266 8.72472 8.89982L2.29972 15.3123C2.18236 15.4306 2.02262 15.4972 1.85597 15.4972C1.68932 15.4972 1.52957 15.4306 1.41222 15.3123L0.524718 14.4248C0.407138 14.3096 0.340878 14.1519 0.340878 13.9873C0.340878 13.8227 0.407138 13.665 0.524718 13.5498L6.08722 7.99981L0.524718 2.44982C0.406397 2.33246 0.339844 2.17271 0.339844 2.00607C0.339844 1.83942 0.406397 1.67967 0.524718 1.56232L1.41222 0.687315C1.52957 0.568995 1.68932 0.502441 1.85597 0.502441C2.02262 0.502441 2.18236 0.568995 2.29972 0.687315L8.72472 7.09982Z"/>
                </svg>                
            </button>
            </div>
            <div className="cont cont-col progress-container" aria-label="Progress Indicator">
            <div className="cont cont-row gap-30 progress-steps" role="progressbar" aria-valuemin="1" aria-valuemax="5" aria-valuenow="3">
                <div className="progress-step dot"></div>
                <div className="progress-step dot"></div>
                <div className="progress-step dot active"></div>
                <div className="progress-step dot"></div>
                <div className="progress-step dot"></div>
            </div>
            </div>
        </>
    )



}

export default BKTestimonialSlider