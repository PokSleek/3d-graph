export const generateGraph = (length = 30, initialStep = 0, scale = 0.02) => {
    const data = { x: [], y: [], z: [] }

    for (let i = 0; i < length; i++) {
        const y = Math.random() * 8000
        const z = Math.random()

        data.x.push([initialStep, initialStep + 0.5])
        data.y.push([y, y])
        data.z.push([z, z])
    }



    data.y = data.y.sort((a,b) => a[0] - b[0])
    // data.z = data.z.sort((a,b) => a[0] - b[0])

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

