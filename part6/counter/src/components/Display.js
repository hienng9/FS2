import { useCounterValue } from '../CounterContext'


const Display = () => {
    const counter = useCounterValue()
    console.log('counter', counter)
    return <div>{ counter }</div>
}
export default Display