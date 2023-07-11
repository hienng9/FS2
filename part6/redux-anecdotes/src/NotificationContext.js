import { useReducer, createContext, useContext } from "react";

const notificationReducer = (state, action) => {
    console.log('action', action)
    console.log('state', state)
    switch(action.type) {
        case 'CREATE':
            return action.payload
        case 'REMOVE':
            return ""
        default:
            return state
    }
}

const NoficationContext = createContext()

export const NotficationContextProvider = ({ children }) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')
    console.log("children", children)
    return (
        <NoficationContext.Provider value={[notification, notificationDispatch]}>
            {children}
        </NoficationContext.Provider>

    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NoficationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NoficationContext)
    return notificationAndDispatch[1]
}

export const createAndRemoveNotiDispatch = () => {
    return async (notification) => {
        await useNotificationDispatch({type: 'CREATE', payload: notification})
        setTimeout(() => useNotificationDispatch({type: 'REMOVE'}), 5000)
    }
}
export default NoficationContext