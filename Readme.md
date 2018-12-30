# React right-click menu

A simple context menu component for React. Adds the menu to the parent node

## Installation

````
yarn add react-rightclickmenu
````

## Usage

````
import ContextMenu from 'react-rightclickmenu'

const App = () => {
  return (
    <div>
      <ContextMenu>
        <a>Any component here</a>
      </ContextMenu>
    </div>
  )
}
````

## Caveats to note

1. Does not support nesting
2. Menu is always added to the parent node