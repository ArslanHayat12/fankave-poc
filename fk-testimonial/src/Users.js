import { useEffect } from "react";


function Users() {

    useEffect(() => {
        window.location.search && window.open('', '_self').close();
    }, [window.location.search])

    return (
        "Hello"
    );
}

export default Users;
