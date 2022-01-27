import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cls from 'classnames';

import styles from '../../styles/coffee-store.module.css';
import { fetchCoffeeStores } from '../../lib/coffee-stores';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../store/store-context.js';
import { isEmpty } from '../../utils';

//   Client Id
// B4M1I4L1QNP1WN2EBJXQFG5LT5Y50XHGINB4TTJLS3CW4FVH

// Client Secret
// I20N5L3TDB3ZPPZ23KDDWKBHCBLBFF5GR4CFWRPKNXYTSPB1

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.fsq_id === params.id;
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.fsq_id,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const fsq_id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const handleCreateCoffeeStore = async (coffeeStore) => {
    try {
      const { fsq_id, name, voting, imgUrl, neighbourhood, address } = coffeeStore;
      const response = await fetch('/api/createCoffeeStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: fsq_id,
          name,
          voting: 0,
          imgUrl,
          neighbourhood: neighbourhood || '',
          address: address || '',
        }),
      });

      const dbCoffeeStore = await response.json();
    } catch (err) {
      console.error('Error creating coffee store', err);
    }
  };

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
          console.log(coffeeStore);
          return coffeeStore.fsq_id === fsq_id;
        });
        if (coffeeStoreFromContext) {
          setCoffeeStore(coffeeStoreFromContext);
          handleCreateCoffeeStore(coffeeStoreFromContext);
        }
      }
    } else {
      handleCreateCoffeeStore(initialProps.coffeeStore);
    }
  }, [fsq_id, initialProps, initialProps.coffeeStore]);

  const { address, neighborhood, name, imgUrl } = coffeeStore;

  const handleUpvoteButton = () => {
    consle.log('upvote');
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/'>
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}></Image>
        </div>
        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src='/static/icons/places.svg' width={24} height={24} />
            <p className={styles.text}>{address}</p>
          </div>
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image src='/static/icons/nearMe.svg' width={24} height={24} />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src='/static/icons/star.svg' width={24} height={24} />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
