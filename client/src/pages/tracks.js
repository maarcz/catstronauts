import React from 'react';
import { Layout } from '../components';
import { useQuery, gql } from '@apollo/client';
import TrackCard from '../containers/track-card';
import QueryResult  from '../components/query-result';

const TRACKS = gql`
  query ExampleQuery {
    tracksForHome {
      id
      title
      thumbnail
      length
      modulesCount
      author {
        id
        name
        photo
      }
    }
  }
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  const { loading, error, data} = useQuery(TRACKS);
  
  return (
    <Layout grid>
      <QueryResult error={error} loading={loading} data={data}>
        {data?.tracksForHome?.map((track, idx) => (
          <TrackCard key={`${track.id}-${idx}`} track={track} />
        ))}
      </QueryResult>
    </Layout>
  );
};

export default Tracks;
