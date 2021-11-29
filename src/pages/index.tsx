import React, { useEffect, useState, ChangeEvent } from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';

import { api } from '../services/api';

import { twitter } from '../services/twitter';

import styles from '../styles/Home.module.scss';

interface Trend {
  name: string;
  url: string;
  query: string;
  tweet_volume: number;
}

interface HomeProps {
  trendsResponse: Trend[];
}

export default function Home(): JSX.Element {
  const [woeid, setWoeid] = useState(1);
  const [trends, setTrends] = useState<Trend[]>([]);

  useEffect(() => {
    getTrends(woeid);
  }, [woeid]);

  const getTrends = async (woeid: number) => {
    try {
      const response = await api.get(`${woeid}`);

      setTrends(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Twitter Trends</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.woeid}>
          <select
            name="trend-local"
            defaultValue={1}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setWoeid(Number(e.target.value))
            }
            className={styles.woeidSelect}
          >
            <option value="1">Global</option>
            <option value="455820">Belém, BR</option>
            <option value="23424768">Brazil</option>
            <option value="23424856">Japan</option>
            <option value="638242">Berlin, DE</option>
            <option value="2459115">New York, US</option>
            <option value="2442047">Los Angeles, US</option>
            <option value="44418">London, EN</option>
            <option value="1105779">Sydney, AU</option>
          </select>
        </div>

        <div className={styles.trends}>
          {trends.map((trend, index) => (
            <li key={trend.query} className={styles.trend}>
              <a href={trend.url} target="_blank" rel="noreferrer">
                <span className={styles.topNumber}>{index + 1}</span>
                {trend.name}
                {trend.tweet_volume && (
                  <span className={styles.tweetVolume}>
                    {trend.tweet_volume}
                  </span>
                )}
              </a>
            </li>
          ))}
        </div>
      </main>
    </>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const { data } = await twitter.get('trends/place.json?id=1');
//   const { trends } = data[0];

//   return {
//     props: {
//       trendsResponse: trends,
//     },
//     revalidate: 60, // 1 minute
//   };
// };
