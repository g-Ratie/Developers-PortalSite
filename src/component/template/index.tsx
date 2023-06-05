import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { HeroContent } from '../base/Heroheader/heroheader';

const IndexPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <HeroContent />
    </>
  );
};

export default IndexPage;
