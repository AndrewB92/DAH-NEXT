import Head from 'next/head'
import Script from 'next/script'
import BKNavigation from './BKNavigation'
import BKFooter from './BKFooter';
import rootUrl from 'config.js'
import { Analytics } from '@vercel/analytics/react';

const Layout = ({ pageTitle, children }) => {

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/x-icon" href="/img/favicon.ico"></link>
            </Head>

            <Script
                id="google-tag-manager"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-5P2WCB9B');
                    `,
                }}
            />
            
            <BKNavigation rootUrl = {rootUrl} />
                {children}
            <BKFooter rootUrl = {rootUrl} />
        </>
    )
}

export default Layout
