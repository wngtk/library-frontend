import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

import Select from 'react-select';

const EditAuthor = ({ authors }) => {
  const [name, setName] = useState(null)
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

    await editAuthor({ variables: { name: name.value, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }


  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          defaultValue={name}
          onChange={setName}
          options={authors.map(a => ({ value: a.name, label: a.name }))}
        />
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
