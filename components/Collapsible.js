import { useState, useRef, useEffect } from 'react';

const Collapsible = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        const content = contentRef.current;
        if (content) {
            if (isOpen) {
                // Set the height to the full scroll height to show content
                content.style.height = `${content.scrollHeight}px`;
            } else {
                // Set the height to 0 to hide the content
                content.style.height = '0px';
            }
        }
    }, [isOpen]);

    const toggleCollapsible = () => {
        setIsOpen(!isOpen);
        const wrapper = contentRef.current?.parentElement; // Get the wrapper (parent of contentRef)

        if (wrapper) {
            if (isOpen) {
                wrapper.classList.remove('collapsible-tab__open'); // Remove the class when closing
            } else {
                wrapper.classList.add('collapsible-tab__open'); // Add the class when opening
            }
        }
    };

    return (
        <div className="collapsibles-wrapper">
            <button
                type="button"
                className={`collapsible-trigger-btn ${isOpen ? 'collapsible-tab__open' : ''}`}
                onClick={toggleCollapsible}
            >
                {title}
            </button>
            <div
                className={`collapsible-content ${isOpen ? 'open' : 'collapsed'}`}
                ref={contentRef}
                style={{ overflow: 'hidden', transition: 'height 0.3s ease' }} // Smooth height transition
            >
                <div className="collapsible-content-inner">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Collapsible;