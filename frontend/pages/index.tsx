import useAlloyHooks from "../useAlloyHooks";

const Home = () => {
  const {
    getToken,
    createUser,
    userId,
    token,
    integrations,
    getIntegrations,
    showModal,
  } = useAlloyHooks();
  return (
    <div>
      <h1>Step 1: Create a user</h1>
      <button onClick={createUser}>Create a User</button>
      <p>UserID: {userId && userId}</p>
      <h1>Step 2: Generating Short-Lived JWT</h1>
      <button onClick={getToken}>Generate JWT</button>
      <p>{token ? "Token successfully generated." : ""}</p>

      <h1>Step 3: Get all Integrations</h1>
      <button onClick={getIntegrations}>List Integrations</button>

      {integrations?.length > 0 &&
        integrations.map((integration) => (
          <div key={integration.id}>
            <p style={{ fontWeight: "bold" }}>{integration.app}</p>
            <button onClick={() => showModal(integration.integrationId)}>
              Install {integration.app}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Home;
