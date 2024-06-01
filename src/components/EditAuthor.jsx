import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const EditAuthor = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ editAuthor, result ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  useEffect(() => {
    if (result.data?.editAuthor === null) {
      alert('author not found')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    console.log('edit author...')

    await editAuthor({ variables: { name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }


  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <div>
          <button>update author</button>
        </div>
      </form>
    </div>
  )
}

export default EditAuthor
