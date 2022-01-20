import Link from 'next/link';
import { useRouter } from 'next/router';

const CoffeeStore = () => {
  const router = useRouter();
  return (
    <div>
      <Link href='/'>
        <a>Back to home</a>
      </Link>
      <Link href="/coffee-store/dynamic">
        <a >Go to dynamic store</a>
      </Link>
      Coffee Store Page {router.query.id}
    </div>
  );
};

export default CoffeeStore;
