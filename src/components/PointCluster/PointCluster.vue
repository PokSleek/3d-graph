<script setup>
import Plotly from 'plotly.js-dist-min'
import { computed, watch } from 'vue';

const props = defineProps({
  data: Array,
  title: String,
  type: String,
  showscale: Boolean,
  showlegend: Boolean,
  autosize: Boolean,
  width: Number,
  height: Number,
})

const layout = computed(() => {
  console.log('layout-recomputed')

  return ({
    scene: {
      aspectratio: { 
      "x": 2,
      "y": 2,
      "z": 1
      },
    },
    title: props.title,
    showlegend: props.showlegend ?? true,
    autosize: props.autosize ?? true,
    width: props.width,
    height: props.height,
  })
});

const graphsData = computed(() => {
  console.log('graphsData-recomputed')
  console.log(props.data);

  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }

  function unpackHigher(rows, key) {
    return rows.map(function(row) { 
      console.log(row[key])
      return  parseFloat(row[key]) + 20;
    });
  }

  const data = [];

  props.data.forEach(d => {
    data.push({
      x: unpack(d, 'x'),
      y: unpack(d, 'y'),
      z: unpack(d, 'z'),
      mode: 'markers',
      marker: {
        size: 5,
        opacity: 0.8
      },
      type: 'scatter3d'
    });

    data.push({
      alphahull: 5,
      opacity: 0.1,
      type: 'mesh3d',
      x: unpack(d, 'x'),
      y: unpack(d, 'y'),
      z: unpack(d, 'z'),
    });
  });

  return data;

  // return [{
  //   x: unpack(props.data[0], 'x'),
  //   y: unpack(props.data[0], 'y'),
  //   z: unpack(props.data[0], 'z'),
  //   mode: 'markers',
  //   marker: {
  //     size: 5,
  //     opacity: 0.8
  //   },
  //   type: 'scatter3d'
  // },
  // {
  //     alphahull: 20,
  //     opacity: 0.1,
  //     type: 'mesh3d',
  //     x: unpack(props.data[0], 'x'),
  //     y: unpack(props.data[0], 'y'),
  //     z: unpack(props.data[0], 'z'),
  // },
  // // -----
  // {
  //   x: unpack(props.data[0], 'x'),
  //   y: unpackHigher(props.data[0], 'y'),
  //   z: unpack(props.data[0], 'z'),
  //   mode: 'markers',
  //   marker: {
  //     size: 5,
  //     opacity: 0.8
  //   },
  //   type: 'scatter3d'
  // },
  // {
  //     alphahull: 20,
  //     opacity: 0.1,
  //     type: 'mesh3d',
  //     x: unpack(props.data[0], 'x'),
  //     y: unpackHigher(props.data[0], 'y'),
  //     z: unpack(props.data[0], 'z'),
  // },
  // // -----
  // {
  //   x: unpackHigher(props.data[0], 'x'),
  //   y: unpack(props.data[0], 'y'),
  //   z: unpack(props.data[0], 'z'),
  //   mode: 'markers',
  //   marker: {
  //     size: 5,
  //     opacity: 0.8
  //   },
  //   type: 'scatter3d'
  // }, 
  // {
  //     alphahull: 20,
  //     opacity: 0.1,
  //     type: 'mesh3d',
  //     x: unpackHigher(props.data[0], 'x'),
  //     y: unpack(props.data[0], 'y'),
  //     z: unpack(props.data[0], 'z'),
  // },
  // // -----
  // {
  //   x: unpack(props.data[0], 'x'),
  //   y: unpack(props.data[0], 'y'),
  //   z: unpackHigher(props.data[0], 'z'),
  //   mode: 'markers',
  //   marker: {
  //     size: 5,
  //     opacity: 0.8
  //   },
  //   type: 'scatter3d'
  // },
  // {
  //     alphahull: 20,
  //     opacity: 0.1,
  //     type: 'mesh3d',
  //     x: unpack(props.data[0], 'x'),
  //     y: unpack(props.data[0], 'y'),
  //     z: unpackHigher(props.data[0], 'z'),
  // }]
})

console.log('graphsData', graphsData.value)


watch(
  layout,
  () => {
    const graph = Plotly.react('graph-root', graphsData.value, layout.value)
    console.log('relayout', graph)
  }
)

watch(
  graphsData,
  () => {
    const graph = Plotly.react('graph-root', graphsData.value, layout.value)
    console.log('react', graph)
  }
)

// To render it after wrapper rendering
setTimeout(() => {
  const graph = Plotly.react('graph-root', graphsData.value, layout.value)
  console.log('graph', graph)
})
</script>

<template>
    <div id="graph-root">
    </div>
</template>

<style lang="scss" scoped>

</style>