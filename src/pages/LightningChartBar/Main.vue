<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import { lightningChart, Themes } from "@arction/lcjs";
import { generateGraphs } from './generateData';


const prevGraphCount = ref(5)
const titleInput = ref('Graph Title')
const graphsCount = ref(5)
const title = ref(titleInput.value)
const data = ref(generateGraphs(+graphsCount.value))
const timeStamp = ref(Date.now());
let seriesArr = [];
let chart = null;

onMounted(() => {
  const container = document.getElementById("LC3d");
  chart = lightningChart().Chart3D({ container, theme: Themes.light });
  chart.getDefaultAxisX().setInterval({ start: 0, end: (+graphsCount.value * 2) });
  // chart.getDefaultAxisY().setInterval({ start: 0, end: 100 });
  chart.getDefaultAxisZ().setInterval({ start: 0, end: (+graphsCount.value * 2) });

  const data = ref(generateGraphs(+graphsCount.value, +graphsCount.value))

  data.value.forEach(element => {
    const series = chart.addBoxSeries()
    
    const values = []
    element.forEach(e => {
      values.push(
        { 
          xCenter: e.x + 1,
          yCenter: e.y / 2,
          zCenter: e.z + 1,
          xSize: 1,
          ySize: e.y,
          zSize: 1,
        },
      )
    })

    series.invalidateData(values)
    seriesArr.push(series)
  });


  const legend = chart
    .addLegendBox()
    // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
    .setAutoDispose({
        type: 'max-width',
        maxWidth: 0.3,
    })
    .add(chart)
})

onBeforeUnmount(() => {
  chart.dispose()
  seriesArr = [];
})

const onUpdate = () => {
    title.value = titleInput.value
    chart.setTitle(title.value)

    if (prevGraphCount.value !== graphsCount.value) {
        prevGraphCount.value = graphsCount.value
        
        seriesArr.forEach((ser) => {
          ser.dispose()
          seriesArr = [];
        })
        
        chart.getDefaultAxisX().setInterval({ start: 0, end: (+graphsCount.value * 2) });
        chart.getDefaultAxisZ().setInterval({ start: 0, end: (+graphsCount.value * 2) });

        const data = ref(generateGraphs(+graphsCount.value, +graphsCount.value))

        data.value.forEach((element, i) => {
          const values = []
          element.forEach(e => {
            values.push(
              { 
                xCenter: e.x + 1,
                yCenter: e.y / 2,
                zCenter: e.z + 1,
                xSize: 1,
                ySize: e.y,
                zSize: 1,
              },
            )
          })

          const series = chart.addBoxSeries()
          seriesArr[i] = series;
          series.invalidateData(values)
        });


        const legend = chart
          .addLegendBox()
          // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
          .setAutoDispose({
              type: 'max-width',
              maxWidth: 0.3,
          })
          .add(chart)
    }
}
</script>

<template>
    <main class="main-content">
      <div class="controll-panel">
            <va-input
                v-model="titleInput"
                label="title"
            />
            <va-input
                type="number"
                v-model="graphsCount"
                label="graphs count"
            />
            <va-button
                :onclick="onUpdate"
            >
                Update
            </va-button>
      </div>
      <div 
          style="
            width: 1000px;
            height: 800px;
          ">
        <div
          :key="timeStamp"
          style="
            width: 100%;
            height: 100%;
          " 
          id="LC3d"
        ></div>
      </div>
    </main>
</template>

<style lang="scss" scoped>
.main-content {
    padding: 1rem;
    height: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
}

.main-content {
  height: 100%;
  width: 100%;
}

.graph {
    display: flex;
    justify-content: center;
}

.controll-panel {
    display: flex;
    align-items: start;
    gap: 1rem;
}
</style>