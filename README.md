# react-gridlines
A grid lines background. Gridlines is a configurable React component.

![Grid lines screenshot](https://raw.githubusercontent.com/alfed7/gridlines/master/docs/images/gridlines.png "Grid lines screenshot")

# Install
```
npm i -s react-gridlines
```
or
```
yarn add react-gridlines
```

# Sample

```javascript
import React from 'react';
import GridLines from 'react-gridlines';
import './App.css';

function App() {
  return (
    <div className="App">
      <GridLines className="grid-area" cellWidth={60} strokeWidth={2} cellWidth2={12}>
        <h1>Gridlines demo</h1>
      </GridLines>
    </div>
  );
}

export default App;
```

# Supported properties

```
component - replace <div> with another element
cellWidth - width of the primary cell
cellHeight - height of the primary cell, equals to cellWidth if not provided
lineColor - color of the primary cell
strokeWidth - line weight of the primary cell
dashArray - line pattern of the primary cell ("3 1" --- - --- - --- - ---)
cellWidth2
cellHeight2
lineColor2
strokeWidth2
dashArray2
```

## License
[MIT](https://couto.mit-license.org/)