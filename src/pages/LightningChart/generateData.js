export const generateGraph = (length = 100, initialStep = 0, scale = 0.02) => {
    const data = []
    let step = 0;

    
    let yArr = new Array(length);
    for (let i = 0; i < length; i++) {
        yArr[i] = Math.random();
    }
    yArr = yArr.sort((a, b) => a - b);

    for (let i = 0; i < length; i++) {
        const z = step * 8000
        const y = yArr[i];

        data.push({
            x: initialStep,
            y: y,
            z: z,
        })

        step+= 1
    }

    return data
}

export const generateGraphs = (count = 10, length) => {
    let step = 0
    const result =  new Array(count).fill().map(() => {
        const graph = generateGraph(length, step)
        step = step + 2
        return graph
    })

    return result
}

