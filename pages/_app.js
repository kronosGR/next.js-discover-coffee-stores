import StoreProvider from '../store/store-context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
      <footer>
        <p>&#169; 2022 KronosGR</p>
      </footer>
    </StoreProvider>
  );
}

export default MyApp;
