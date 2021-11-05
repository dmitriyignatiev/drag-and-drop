
<template>
    <div class="flexgrid-demo p-p-2">
        <h5>Basic</h5>
        <div class="p-grid">
            <div class="p-col">
                <div class="box">1</div>
            </div>
            <div class="p-col">
                <div class="box">2</div>
            </div>
            <div class="p-col">
                <div class="box">3</div>
            </div>
        </div>

        <h5>Dynamic</h5>
        <Button type="button" icon="pi pi-plus" title="Add Column" @click="addColumn" :disabled="columns.length === 20" style="margin-right: .5em" />
        <Button type="button" icon="pi pi-minus" title="Remove Column" @click="removeColumn" :disabled="columns.length === 1" />

        <div style="margin-top: .5em">
            <transition-group name="dynamic-box" tag="div" class="p-grid">
                <div v-for="col of columns" :key="col" class="p-col">
                    <div class="box">{{col}}</div>
                </div>
            </transition-group>
        </div>




    </div>
</template>

<script>
    import { ref } from 'vue';

    export default {
        setup() {
            const columns = ref([0, 1, 2, 3, 4, 5]);
            const addColumn = () => {
                columns.value = [...columns.value, columns.value.length];
            };
            const removeColumn = () => {
                columns.value.pop();
            };

            return { columns, addColumn, removeColumn }
        }
    }
</script>

<style lang="scss">
    .flexgrid-demo {
        background-color: var(--surface-b);
        color: var(--text-color);

        .box {
            background-color: var(--surface-e);
            text-align: center;
            padding-top: 1rem;
            padding-bottom: 1rem;
            border-radius: 4px;
            box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        }

        .box-stretched {
            height: 100%;
        }

        .vertical-container {
            margin: 0;
            height: 200px;
            background: var(--surface-d);
            border-radius: 4px;
        }

        .nested-grid .p-col-4 {
            padding-bottom: 1rem;
        }

        .dynamic-box-enter-active, .dynamic-box-leave-active {
            transition: all .5s;
        }

        .dynamic-box-enter, .dynamic-box-leave-to {
            opacity: 0;
        }

        .dynamic-box-enter, .dynamic-box-leave-to {
            transform: translateX(30px);
        }

        p {
            margin: 0;
        }
    }
</style>

