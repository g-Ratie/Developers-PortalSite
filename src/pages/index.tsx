import { PrismaClient } from '@prisma/client';
import type { GetServerSideProps } from 'next';
import styles from './index.module.css';

type Props = {
  count: number;
  inoutcount: number;
  usertimedata: Record<string, number>;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const prisma = new PrismaClient();
  const count = await prisma.users.count();
  const inoutcount = await prisma.daily_records.count();
  const usertimedata: Record<string, number> = {};
  const alldata = await prisma.daily_records.findMany({
    include: {
      users: true,
    },
  });
  alldata.forEach((data) => {
    const userName = data.users.user_name;
    if (data.check_out === null) {
      if (usertimedata[userName] === undefined) {
        // usertimedata[data.users.user_name]
      }
    } else {
      if (usertimedata[userName] === undefined) {
        usertimedata[userName] =
          (data.check_out.getTime() - data.check_in.getTime()) / (1000 * 60 * 60); // ミリ秒を時間に変換
      } else {
        usertimedata[userName] +=
          (data.check_out.getTime() - data.check_in.getTime()) / (1000 * 60 * 60); // ミリ秒を時間に変換
      }
    }
  });

  console.log(usertimedata);
  return {
    props: {
      count,
      inoutcount,
      usertimedata,
    },
  };
};

const Home = (props: Props) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code} style={{ backgroundColor: '#fafafa' }}>
            pages/index.js
          </code>
        </p>
        <div className={styles.grid}>
          <a className={styles.card} href="https://nextjs.org/docs">
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a className={styles.card} href="https://nextjs.org/learn">
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a className={styles.card} href="https://github.com/vercel/next.js/tree/master/examples">
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            className={styles.card}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          >
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
        <div>user count: {props.count}</div>
        <div>inout count: {props.inoutcount}</div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <img src="vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
