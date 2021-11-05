<template>


    <div class="p-grid">
        <div class="p-col">1</div>
        <div class="p-col">2</div>
        <div class="p-col">3</div>
    </div>



</template>



<script>
    import { defineComponent, ref, onMounted } from "vue";
    import { useToast } from 'primevue/usetoast'
    import ProductService from "../service/ProductService"


    export default defineComponent({
        setup() {
            const toast = useToast();
            const text = ref('Prime');
            const feedback = false
            const products = ref();
            const productService = ref(new ProductService());

            onMounted(() => {
                products.value = productService.value.getProductsSmall()
                console.log('rpxy, ', products.value)
            })



            const greet = () =>{
                toast.add({severity: 'info', summary: 'Hello', detail: text})
            }

            return {
                text,
                feedback,
                products, productService,
                greet
            }
        }
    })

</script>



<style lang="scss">

</style>

