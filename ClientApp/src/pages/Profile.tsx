import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [token, setToken] = useState("");
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-r1o3z-ez.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
        setToken(accessToken);

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${
          user?.sub ?? ""
        }`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch {
        console.log("error");
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <>
      {isAuthenticated ? (
        <div>
          <h1>{token}</h1>
          <img src={user?.picture ?? ""} alt={user?.name ?? ""} />
          <h2>{user?.name ?? "name"}</h2>
          <p>{user?.email ?? "email"}</p>
          <h3>User Metadata</h3>
          {userMetadata ? (
            <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
          ) : (
            "No user metadata defined"
          )}
        </div>
      ) : (
        <h1>not authenticated</h1>
      )}
    </>
  );
};

export default Profile;
