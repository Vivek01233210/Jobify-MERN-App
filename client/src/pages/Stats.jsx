import { useQuery } from '@tanstack/react-query';
import { StatsContainer, ChartsContainer } from '../components';
import { customFetch } from '../utils/customFetch';
// import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  return null;
  // const response = await customFetch.get('/jobs/stats');
  // return response.data;
}

export default function Stats() {
  // const { defaultStats, monthlyApplications } = useLoaderData();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['get-stats'],
    queryFn: () => customFetch.get('/jobs/stats'),
  });

  if (isLoading) return <h1>Loading...</h1>
  if(isError) return <h1>Error...</h1>
  
  const {defaultStats,monthlyApplications} = data.data;
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  )
}