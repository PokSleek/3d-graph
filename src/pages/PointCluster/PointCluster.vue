<script setup>
import { ref } from 'vue';
import Graph3d from '../../components/Graph3d/Graph3d.vue';
import PointCluster from '../../components/PointCluster/PointCluster.vue'
import { generateGraphs } from './generateData'

console.log(generateGraphs())

const titleInput = ref('Graph Title')
const prevGraphCount = ref(5)
const graphsCount = ref(5)
const title = ref(titleInput.value)
const data = ref(generateGraphs(+graphsCount.value))

const onUpdate = () => {
    title.value = titleInput.value

    if (prevGraphCount.value !== graphsCount.value) {
        prevGraphCount.value = graphsCount.value
        data.value = generateGraphs(+graphsCount.value)
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
        <div class="graph">
            <PointCluster
                :data="data"
                :title="title"
                :width="1000"
                :height="700"
            />

            
            <!-- <Graph3d /> -->
        </div>

    </main>
</template>

<style lang="scss" scoped>
.main-content {
    padding: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.graph {
    display: flex;
    justify-content: center;
}

.controll-panel {
    display: flex;
    gap: 1rem;
}
</style>