<template>
  <div class="flexgrid-demo p-p-2">
      ----- Problem 1 - добиться перемещения из листа в лист при перемещении
    <div class="p-grid">
      <div class="p-col">

        <div class="box">
          <h3>Draggable 1</h3>

          <draggable
            class="dragArea list-group"
            :list="list1"
            :clone="clone"
            :group="{ name: 'people', pull: pullFunction }"
            @start="start"
            item-key="id"
            @change="dragChange"
            :move="move"
            data-list-id="1"
          >
            <template #item="{ element }">
              <div class="list-group-item">
                <div style="border:2px solid; margin-top:10px; padding:10px">
                  {{ element.name }} sort is:{{element.sort}} list is:{{ element.list }}
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <div class="p-col">
        <div class="box">
          <h3>Draggable 2</h3>
          <draggable
            class="dragArea list-group"
            :list="list2"
            @start="start"
            group="people"
            item-key="id"
            @change="dragChange"
            :move="move"
            @added="added"
            data-list-id="2"
          >
            <template #item="{ element }">
              <div class="list-group-item">
                <div style="border:2px solid; margin-top:10px; padding:10px">
                    {{ element.name }} sort is:{{element.sort}} list is:{{ element.list }}
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
    ---- Проблема 2 пагинация

      <div>
          <DataTable

                  :value="allUsers"
                  class="p-datatable-striped"
                  paginator
                  :rows="10"
                  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                  :rowsPerPageOptions="[2, 3, 50]"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          >
              <Column field="node.name" header="Name">{{node}} </Column>
              <Column field="node.id" header="UUID">{{node}}</Column>
              <template #paginatorLeft>
                  <Button type="button" icon="pi pi-refresh" class="p-button-text" />
              </template>
              <template #paginatorRight>
                  <Button type="button" icon="pi pi-cloud" class="p-button-text" />
              </template>
          </DataTable>
      </div>
      -- Проблема 3 gql импорт (схемы кверисов, мутаций)
      -- Проблема 4 Linters
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { defineComponent } from "vue";

import { gql } from "@apollo/client/core";
// TODO импорт схем из файлов
// import { allUsers } from "../graphql"
// import apolloClient from "../main";
// import { defineComponent, reactive, ref } from "vue"

// TODO перейти на composition api
// export default defineComponent({
//     components:{draggable},
//     setup() {
//         const list1 = reactive([
//             { name: "Jesus", id: 1, list:1, uuid: "ffcc4608-3b1b-11ec-8d3d-0242ac130003" },
//             { name: "Paul", id: 2, list:1, uuid: "0649fe6c-3b1c-11ec-8d3d-0242ac130003" },
//             { name: "Peter", id: 3, list:1, uuid: "0e81b8e0-3b1c-11ec-8d3d-0242ac130003" }
//             ])
//         const list2 = reactive([
//             { name: "Luc", id: 5, list:2, uuid: "15314048-3b1c-11ec-8d3d-0242ac130003" },
//             { name: "Thomas", id: 6, list:2, uuid: "1a4df63e-3b1c-11ec-8d3d-0242ac130003" },
//             { name: "John", id: 7, list:2, uuid: "20ac6baa-3b1c-11ec-8d3d-0242ac130003" }
//         ])
//         const controlOnStart = ref(true)
//         let idGlobal = 8;
//
//         const  clone = ({name, id, uuid, list}) => {
//             console.log('clone', name, id, list, idGlobal++)
//             return {name, id: id, list, uuid, 'globalId': idGlobal};
//         };
//
//         const pullFunction = (item) => {
//             console.log('pullIs', item);
//             return this.controlOnStart ? "clone" : true;
//         };
//         const start = ({originalEvent}) => {
//             console.log("start")
//             this.controlOnStart = originalEvent.ctrlKey;
//         };
//         const move = (evt, originalEvent) => {
//             console.log("move1", evt, originalEvent, );
//         };
//         const dragChange = (evt) => {
//             console.log("move", evt, this.list1, this.list2)
//         }
//
//         return {
//             list1,
//             list2,
//             controlOnStart,
//             clone,
//             pullFunction,
//             start,
//             move,
//             dragChange
//         }
//
//
//
//
//     }
//
// })

