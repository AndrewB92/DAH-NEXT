import { useMemo, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const BKTestimonialHeading = ({ mapcoords, mapZoom = 12 }) => {
    return (
        <div className="max-1160">
            <h2 className="testimonialHeadingDark">Real reviews from real customers</h2>
            <p className="testimonial--description">Read what our customers have to say</p>
        </div>
    )
}

export default BKTestimonialHeading