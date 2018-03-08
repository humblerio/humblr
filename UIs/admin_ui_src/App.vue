<template>
    <v-app dark toolbar>
        <template v-if="!$route.meta.public">
            <v-navigation-drawer fixed clipped v-model="drawer" app>
                <h3 class="ml-3 mt-3">Quick Links</h3>
                <v-divider></v-divider>
                <v-list>
                    <v-list-tile v-for="(item, i) in quick_links" :key="i" exact :href="item.href">
                        <v-list-tile-action>
                            <v-icon color="primary" v-html="item.icon"></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="links">
                                <router-link :to="item.href">{{item.title}}</router-link>
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <h3 class="ml-3">Assets</h3>
                <v-divider></v-divider>
                <v-list>
                    <v-list-tile v-for="(item, i) in assets" :key="i" exact :href="item.href">
                        <v-list-tile-action>
                            <v-icon color="primary" v-html="item.icon"></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="links">
                                <router-link :to="item.href">{{item.title}}</router-link>
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <h3 class="ml-3">Logistics</h3>
                <v-divider></v-divider>
                <v-list>
                    <v-list-tile v-for="(item, i) in logistics" :key="i" exact :href="item.href">
                        <v-list-tile-action>
                            <v-icon color="primary" v-html="item.icon"></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="links">
                                <router-link :to="item.href">{{item.title}}</router-link>
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <h3 class="ml-3">Marketing</h3>
                <v-divider></v-divider>
                <v-list>
                    <v-list-tile v-for="(item, i) in marketing" :key="i" exact :href="item.href">
                        <v-list-tile-action>
                            <v-icon color="primary" v-html="item.icon"></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="links">
                                <router-link :to="item.href">{{item.title}}</router-link>
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <h3 class="ml-3">Accounting</h3>
                <v-divider></v-divider>
                <v-list>
                    <v-list-tile v-for="(item, i) in accounting" :key="i" exact :href="item.href">
                        <v-list-tile-action>
                            <v-icon color="primary" v-html="item.icon"></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="links">
                                <router-link :to="item.href">{{item.title}}</router-link>
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-toolbar fixed app clipped-left>
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-toolbar-title v-text="app_name" class="title site-title"></v-toolbar-title>
            </v-toolbar>
        </template>
        <v-content>
            <v-container fluid>
                <v-slide-y-transition mode="out-in">
                    <router-view v-cloak></router-view>
                </v-slide-y-transition>
                <messenger></messenger>
            </v-container>
        </v-content>
        <v-footer app v-if="!$route.meta.public" class="px-2">
            <span>{{ app_name }} &copy; {{year}}</span>
            <v-spacer></v-spacer>
            <a @click="logout">Log Out</a>
        </v-footer>
    </v-app>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                drawer: true,
                quick_links: [
                    {
                        icon: 'dashboard',
                        title: 'Dashboard',
                        href: '/'
                    },
                ],
                assets: [
                    {
                        icon: 'domain',
                        title: 'Distribution',
                        href: '/'
                    },
                    {
                        icon: 'view_list',
                        title: 'Inventory',
                        href: '/inventory'
                    }
                ],
                logistics: [
                    {
                        icon: 'mdi-store',
                        title: 'Hives',
                        href: '/'
                    },
                    {
                        icon: 'mdi-road-variant',
                        title: 'Drivers',
                        href: '/'
                    }
                ],
                marketing: [
                    {
                        icon: 'mdi-book-open-page-variant',
                        title: 'Blog',
                        href: '/'
                    },
                    {
                        icon: 'mdi-contact-mail',
                        title: 'Newsletter',
                        href: '/'
                    }
                ],
                accounting: [
                    {
                        icon: 'mdi-cart',
                        title: 'Orders',
                        href: '/'
                    }
                ]
            }
        },
        computed: {
            year: () => (new Date()).getFullYear(),
            ...mapGetters([
                'app_name'
            ])
        },
        methods: {
            logout() {
                this.$auth.destroyToken()
                this.$router.push('/login')
            }
        }
    }
</script>