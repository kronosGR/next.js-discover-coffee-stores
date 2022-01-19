import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <footer>
        <p>&#169; 2022 KronosGR</p>
      </footer>
    </div>
  );
}

export default MyApp;
