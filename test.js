function isValid(matrix, x, y) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    return x >= 0 && x < numRows && y >= 0 && y < numCols && matrix[x][y] !== 0;
  }
  
  function shortestPath2D(matrix, sourceX, sourceY, targetX, targetY) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
  
    if (!isValid(matrix, sourceX, sourceY) || !isValid(matrix, targetX, targetY)) {
      return null;
    }
  
    const queue = [[sourceX, sourceY, []]];
    const visited = new Set();
  
    while (queue.length > 0) {
      const [x, y, path] = queue.shift();
  
      if (x === targetX && y === targetY) {
        return [...path, [x, y]];
      }
  
      if (visited.has(`${x},${y}`)) {
        continue;
      }
  
      visited.add(`${x},${y}`);
  
      const neighbors = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ];
  
      for (const [nx, ny] of neighbors) {
        if (isValid(matrix, nx, ny) && !visited.has(`${nx},${ny}`)) {
          queue.push([nx, ny, [...path, [x, y]]]);
        }
      }
    }
  
    return null;
  }
  
  // Example usage:
  const matrix = [
    [1, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ];
  
  const sourceX = 0;
  const sourceY = 0;
  const targetX = 3;
  const targetY = 3;
  const shortestPath2DMatrix = shortestPath2D(matrix, sourceX, sourceY, targetX, targetY);
  // console.log("Shortest path in the 2D matrix:", shortestPath2DMatrix);

  let arr=[-1,2,3,45]

  if(-1 in arr){
    // console.log(arr[3])
    console.log(arr[3])
    
  }