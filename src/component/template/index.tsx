import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { HeroContent } from '../base/Heroheader/heroheader';

const IndexPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      router.push('/status');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <>
      <HeroContent />
    </>
  );
};

export default IndexPage;
