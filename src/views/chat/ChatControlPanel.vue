<template>
    <div class="lg:h-[100vh] lg:min-w-[50px] lg:p-4 bg-white dark:bg-gray-800
    h-[5vh]">
        <div class="lg:block hidden">
            <Avatar />
        </div>
        <div class="text-right">
            <button @click="handleMenuButtonClick" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <MenuIcon />
            </button>
        </div>
        <div
            class="
                transition-all duration-150 ease-linear ml-[100%] dark:bg-gray-900 dark:border-gray-600 dark:text-white h-screen z-20 relative
                lg:visible lg:ml-[unset] lg:mt-[10px] lg:flex lg:flex-col lg:items-center dark:lg:bg-transparent
            "
            :class="{
                'ml-[50%]': isMenuOpen,
                'w-[50%] lg:w-[100%]': isMenuOpen,
                'invisible': !isMenuOpen,
                'h-0': !isMenuOpen
            }"
        >
            <List v-if="isMenuOpen" @item-click="handleMenuItemClick" :items="menuList" :item-height="80" align-items="center" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Avatar from "../../components/avatar/Avatar.vue";
import MenuIcon from "../../components/icon/MenuIcon.vue";
import List from "../../components/list/List.vue";
import axios from "axios";
import { API_AUTH_LOGOUT_PATH } from "../../constants/path";
import { STORE_ACTION_SET_TOKEN } from "../../store/action";
import { useStore } from "vuex";

const store = useStore()
const isMenuOpen = ref(false)

const menuList = [
    {
        id: 1,
        name: 'Logout',
    }
]

const handleLogout = async () => {
    try {
        await axios.delete<{}>(API_AUTH_LOGOUT_PATH, {data: {
            accessToken: store.state.token
        }})

        store.commit(STORE_ACTION_SET_TOKEN, "")
    } catch (error) {
        console.log(error)
    }

}

const menuListFuncMap: Record<number, () => Promise<void>> = {
    1: handleLogout
}

const handleMenuItemClick = async (id: number) => {
    const event = menuListFuncMap[id]
    if (event) {
        await event()
    }
}

const handleMenuButtonClick = () => {
    isMenuOpen.value = !isMenuOpen.value
}

</script>