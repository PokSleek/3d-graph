

export const generateGraph = (step) => {
  const generatedData = [];

  for (let i = 0; i < 30; i++) {
    const xAxis = [];
    
    for (let j = 0; j < 30; j++) {
      xAxis.push(Math.random() * 50 + (step * 50));
    }
    generatedData.push(xAxis.sort((a, b) => a - b));
  }
  return generatedData
}

export const generateGraphs = (count = 10, length) => {
  let step = 0
  const result =  new Array(count).fill().map(() => {
      const graph = generateGraph(step)
      step++;
      return graph
  })

  console.log('$', result)

  return result
}

