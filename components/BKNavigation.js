import Image from 'next/image'
import Link from 'next/link'
import BKMobileNavDrawer from './BKMobileNavDrawer';

const BKNavigation = ({ rootUrl }) => {
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen); // Toggle the drawer's visibility
      };
    return (
        <>
        <header className="cont cont-row gap-20 max-1160">
            <a href={`${rootUrl}`} className="logo-link">
                <img src="/img/Logo.png" alt="Logo" className="logo-img" />
            </a>
            <nav className="cont cont-row gap-24 centered nav-links">
                <a href={`${rootUrl}/why-dublin-at-home/`} className="nav-link">Why Us</a>
                <a href="/properties" className="nav-link">Browse</a>
                <a href={`${rootUrl}/tailored-stays/`} className="nav-link">Tailored stays</a>
                <a href={`${rootUrl}/make-an-enquiry/`} className="nav-link">Make an Enquiry</a>
                <a href={`${rootUrl}/faq/`} className="nav-link">FAQ</a>
                <a href={`${rootUrl}/blog/`} className="nav-link">Blog</a>
            </nav>
            <a href={`${rootUrl}/make-an-enquiry/`} className="cta-main">
                <span>Get in touch</span>
                <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6383 21.5096L10.9901 20.8614C10.8111 20.6824 10.8111 20.3922 10.9901 20.2132L18.8785 12.3249L13.1162 12.3314C12.994 12.3319 12.8766 12.2835 12.7902 12.1971C12.7038 12.1107 12.6555 11.9934 12.656 11.8711L12.6624 10.9572C12.6619 10.835 12.7103 10.7177 12.7967 10.6312C12.8831 10.5448 13.0004 10.4965 13.1227 10.497L21.0758 10.4905C21.2581 10.4904 21.433 10.5627 21.562 10.6915L21.8083 10.9378C21.9354 11.0679 22.0074 11.242 22.0092 11.4239L22.0027 19.3771C22.0032 19.4993 21.9549 19.6166 21.8685 19.7031C21.7821 19.7895 21.6647 19.8378 21.5425 19.8373L20.6221 19.8373C20.5014 19.8385 20.3853 19.7911 20.2999 19.7058C20.2146 19.6204 20.1672 19.5043 20.1684 19.3836L20.1749 13.6212L12.2865 21.5096C12.1075 21.6886 11.8173 21.6886 11.6383 21.5096Z" fill="white"/>
                </svg>
            </a>
            <BKMobileNavDrawer />
        </header>
            </>
    )
}

export default BKNavigation
