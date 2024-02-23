import React, { useEffect, useState } from 'react';
import StudentDetails from './StudentDetails';
import { useDataContext } from './DataContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Search = () => {
    const [studentid, setStudentId] = useState();
    const [isIdFound, setIsIdFound] = useState(false);
    //const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { setAuthenticated } = useAuth();

    const { getId }=useDataContext();
    
    const handleUsernameChange = (e) => {
      setStudentId(e.target.value);
    };

    getId(studentid);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const searchid = {
          id: studentid
        };
        try {
          const response = await fetch('http://localhost:8080/exist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchid)
          });
          if (response.ok) {
            // Login successful
            //const data = await response.json();
            // Handle storing tokens or session data
            console.log('ID Found');
            setIsIdFound(true);
            navigate(`/update/${studentid}`); 
          } else {
            // Login failed
            //setShowError(true);
            setShowError(true);
            console.error('ID Not Found');
          }
      }
        catch (error) {
        console.error('Error:', error);
    }
    };

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/");
      }
        else{
        navigate("/search");
      }
    }, []);

  return (
        <div>
            {!isIdFound ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="studentid">Enter Student ID:</label>
              <input
                type="number"
                id="studentid"
                value={studentid}
                onChange={handleUsernameChange}
              />
            </div>
            {showError && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          Student ID does not exist.
        </div>
      )}
            <button type="submit">Submit</button>
          </form>
            ):(
                <p>Redirecting....</p>
            )}
        </div>
      );
    };

export default Search;