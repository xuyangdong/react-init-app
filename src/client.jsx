import React from 'react';
import {Provider} from 'react-redux'
import {createMyStore} from './store'
import reducer from './reducer'
import routes from './routes'

const store = createMyStore(reducer)

export default class WrapperComponent extends React.Component {
    render() {
        return (
            <Provider store={store}>{routes}</Provider>
        )
    }
}
