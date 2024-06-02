import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from "./queries";
import Recommand from "./components/Recommand";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    if (token) {
      setPage("authors")
    }
  }, [token])

  useEffect(() => {
    const userToken = window.localStorage.getItem('library-user-token')
    setToken(userToken)
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {
          token
          ? <>
              <button onClick={() => setPage("add")}>add book</button>
              <button onClick={() => setPage("recommand")}>recommand</button>
              <button onClick={logout}>logout</button>
            </>
          : <button onClick={() => setPage("login")}>login</button>
        }
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm show={page === "login"} setToken={setToken} />

      <Recommand show={page === "recommand"} />
    </div>
  );
};

export default App;
