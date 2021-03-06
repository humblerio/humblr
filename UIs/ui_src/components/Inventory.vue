<template>
    <div>
        <v-layout row wrap align-center>
            <v-flex md8 class="px-2" v-pre>
                <h1 class="headline">Inventory</h1>
                <p class="body-1 grey--text">Here you can create, update and delete product information, images, and
                    inventories.</p>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md4>
                <v-text-field solo-inverted v-model="search" append-icon="search" class="search-box"
                              @keyup="getProducts(1)"></v-text-field>
            </v-flex>
        </v-layout>
        <v-data-table
                :headers="headers"
                :items="products"
                :pagination.sync="pagination"
                hide-actions
                class="elevation-1"
                disable-initial-sort
                :loading="loading"
        >
            <template slot="items" slot-scope="props">
                <td class="text-xs-center">
                    <v-avatar :tile="false" size="24px" :key="props.item.image_filename">
                        <img alt="avatar" :src="props.item.image_path"/>
                    </v-avatar>
                </td>
                <td>{{ props.item.title | truncate(45) }}</td>
                <td>{{ props.item.description | truncate(35) }}</td>
                <td class="text-xs-right">{{ props.item.price | currency }}</td>
                <td v-if="isNaN(props.item.average_cpu)" class="text-xs-right">{{ props.item.average_cpu }}</td>
                <td v-else class="text-xs-right">{{ props.item.average_cpu | currency }}</td>
                <td class="text-xs-right">{{ props.item.gross_stock }}</td>
                <td class="text-xs-center">
                    <v-btn flat icon color="primary" @click="editProduct(props.item)">
                        <v-icon>edit</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.pager" :length="pagination.pages"/>
        </div>
        <v-btn fab color="accent" fixed right bottom class="mb-5 mr-2" ripple
               @click.native="partials.add.active = true">
            <v-icon>add</v-icon>
        </v-btn>
        <v-dialog v-model="partials.edit.active" persistent max-width="600px">
            <edit-product v-if="partials.edit.active" :active.sync="partials.edit.active"
                          :product.sync="partials.edit.product"/>
        </v-dialog>
        <v-dialog v-model="partials.add.active" persistent max-width="600px">
            <add-product v-if="partials.add.active" :active.sync="partials.add.active"
                         :product.sync="partials.add.product"/>
        </v-dialog>
    </div>
</template>

<script>
    import EditProduct from './InventoryPartials/EditProduct'
    import AddProduct from './InventoryPartials/AddProduct'

    export default {
        name: "inventory",
        data() {
            return {
                products: [],
                headers: [
                    {text: 'Image', value: 'image', align: 'center', sortable: false},
                    {text: 'Product Title', value: 'title', align: 'left', sortable: false},
                    {text: 'Description', value: 'description', align: 'left', sortable: false},
                    {text: 'Price', value: 'price', align: 'right', sortable: false},
                    {text: 'Average C.P.U.', value: 'average_cpu', align: 'right', sortable: false},
                    {text: 'Gross Stock', value: 'stock', align: 'right', sortable: false},
                    {text: 'Edit', value: 'edit', align: 'center', sortable: false},
                ],
                search: String(),
                loading: false,
                pagination: {
                    pager: 1,
                    pages: 0
                },
                partials: {
                    edit: {
                        product: {},
                        active: false
                    },
                    add: {
                        product: {},
                        active: false
                    }
                }
            }
        },
        created() {
            this.getProducts()
        },
        methods: {
            getProducts: _.debounce(function (page) {
                let url = '/api/products'
                this.loading = true

                if (this.search.length > 1) {
                    url += '/' + this.search
                }
                this.pagination.pager = page ? page : this.pagination.pager
                this.$axios.get(url, {
                    params: {
                        page: this.pagination.pager
                    }
                }).then(r => {
                    this.products = r.data.map(p => {
                        if (!p.image_filename) {
                            p.image_filename = 'default.png'
                        }
                        p.image_path = this.$configuration.api_url + 'product_images/' + p.image_filename
                        return p
                    })
                    this.pagination.pages = r.meta.last_page
                    this.pagination.rowsPerPage = r.meta.per_page
                    this.pagination.totalItems = r.meta.total
                    this.loading = false
                }).catch(e => {
                    console.log(e)
                })
            }, 500),
            editProduct(product) {
                this.partials.edit.product = product
                this.partials.edit.active = true
            }
        },
        watch: {
            'pagination.pager': function () {
                this.getProducts()
            },
            'partials.edit.active': function () {
                if (this.partials.edit.active === false) {
                    this.getProducts()
                }
            },
            'partials.add.active': function () {
                if (this.partials.add.active === false) {
                    this.getProducts()
                }
            }
        },
        components: {
            EditProduct,
            AddProduct
        }
    }
</script>