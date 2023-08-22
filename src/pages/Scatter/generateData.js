export const generateGraph = (length = 100, initialStep = 0, scale = 0.02) => {
    const data = { x: [], y: [], z: [] }
    let step = initialStep;

    for (let i = 0; i < length; i++) {
        const y = step * 8000
        const z = Math.random()

        data.x.push(initialStep)
        data.y.push(y)
        data.z.push(z)

        step+= 1
    }


    data.y = data.y.sort((a,b) => a - b)
    data.z = data.z.sort((a,b) => a - b)

    console.log('#', data)
    return data
}

export const generateGraphs = (count = 10, length) => {
    let step = 0
    const result =  new Array(count).fill().map(() => {
        const graph = generateGraph(length, step)
        step = step + 2
        return graph
    })

    console.log('$', result)

    return result
}

