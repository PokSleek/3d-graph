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

  const result = [];

  props.data.forEach(d => {
    console.log(d);
    result.push({
      z: d,
      type: 'surface'
    })
  });

  return result;

  // return [
  //   {
  //     z: props.data[0],
  //     type: 'surface'
  //   }
  // ];
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