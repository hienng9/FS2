
import Display from './components/Display'
import Button from './components/Button'

const App = () => {
    return (
        <div>
            <h1>Counter</h1>
            <Display/>
            <div>
                <Button type='INC' label='+' />
                <Button type='DEC' label='-' />
                <Button type='ZERO' label='0' />
            </div>
        </div>
    )
}
export default App