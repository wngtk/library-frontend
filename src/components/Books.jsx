const Books = (props) => {
  const filter = props.filter
  const setFilter = props.setFilter
  const genres = props.genres

  if (!props.show || props.loading) {
    return null
  }

  const books = props.books

  return (
    <div>
      <h2>books</h2>

      {filter
        ? <p>in genre <span style={{fontWeight: "bold"}}>{filter}</span></p>
        : <p>in all genres</p>
      }

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre, idx) => {
          return <button key={idx} onClick={() => setFilter(genre)}>{genre}</button>
        })}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
