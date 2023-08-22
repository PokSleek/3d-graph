

import data from './data'

export const generateGraph = (step) => {
  const generatedData = [];

  for (let i = 0; i < 30; i++) {

    const multiplier = Math.floor(step / 4);
    console.log(multiplier);

    if (step % 4 === 0) {
      generatedData.push({
        x: (Math.random() + multiplier) * 5,
        y: (Math.random() + multiplier) * 5,
        z: (Math.random() + multiplier) * 5,
      });
    }
    if (step % 4 === 1) {
      generatedData.push({
        x: (Math.random() + multiplier + 1) * 5,
        y: (Math.random() + multiplier) * 5,
        z: (Math.random() + multiplier) * 5,
      });
    }
    if (step % 4 === 2) {
      generatedData.push({
        x: (Math.random() + multiplier) * 5,
        y: (Math.random() + multiplier + 1) * 5,
        z: (Math.random() + multiplier) * 5,
      });
    }
    if (step % 4 === 3) {
      generatedData.push({
        x: (Math.random() + multiplier) * 5,
        y: (Math.random() + multiplier) * 5,
        z: (Math.random() + multiplier + 1) * 5,
      });
    }
  }

  console.log(generatedData);
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