let idGlobal = 20;
export default defineComponent({
  name: "clone-on-control",
  display: "Clone on Control",
  instruction: "Press Ctrl to clone element from list 1",
  order: 20,
  components: {
    draggable
  },
  data() {
    return {
        sourceList: null,
        targetList: null,
        oldStateList: null,
        idWork: null,
        stack: [],



      list1: [
        {
          name: "USER1",
          sort: 1,
          id: 1,
          stage: 1,
          uuid: "ffcc4608-3b1b-11ec-8d3d-0242ac130003"
        },
        {
          name: "USER2",
            sort: 2,
          id: 2,
            stage: 1,
          uuid: "0649fe6c-3b1c-11ec-8d3d-0242ac130003"
        },
        {
          name: "USER3",
            sort:3,
          id: 3,
            stage: 1,
          uuid: "0e81b8e0-3b1c-11ec-8d3d-0242ac130003"
        },
          {
              name: "USER11",
              sort: 4,
              id: 4,
              stage: 1,
              uuid: "ffcc4608-3b1b-11ec-8d3d-0242ac130003"
          },
          {
              name: "USER22",
              sort: 5,
              id: 5,
              stage: 1,
              uuid: "0649fe6c-3b1c-11ec-8d3d-0242ac130003"
          },
          {
              name: "USER66",
              sort:6,
              id: 6,
              stage: 1,
              uuid: "0e81b8e0-3b1c-11ec-8d3d-0242ac130003"
          },


      ],
      list2: [
        {
          name: "USER4",
            sort: 1,
          id: 5,
            stage: 2,

          uuid: "15314048-3b1c-11ec-8d3d-0242ac130003"
        },
        {
          name: "USER5",
            sort:2,
          id: 6,
            stage: 2,
          uuid: "1a4df63e-3b1c-11ec-8d3d-0242ac130003"
        },
        {
          name: "USER6",
            sort: 3,
          id: 7,
            stage: 2,
          uuid: "20ac6baa-3b1c-11ec-8d3d-0242ac130003"
        }
      ],
        // x: allUsers,

      controlOnStart: true,
        allUsers: null,
        cars: [
            { brand: "Volkswagen", year: 2012, color: "Orange", vin: "dsad231ff" },
            { brand: "Audi", year: 2011, color: "Black", vin: "gwregre345" },
            { brand: "Renault", year: 2005, color: "Gray", vin: "h354htr" },
        ]
    };
  },

  apollo: {
    allUsers: {
        query: gql`
        query allUsers($before: String, $after: String, $first:Int, $last: Int) {
          allUsers(before: $before, after:$after, first: $first, last: $last) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            edges {
              node {
                id
                createdOn
                updatedOn
                name
                email
              }
            }
          }
        }`,
        variables() {
            return {
                first:3
            }

        },
        // query: allUsers,
        update(data) {
            console.log('dddd', data)
            this.allUsers = data?.allUsers?.edges
            return this.allUsers
        },
    }
  },

  mounted() {
    console.log("sss");
    // TODO SmartQuery
    // const query = gql`
    //   query allUsers {
    //     allUsers(first: 3) {
    //       pageInfo {
    //         hasNextPage
    //         hasPreviousPage
    //         startCursor
    //         endCursor
    //       }
    //       edges {
    //         node {
    //           id
    //           createdOn
    //           updatedOn
    //           name
    //           email
    //         }
    //       }
    //     }
    //   }
    // `;
    //
    // apolloClient
    //     .query({
    //         query
    //     })
    //     .then(res => console.log('query is', res.json));
  },
  // TODO do not work
  watched: {
    list1(value, oldValue) {
      console.log("watcher", value, oldValue);
    }
  },

  methods: {
    clone({ name, id, uuid, sort , stage,  }) {
      console.log("CLONE", name, id, stage, idGlobal++);
      return { name, sort, id: id,  stage,  uuid,  globalId: idGlobal };
    },
    pullFunction() {
      // console.log("pullIs", item);
      return this.controlOnStart ? "clone" : true;
    },
    start({ originalEvent }) {
      console.log("start", this.sourceList, this.targetList);
      this.controlOnStart = originalEvent.ctrlKey;
    },
    move(evt, originalEvent) {

        try{
            this.sourceList = evt.draggedContext.element.stage;
            this.targetList = evt.relatedContext.element.stage;

            // this["list"+ sourceList].splice(evt.draggedContext.index,1, {...evt.draggedContext.element, list: targetList});


            console.log("Moving from :::", evt.draggedContext, evt.relatedContext);
            console.log("move1", evt, originalEvent);
            console.log('sourceList', this.sourceList)
            console.log('targetList', this.targetList)
        }
        catch(e){
            console.log('Error', e)
        }



    },
    dragChange(evt,  ) {
      console.log("FIRST Change!!!!", evt, this.list1, this.list2);
      if(evt?.added){
          console.log('Added', evt)
          // определяем uuid - надо будет сверится после того как найдем sort
          // const id = evt.added.element.uuid
          // опрелеляем sort
          // const sort = evt.added.element.sort
          // убираем из sourceList элемент по id
          this["list"+this.targetList].map((item, index) => {
              console.log('Item', item, index+1)
              if(item.index !== index+1){
                  item.sort=index+1;
                  item.stage=this.targetList
                  item.stack.push(item.id)
              }

          })
          console.log('finally Added', this["list"+this.targetList])
          // TODO запрос и обнуление стака


      }
      if(evt?.removed){
          console.log('Remove', evt)
          console.log('Evt', this.list1)
          this["list"+this.sourceList].map((item, index) => {
              console.log('Item', item, index+1)
              if(item.index !== index+1) {
                  item.sort=index+1
                }
          })
          console.log('finally Removed', this["list"+this.sourceList])
      }

      if(evt?.moved){
          console.log('Moved', evt)
          const oldIndex = evt.moved.oldIndex
          const newIndex = evt.moved.newIndex
          console.log('LOGS', oldIndex, newIndex)
          console.log('Evt', this.list1)
          this["list"+this.sourceList].map((item, index) => {
              console.log('Item', item, index+1)
              if(item.index !== index+1){
                  item.sort=index+1
                  this.stack.push(item.id)
              }
             //TODO запрос и обнусление стака
          })
          console.log('finally', this["list"+this.sourceList])


      }


    },
    tryMethos() {
      console.log("dsfrefs");
    }
  }
});
</script>
<style scoped></style>