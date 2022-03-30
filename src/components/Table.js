import React, { useState } from "react";
import EditUser from "./EditUser";

const DUMMY_DATA = [
  { id: "1", firstName: "Amit", lastName: "Marciano" },
  { id: "2", firstName: "Bill", lastName: "Gates" },
  { id: "3", firstName: "Elon", lastName: "Musk" },
  { id: "4", firstName: "Mark", lastName: "Zuckerberg" },
  { id: "5", firstName: "Auto", lastName: "Tech" }, 
];

export default function Table() {
  const [data, setData] = useState(DUMMY_DATA);
  const [enteredId, setEnteredId] = useState("");
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [createUserToggle, setCreateUserToggle] = useState(false);

  const deleteHandler = (id) => {
    let temp = data.filter((item) => item.id !== id);
    setData(temp);
  };

  const toggleHandler = () => {
    setCreateUserToggle(!createUserToggle);
  };

  const submitHandler = () => {
    if (!data.some((item) => item.id === enteredId)) {
      setData([
        ...data,
        {
          id: enteredId,
          firstName: enteredFirstName,
          lastName: enteredLastName,
        },
      ]);
      setEnteredId("");
      setEnteredFirstName("");
      setEnteredLastName("");
    } else {
      window.alert("You cannot create user with the same ID");
    }
  };
  const cancelHandler = () => {
    setCreateUserToggle(false);
    setEnteredId("");
    setEnteredFirstName("");
    setEnteredLastName("");
  };

  const inputNumberValidationHandler = (e) => {
    !/[0-9]/.test(e.key) && e.preventDefault();
  };
  const inputTextValidationHandler = (e) => {
    !/[A-Za-z]/.test(e.key) && e.preventDefault();
  };



  return (
    <>
      <h1>{currentUser ? "EDIT USER" : "USERS"}</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUser ? (
            <EditUser
              user={currentUser}
              data={data}
              setCurrentUser={setCurrentUser}
              setData={setData}
            />
          ) : (
            <>
              {data.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>{row.id} </td>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => {
                          setCurrentUser(data[index]);
                        }}
                      >
                        Edit User
                      </button>
                      <button
                        className="btn"
                        onClick={() => deleteHandler(row.id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}

              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  {!createUserToggle && (
                    <button className="btn--add" onClick={toggleHandler}>
                      + Add User
                    </button>
                  )}
                </td>
              </tr>

              {createUserToggle && (
                <tr className="focused">
                  <td>
                    <input
                      id="idNumber"
                      type="number"
                      min="1"
                      value={enteredId}
                      onKeyPress={inputNumberValidationHandler}
                      placeholder="ID"
                      onChange={(e) => setEnteredId(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={enteredFirstName}
                      placeholder="First Name"
                      onKeyPress={inputTextValidationHandler}
                      onChange={(event) =>
                        setEnteredFirstName(event.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={enteredLastName}
                      onKeyPress={inputTextValidationHandler}
                      placeholder="Last Name"
                      onChange={(event) =>
                        setEnteredLastName(event.target.value)
                      }
                    />
                  </td>
                  <td>
                    {
                      <button
                        className={
                          enteredId && enteredFirstName && enteredLastName
                            ? "btn"
                            : "btn--disabled"
                        }
                        onClick={submitHandler}
                        disabled={
                          !(enteredId && enteredFirstName && enteredLastName)
                        }
                      >
                        Create User
                      </button>
                    }
                    {
                      <button className="btn" onClick={cancelHandler}>
                        Cancel
                      </button>
                    }
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </>
  );
}
