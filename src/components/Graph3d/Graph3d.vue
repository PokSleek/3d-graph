<script setup>
import Plotly from 'plotly.js-dist-min'
import { rows } from './data'

function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

const z_data=[ ]

for(let i=0; i<24; i++) {
  z_data.push(unpack(rows,i));
}

console.log('rows', rows)
console.log('z_data', z_data)

const data = [{
  z: z_data,
  type: 'surface',
  contours: {
    z: {
      show: true,
      usecolormap: true,
      highlightcolor: "#42f462",
      project: {z: true}
    }
  }
}];

const layout = {
  title: '3D Graph example',
  autosize: true,
  width: 500,
  height: 500,
  margin: {
    l: 65,
    r: 50,
    b: 65,
    t: 90,
  }
};

// To render it after wrapper rendering
setTimeout(() => {
    Plotly.newPlot('graph-root', data, layout);
})

</script>

<template>
    <div id="graph-root">

    </div>
</template>

<style lang="scss" scoped>

</style>