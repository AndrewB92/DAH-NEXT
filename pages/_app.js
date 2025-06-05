import '../styles/globals.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;