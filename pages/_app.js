import { createContext } from 'react';
import '../styles/globals.css';

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: '',
    coffeeStore: [],
  };
  return (
    <StoreContext.Provider value={{ state: initialState }}>
      {children}
    </StoreContext.Provider>
  );
};

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
