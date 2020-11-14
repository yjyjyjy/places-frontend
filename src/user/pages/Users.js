import React, { Fragment, useEffect, useState } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import UserList from "../components/UserList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const [isLoading, error, sendRequest, clearError] = useHttpClient();

  const fetchUsers = async () => {
    try {
      const responseData = await sendRequest(process.env.REACT_APP_BACKEND_API_URL + "/users");
      if (!!responseData.users) {
        setLoadedUsers(responseData.users);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchUsers();
  },[]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList users={loadedUsers} />}
    </Fragment>
  );
};

export default Users;
