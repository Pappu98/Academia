import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import axios from 'axios';
import { useDataContext } from './DataContext';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const StudentDetails = () => {
    const [student, setStudent] = useState(null);
    const [domainId,setDomainId]=useState('');
    const [dataArray, setDataArray] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [cgpa, setCgpa] = useState('');
    const [graduation_year, setYear] = useState('');
    const [id, setId] = useState('');
    const [domain, setDomain] = useState('');
    const [admissionYear, setAdmissionYear] = useState('');
    const [address, setAddress] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [email, setEmail] = useState('');
    const [photoPath, setPhotoPath] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [totalCredits, setTotalCredits] = useState();
    const [specializationArray,setSpecializationArray]=useState([]);
    const [specialization,setSpecialization]=useState('');
    const [selectedValueS,setSelectedValueS]=useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const { isAuthenticated } = useAuth();
    const navigate=useNavigate();

    const { data } = useDataContext () ;
    //console.log(data);

    // const newSpecialization = {
    //   id: null,
    //   specializationName: "No option",
    //   creditsRequired: 0
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedValue = {
            first_name: first_name,
            last_name: last_name,
            cgpa: cgpa,
            graduation_year: graduation_year,
            domain: selectedDomain,
            address: address,
            email: email,
            rollNo: rollNo,
            admissionYear: admissionYear,
            photograph_path: photoPath,
            totalCredits: totalCredits,
            specialization: selectedSpecialization
        };
        try {
          const response = await fetch(`http://localhost:8080/update/${data}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedValue)
          });
          //console.log(updatedValue);
          if (response.ok) {
            console.log('Success');
            setShowSuccess(true);
            setTimeout(() => {
              setShowSuccess(false);
            }, 2000);
      
          } else {
            const errorText = await response.text();
            console.error('Update failed:', errorText);
            setShowError(true);
            setTimeout(() => {
              setShowError(false);
            }, 2000);
            setErrorText(errorText);
            console.error('Update failed');
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
    }, []);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        //console.log(e.target.value);
      };
    
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
      };
    
    const handleCgpaChange = (e) => {
        setCgpa(e.target.value);
      };
    
    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhotographPathChange = (e) => {
      setPhotoPath(e.target.value);
    };

    const handleTotalCreditsChange = (e) => {
      setTotalCredits(e.target.value);
    };

    const handleRollNoChange = (e) => {
      setRollNo(e.target.value);
    };

    useEffect(() => {
        // Fetch data when the component mounts
        axios.get(`http://localhost:8080/student/${data}`) // Replace with your endpoint URL for a single student by ID
          .then(response => {
            const student=response.data; // Update state with received data
            //console.log(student);
            if(student)
            {
            setFirstName(student.first_name);
            setLastName(student.last_name);
            setCgpa(student.cgpa);
            setYear(student.graduation_year);
            setId(student.id);
            setDomain(student.domain.domain_name);
            setAdmissionYear(student.admissionYear);
            setAddress(student.address);
            setRollNo(student.rollNo);
            setEmail(student.email)
            setPhotoPath(student.photograph_path);
            setTotalCredits(student.totalCredits);
            setSpecialization(student.specialization.specializationName);
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

      useEffect(() => {
        // Fetch data when the component mounts
        axios.get("http://localhost:8080/getdomains") // Replace with your endpoint URL for a single student by ID
          .then(response => {
            setDataArray(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);
     const newArray=[];

      useEffect(() => {
        // Fetch data when the component mounts
        axios.get("http://localhost:8080/getspecializations") // Replace with your endpoint URL for a single student by ID
          .then(response => {
            setSpecializationArray(response.data);
            //newArray.push(...specializationArray,newSpecialization);
            //setSpecializationArray(newArray);
            //console.log(newArray);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);
  
      //console.log(dataArray);
      const selectedDomainName = dataArray.find(item => item.domain_name === selectedValue)?.domain_name || '';
      let selectedDomain = dataArray.find(item => item.domain_name === selectedDomainName);
      const domain1 = dataArray.find(item => item.domain_name === domain);
      if(selectedDomainName==='')
      selectedDomain=domain1;

      const selectedSpecializationName = specializationArray.find(item => item.specializationName === selectedValueS)?.specializationName || '';
      let selectedSpecialization = specializationArray.find(item => item.specializationName === selectedSpecializationName);
      const specialization1 = specializationArray.find(item => item.specializationName === specialization);
      if(selectedSpecializationName==='')
      selectedSpecialization=specialization1;

      //console.log(selectedDomain);
      
      const handleDropdownChange = (event) => {
        setSelectedValue(event.target.value);
    };
      const handleDropdownSChange = (event) => {
        setSelectedValueS(event.target.value);
    };
  return (
        <div className="student-details">
          <h1>Student Details</h1>
          <div className="student-info">
            <div>
                <form className="form2" onSubmit={handleSubmit}>
                <label>Student ID:</label>
                <input type="number"  value={id} disabled/>
                <p></p>
                <label>Roll Number:</label>
                <input
                type="text"
                id="rollNo"
                value={rollNo}
                min="1"
                onChange={handleRollNoChange}
                />
                <div>
                <label htmlFor="first_name">First Name:</label>
                <input
                type="text"
                id="first_name"
                value={first_name}
                onChange={handleFirstNameChange}
                />
                </div>
                <label htmlFor="last_name">Last Name:</label>
                <input
                type="text"
                id="last_name"
                value={last_name}
                onChange={handleLastNameChange}
                />
                <label htmlFor="email">Email:</label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                />
                <p></p>
                <label htmlFor="cgpa">CGPA:</label>
                <input
                type="number"
                id="cgpa"
                value={cgpa}
                onChange={handleCgpaChange}
                />
                <div>
                <label htmlFor="graduation_year">Graduation Year:</label>
                <input
                type="number"
                id="graduation_year"
                value={graduation_year}
                onChange={handleYearChange}
                />
                </div>
                <div>
                <label htmlFor="admissionYear">Admission Year:</label>
                <input type="number" value={admissionYear} disabled/>
                </div>
                <div>
                <label htmlFor="totalCredits">Total Credits:</label>
                <input
                type="number"
                id="totalCredits"
                value={totalCredits}
                min="1"
                onChange={handleTotalCreditsChange}
                />
                </div>
                <label htmlFor="address">Address:</label>
                <input
                type="text"
                id="address"
                value={address}
                onChange={handleAddressChange}
                />
                <label htmlFor="photoPath">Photograph Path:</label>
                <input
                type="text"
                id="photoPath"
                value={photoPath}
                onChange={handlePhotographPathChange}
                />
                <label>Domain:</label>
                <p>{selectedValue ? selectedDomainName : domain}</p>
                <select value={selectedValue} onChange={handleDropdownChange}>
                  <option value="">Select an option</option>
                {dataArray.map(item => (
                    <option key={item.domain_name} value={item.domain_name}>
                        {item.domain_name}
                    </option>
                ))}
            </select>
            <div>
              <p></p>
            <label>Specialization:</label>
            <p>{selectedValueS ? selectedSpecializationName : specialization}</p>
                <select value={selectedValueS} onChange={handleDropdownSChange}>
                  <option value="">Select an option</option>
                {specializationArray.map(item => (
                    <option key={item.specializationName} value={item.specializationName}>
                        {item.specializationName}
                    </option>
                ))}
            </select>
            </div>
            {showError && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          {errorText}
        </div>
      )}
      {showSuccess && (
        <div style={{ color: 'green', margin: '10px 0' }}>
          Student Details updated.
        </div>
      )}
            <button type="submit">Submit</button>
            </form>
            </div>
        </div>
        <label><img src={photoPath}/></label>
        </div>
      );
    };

export default StudentDetails;