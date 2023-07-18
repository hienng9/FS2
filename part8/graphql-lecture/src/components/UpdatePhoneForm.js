import { useMutation } from "@apollo/client"
import { ALL_PERSONS, UPDATE_PHONE } from "../queries/queries"
import useField from "../useField"
import { useEffect } from "react"

const UpdatePhoneForm = ({ setError }) => {
  const [nameReset, name] = useField("text")
  const [phoneReset, phone] = useField("text")

  const [updatePhone, result] = useMutation(UPDATE_PHONE, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      const message = error.graphQLErrors[0].message
      setError(message)
    },
  })

  useEffect(() => {
    if (result.data && result.data.editPhone === null) {
      setError("person not found")
    }
  }, [result.data]) //esling-disable-line
  const handlePhoneUpdate = (event) => {
    event.preventDefault()
    updatePhone({ variables: { name: name.value, phone: phone.value } })
    nameReset()
    phoneReset()
  }
  return (
    <div>
      <h2>Phone Update</h2>
      <form onSubmit={handlePhoneUpdate}>
        <div>
          Name: <input {...name} />
        </div>
        <div>
          Phone: <input {...phone} />
        </div>
        <button type="submit">update</button>
      </form>
    </div>
  )
}

export default UpdatePhoneForm
