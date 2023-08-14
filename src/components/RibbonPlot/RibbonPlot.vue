<script setup>
import Plotly from 'plotly.js-dist-min'
import { computed, watch } from 'vue';

// const {
//   data,
//   type = 'surface',
//   showscale = true,
//   title,
//   showlegend = true,
//   autosize = true,
//   width,
//   height
// } = defineProps({
//   data: Array,
//   title: String,
//   type: String,
//   showscale: Boolean,
//   showlegend: Boolean,
//   autosize: Boolean,
//   width: Number,
//   height: Number,
// })

// TODO: input to update data
// TODO: input to update title
// TODO?: check how update color ?

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

// NOTE: to parse [{x, y, z}] => [{x, y, z, type, showscale ...}] from props
// NOTE: in case when we have to support more then one 3d graph we need to remove graphsData var and define their value in parent side 
const graphsData = computed(() => {
  console.log('graphsData-recomputed')

  return props.data.map((graph) => ({
    ...graph,
    type: props.type ?? 'surface',
    showscale: props.showscale ?? true,
    // cmax: 1.562391435,
    // cmin: 0.888733027,
    // uid: "fef431",
    // name: "",
  }))
})

console.log(graphsData.value)


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