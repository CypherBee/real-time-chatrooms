import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
    const { logout, loading } = useLogout();

    return (
        <div className="mt-auto" style={{ padding: "8px" }}>
            {!loading ? (
                <button onClick={logout} className="btn btn-neutral">
                    Logout
                </button>
            ) : (
                <span className="loading loading-spinner"></span>
            )}
        </div>
    );
};
export default LogoutButton;
