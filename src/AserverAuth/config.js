import axios from 'axios';
import conf from '../conf/conf.js'; // Configuration file for the API URL
import Cookies from 'js-cookie';

class VideoService {
    constructor() {
        this.apiUrl = conf.apiUrl; // API base URL from the configuration (e.g., `http://localhost:8000/api/v1`)
    }

    
    async addVideo(videoUrl) {
        try {
            const accessToken = localStorage.getItem('accessToken');
            // console.log("Access Token is :", accessToken)

            if (!accessToken) {
                console.log('No access token found in localStorage');
                return null; // Return null if access token is not found
            }
            
            const response = await axios.post(
                `${this.apiUrl}/users/addVideo`, // API endpoint for adding the video
                { videoUrl }, // Send the video URL in the request body
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`, // Attach the access token in the Authorization header
                    },
                    withCredentials: false, // No need to send cookies with this request
                }
            );

            return response.data; // Return the response data (e.g., success message or video data)
        } catch (error) {
            console.error('Error adding video to watch history:', error);
            throw new Error(error.response ? error.response.data.message : error.message); // Propagate the error
        }
    }

    
    async getTranscript(videoId) {
        try {
            // console.log("Inside the getTranscript:", videoId);
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.log('No access token found in localStorage');
                return null; // Return null if access token is not found
            }
    
            const response = await axios.get(
                `${this.apiUrl}/users/transcript`, // API endpoint for getting the transcript
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`, // Attach the access token in the Authorization header
                    },
                    params: { videoId }, // Pass videoId as a query parameter
                    withCredentials: false, // No need to send cookies with this request
                }
            );
    
            return response.data; // Return the transcript data
        } catch (error) {
            console.error('Error fetching transcript:', error);
            throw new Error(error.response ? error.response.data.message : error.message); // Propagate the error
        }
    }


    async getSummary(videoId) {
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            console.log('No access token found in localStorage');
            return null; // Return null if access token is not found
          }
    
          const response = await axios.get(
            `${this.apiUrl}/users/summary`, // API endpoint for getting the summary
            {
              headers: {
                "Authorization": `Bearer ${accessToken}`, // Attach the access token in the Authorization header
              },
              params: { videoId }, // Pass videoId as a query parameter
              withCredentials: false, // No need to send cookies with this request
            }
          );
    
          return response.data; // Return the summary data
        } catch (error) {
          console.error('Error fetching summary:', error);
          throw new Error(error.response ? error.response.data.message : error.message); // Propagate the error
        }
      }   


    async getKeyConcepts(videoId) {
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            console.log('No access token found in localStorage');
            return null; // Return null if access token is not found
          }
    
          const response = await axios.get(
            `${this.apiUrl}/users/keyconcept`, // API endpoint for getting the summary
            {
              headers: {
                "Authorization": `Bearer ${accessToken}`, // Attach the access token in the Authorization header
              },
              params: { videoId }, // Pass videoId as a query parameter
              withCredentials: false, // No need to send cookies with this request
            }
          );
    
          return response.data; // Return the summary data
        } catch (error) {
          console.error('Error fetching summary:', error);
          throw new Error(error.response ? error.response.data.message : error.message); // Propagate the error
        }
      }   
    
      async getqnas(videoId) {
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            console.log('No access token found in localStorage');
            return null; // Return null if access token is not found
          }
    
          const response = await axios.get(
            `${this.apiUrl}/users/qnas`, // API endpoint for getting the summary
            {
              headers: {
                "Authorization": `Bearer ${accessToken}`, // Attach the access token in the Authorization header
              },
              params: { videoId }, // Pass videoId as a query parameter
              withCredentials: false, // No need to send cookies with this request
            }
          );
    
          return response.data; // Return the summary data
        } catch (error) {
          console.error('Error fetching Qnas:', error);
          throw new Error(error.response ? error.response.data.message : error.message); // Propagate the error
        }
      }
       
      async getCurrentUser() {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) return null;

            const response = await axios.post(
                `${this.apiUrl}/users/current-user`, 
                {},
                { headers: { "Authorization": `Bearer ${accessToken}` }, withCredentials: false }
            );
            console.log("Inside the current user:", response.data.data)
            return response.data.data;
        } catch (error) {
            console.error("Error fetching current user:", error);
            return null;
        }
    }
      
      async getUserHistory() {
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            console.log('No access token found in localStorage');
            return null; // Return null if access token is not found
          }
    
          const response = await axios.get(
            `${this.apiUrl}/users/history`, // API endpoint for getting the summary
            {
              headers: {
                "Authorization": `Bearer ${accessToken}`, // Attach the access token in the Authorization header
              },
              withCredentials: false, // No need to send cookies with this request
            }
          );
    
          return response.data; // Return the summary data
        } catch (error) {
          console.error('Error fetching Qnas:', error);
          throw new Error(error.response ? error.response.data.message : error.message); // Propagate the error
        }
      }

      async changeCurrentPassword(oldPassword, newPassword) {
        try {
            console.log("Passwords", oldPassword, newPassword)
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            console.log('No access token found in localStorage');
            return null;
          }
    
          const response = await axios.patch(
            `${this.apiUrl}/users/change-password`,
            { oldPassword, newPassword },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              withCredentials: false,
            }
          );
    
          return response.data;
        } catch (error) {
          console.error('Error changing password:', error);
          throw new Error(error.response ? error.response.data.message : error.message);
        }
      }
    
      async updateAccountDetails(fullname, email) {
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            console.log('No access token found in localStorage');
            return null;
          }
      
          const response = await axios.patch(
            `${this.apiUrl}/users/update-account`,
            { fullname, email },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              withCredentials: false,
            }
          );
      
          return response.data;
        } catch (error) {
          console.error('Error updating account details:', error);
          // Throwing a custom error message based on the server response
          const errorMessage = error.response
            ? error.response.data.message
            : error.message;
      
          throw new Error(errorMessage);
        }
      }
      
    
      async updateUserAvatar(file) {
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            console.log('No access token found in localStorage');
            return null;
          }
    
          const formData = new FormData();
          formData.append('avatar', file);
    
          const response = await axios.patch(`${this.apiUrl}/users/update-avatar`, formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: false,
          });
    
          return response.data;
        } catch (error) {
          console.error('Error updating avatar:', error);
          throw new Error(error.response ? error.response.data.message : error.message);
        }
      }
    



    
    
}

const videoService = new VideoService();
export default videoService;


