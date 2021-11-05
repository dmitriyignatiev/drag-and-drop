import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ToastService from "primevue/toastservice";
import Password from 'primevue/password';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';

import { ApolloClient, InMemoryCache} from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

import "primeflex/primeflex.css";
import 'primevue/resources/themes/saga-blue/theme.css'      //theme
import 'primevue/resources/primevue.min.css'               //core css
import 'primeicons/primeicons.css'                          //icons



const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService)

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Toast', Toast);
app.component('Password', Password)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)



const link = 'http://localhost:5001/graphql';
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent)

// Create the apollo client
const apolloClient = new ApolloClient({
    uri:link,
    cache: new InMemoryCache(),
    connectToDevTools: true,
})


// Create a provider
const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})


export default apolloClient

app.use(apolloProvider)

app.mount("#app");