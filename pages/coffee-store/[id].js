import Link from 'next/link';
import { useRouter } from 'next/router';

import coffeeStoreData from '../../data/coffee-store.json';

export function getStaticProps(staticProps) {
  const params = staticProps.params;
  return {
    props: {
      coffeeStore: coffeeStoreData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
      }),
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [{ params: { id: '0' } }, { params: { id: '1' } }],
    fallback: true
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();

  if (router.isFallback){
    return <div>Loading...</div>
  }
  return (
    <div>
      <Link href='/'>
        <a>Back to home</a>
      </Link>
      <Link href='/coffee-store/dynamic'>
        <a>Go to dynamic store</a>
      </Link>
      <p>{props.coffeeStore.name}</p>
    </div>
  );
};

export default CoffeeStore;
