import React from "react";

export default function EditUser({ user, setData, setCurrentUser, data }) {
  const [firstName, setFirstName] = React.useState(user.firstName);
  const [lastName, setLastName] = React.useState(user.lastName);

  const submitHandler = () => {
    let temp = data;
    let i = data.findIndex((i) => {
      return i.id === user.id;
    });
    temp[i] = { id: user.id, firstName: firstName, lastName: lastName };
    setData(temp);
    setCurrentUser(null);
  };
  return (
    <tr>
      <td>
        <input
          type="number"
          min="100000"
          value={user.id}
          disabled
          placeholder="ID"
        />
      </td>
      <td>
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(event) => setFirstName(event.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(event) => setLastName(event.target.value)}
        />
      </td>
      <td>
        <button
          className={firstName && lastName ? "btn" : "btn--disabled"}
          onClick={submitHandler}
          disabled={!(firstName && lastName)}
        >
          Update
        </button>
        <button className="btn" onClick={() => setCurrentUser(null)}>
          Cancel
        </button>
      </td>
    </tr>
  );
}
