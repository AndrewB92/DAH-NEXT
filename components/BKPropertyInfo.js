
import { useState, useEffect } from 'react'

    const BKPropertyInfo = ({ property }) => {

    const propertyName = property.title.includes(' by Dublin At Home') ? property.title.replace(/ by Dublin At Home$/, '') : property.title;
    
    // Tab code //
    // This state will manage the currently active tab
    const [activeTab, setActiveTab] = useState('description');
    const [isMobile, setIsMobile] = useState(false);

    // Tab identifiers, keeping them based on your HTML structure
    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'nearby-attractions', label: 'Nearby Attractions' },
        { id: 'facilities', label: 'Facilities' }
    ];

    const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    };

    const handleMobileSelect = (e) => {
    setActiveTab(e.target.value);
    };

    const checkScreenWidth = () => {
    if (window.innerWidth <= 1024) {
        setIsMobile(true);
    } else {
        setIsMobile(false);
    }
    };

    const reserveTextFormatting = (text) => {
        // Convert URLs to anchor tags
        if(text) {
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const formattedText = text.replace(urlRegex, (url) => {
                return `<a href="${url}" target="_blank" rel="noopener noreferrer">Find it on Google Maps </a>`;
            });
    
            // Replace newlines with <br />
            return formattedText.replace(/\n/g, '<br />');
        }else{
            return ''
        }
    };

    // Add a listener for window resizing to check if the screen is mobile
    useEffect(() => {
        checkScreenWidth();
        window.addEventListener('resize', checkScreenWidth);
        return () => window.removeEventListener('resize', checkScreenWidth);
    }, []);
    return (
        <>
            <h1 className="apartment-title">{propertyName}</h1>
    
            {/* <div className="cont cont-row gap-8 rating-container">
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.04894 0.927052C9.3483 0.00574112 10.6517 0.00573993 10.9511 0.927051L12.4697 5.60081C12.6035 6.01284 12.9875 6.2918 13.4207 6.2918H18.335C19.3037 6.2918 19.7065 7.53141 18.9228 8.10081L14.947 10.9894C14.5966 11.244 14.4499 11.6954 14.5838 12.1074L16.1024 16.7812C16.4017 17.7025 15.3472 18.4686 14.5635 17.8992L10.5878 15.0106C10.2373 14.756 9.7627 14.756 9.41221 15.0106L5.43648 17.8992C4.65276 18.4686 3.59828 17.7025 3.89763 16.7812L5.41623 12.1074C5.55011 11.6954 5.40345 11.244 5.05296 10.9894L1.07722 8.10081C0.293507 7.53141 0.696283 6.2918 1.66501 6.2918H6.57929C7.01252 6.2918 7.39647 6.01284 7.53035 5.60081L9.04894 0.927052Z" fill="#FFC663"/>
                </svg>                                
                <span className="rating-value">5,0</span>
                <span className="review-count">• 10 reviews</span>
            </div>
             */}
    
            {!isMobile ? (
                <div className="tab-container">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            ) : (
                <select className="mob-tab-item" value={activeTab} onChange={handleMobileSelect}>
                    {tabs.map((tab) => (
                        <option key={tab.id} value={tab.id}>
                            {tab.label}
                        </option>
                    ))}
                </select>
            )}
    
            <div className="content-container">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        id={tab.id}
                        className={`tab-content ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        {/* Use your existing content for each tab */}
                        {tab.id === 'description' && (
                            <p dangerouslySetInnerHTML={{
                                __html: `${(property.publicDescription?.summary || 'More data to come...').replace(/\n/g, '<br />')}<br /><br />
                                         ${(property.publicDescription?.space || '').replace(/\n/g, '<br />')}`
                                }} />
                        )}
                        {tab.id === 'nearby-attractions' && (
                            <p dangerouslySetInnerHTML={{
                                __html: property.publicDescription?.neighborhood
                                    ? reserveTextFormatting(property.publicDescription.neighborhood)
                                    : 'More data to come...'
                            }} />
                        )}

                        {tab.id === 'facilities' && (
                            <p dangerouslySetInnerHTML={{
                                __html: (property.publicDescription?.transit
                                    ? property.publicDescription.transit.replace(/\n/g, '<br />')
                                    : 'More data to come...')
                            }} />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default BKPropertyInfo