import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputURL from "../../pages/InputURL";
import UserHistory from "../../pages/UserHistory";
import { logout } from "../../store/authSlice"; // Assuming you have a logout action
import authService from "../../AserverAuth/auth";
import videoService from "../../AserverAuth/config";
import { setUserHistory, clearVideoData } from "../../store/currentVideoSlice"; // Import the action'
import Settings from "../../pages/Settings";

function Dashboard() {
  const user = useSelector((state) => state.auth.userData);
  const userHistory = useSelector((state) => state.currentVideo.userHistory); // Fetch history from Redux
  const [activePage, setActivePage] = useState("inputURL"); // Track active page
  const [historyIsLoading, setHistoryIsLoading] = useState(false); // Track loading state for history data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout()); // Dispatch the logout action to update the Redux store
      dispatch(clearVideoData()); // Clear the current video data from the Redux store
      navigate("/login"); // Redirect to the login page
    });
  };

  const handleHistoryClick = async () => {
    setHistoryIsLoading(true); // Set loading to true before fetching data

    try {
      const response = await videoService.getUserHistory(); // Fetch user history using videoService
      console.log("User history after fetching is:", response);
      dispatch(setUserHistory(response.data)); // Dispatch action to set history in Redux
      setActivePage("history"); // Set the active page to 'history'
    } catch (error) {
      console.error("Error fetching user history:", error);
    } finally {
      setHistoryIsLoading(false); // Set loading to false after fetching is done
    }
  };

  return (
    <div className="flex flex-row min-h-[calc(100vh-64px)] p-2">
      {/* Left Sidebar */}
      <div
        className="w-full lg:w-1/6 bg-gray-50 p-2 shadow-md flex flex-col justify-between overflow-y-auto rounded-md mr-2"
        style={{ paddingTop: "1rem" }}
      >
        <div>
          <p className="text-xl font-semibold mb-4">
            Welcome, {user.fullname || user.username}
          </p>

          <div className="flex flex-col space-y-4">
            <button
              onClick={() => setActivePage("inputURL")}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                activePage === "inputURL"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Input URL
            </button>
            <button
              onClick={handleHistoryClick}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                activePage === "history"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {historyIsLoading ? "Loading..." : "History"}
            </button>
            <button
              onClick={() => setActivePage("settings")}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                activePage === "settings"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        <button
          onClick={logoutHandler}
          className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 mt-4"
        >
          Logout
        </button>
      </div>

      {/* Right Content */}
      <div className="flex-grow p-6 bg-white border border-gray-300 rounded-lg shadow-md min-h-0">
        {activePage === "inputURL" && <InputURL />}
        {activePage === "history" && (
          <div className="h-[calc(100vh-125px)] overflow-y-auto"> {/* Set height and scroll if content overflows */}
            <UserHistory data={userHistory} />
          </div>)} {/* Pass history from Redux */}
        
        {activePage === 'settings' && <Settings />}
      </div>
    </div>
  );
}

export default Dashboard;
