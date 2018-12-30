import React from 'react'
import ReactDOM from 'react-dom'
import ContextMenu from 'react-rightclickmenu'

const App = () => {
  return (
    <div style={{padding: 20, height: 300, background: 'grey'}}>
      <ContextMenu>
        <div>Hey from contextmenu</div>
      </ContextMenu>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)