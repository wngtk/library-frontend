import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../queries"

const LoginForm = (props) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      props.setToken(result.data.login.value)
      window.localStorage.setItem('library-user-token', result.data.login.value)
    }
  }, [result.data])


  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('login with', name, password)

    await login({ variables: { username: name, password } })

    setName('')
    setPassword('')
  }

  return (
    <div>
      <form>
        <div>
          name
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button onClick={submit}>login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
