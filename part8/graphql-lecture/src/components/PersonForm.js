import { useMutation } from "@apollo/client"
import useField from "../useField"
import { CREATE_PERSON, ALL_PERSONS } from "../queries/queries"

const PersonForm = ({ setError }) => {
  const [nameReset, name] = useField("text")
  const [phoneReset, phone] = useField("text")
  const [streetReset, street] = useField("text")
  const [cityReset, city] = useField("text")
  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      console.log("error", error)
      const message = error.graphQLErrors[0].message
      setError(message)
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
          allPersons: allPersons.concat(response.data.addPerson),
        }
      })
    },
  })
  const handleCreatePerson = (event) => {
    event.preventDefault()

    createPerson({
      variables: {
        name: name.value,
        phone: phone.value.length > 0 ? phone.value : undefined,
        street: street.value,
        city: city.value,
      },
    })
    nameReset()
    phoneReset()
    streetReset()
    cityReset()
  }
  return (
    <div>
      <h2>CREATE NEW CONTACT</h2>
      <form onSubmit={handleCreatePerson}>
        <div>
          name: <input {...name} />
        </div>
        <div>
          phone: <input {...phone} />
        </div>
        <div>
          street: <input {...street} />
        </div>
        <div>
          city: <input {...city} />
        </div>
        <button type="submit">creat</button>
      </form>
    </div>
  )
}

export default PersonForm
