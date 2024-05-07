import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom"
import CSSWrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { useState, createContext, useContext } from "react";
import { checkDefaultTheme } from "../App";
import { customFetch } from "../utils/customFetch.js";
import { toast } from "react-toastify";

export const loader = async() => {
  try {
    const {data} = await customFetch.get('/users/current-user');
    return data;
  } catch (error) {
    console.log(error)
    return redirect('/');
  }
}

// creating a context
const DashboardContext = createContext();

export default function DashboardLayout() {
  const navigate = useNavigate();
  const data  = useLoaderData();
// console.log(data)
  // temp
  const user = data.user;

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    // CSS related to dark-theme class is in index.css file
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  }

  const toggleSidebar = () => {
    setShowSidebar(prevState => !prevState);
  }

  const logoutUser = async() => {
    await customFetch.get('/auth/logout');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <DashboardContext.Provider value={{ user, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser }}
    >
      <CSSWrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {/* we can pass context values in outlet in react-router-dom */}
              <Outlet context={{user}}/> 
            </div>
          </div>
        </main>
      </CSSWrapper>
    </DashboardContext.Provider>
  )
}

// custom hook to use the context
export const useDashboardContext = () => useContext(DashboardContext);
