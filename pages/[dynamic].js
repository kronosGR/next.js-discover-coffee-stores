import { useRouter } from 'next/router';

const DynamicRoute = () => {
  const router = useRouter();

  return <div>dynamic {router.query.dynamic}
  </div>
}

export default DynamicRoute