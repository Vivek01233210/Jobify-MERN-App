import { toast } from "react-toastify";
import { customFetch } from "../utils/customFetch.js";
import { useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";
import SearchContainer from "../components/SearchContainer.jsx";
import JobsContainer from "../components/JobsContainer.jsx";


export const loader = async ({ request }) => {
  try {
    // console.log(request.url);
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    // console.log(params)
    const { data } = await customFetch.get('/jobs', { params });
    return { data: data, searchValues: {...params} };
  } catch (error) {
    toast.error(error?.response?.data?.message || 'An error occurred');
    return error;
  }
}

const AllJobsContext = createContext();

export default function AllJobs() {

  const { data, searchValues } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  )
}

// custom hook to use the AllJobsContext
export const useAllJobsContext = () => useContext(AllJobsContext);