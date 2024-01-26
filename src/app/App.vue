<script setup lang="ts">
// import ChatApp from "../views/chat/ChatApp.vue";
import { onMounted, watch } from "vue";
import Modal from "../components/modal/Modal.vue";
import { STORE_ACTION_SET_MODAL } from "../store/action";
import { useStore } from "vuex";
import type { StoreState } from "../model/store";
import { CHAT_AUTH_LOGIN_PATH } from "../constants/path";

const store = useStore<StoreState>()

const closeModal = () => {
    store.commit(STORE_ACTION_SET_MODAL, {
        isOpen: false,
        content: ""
    })
}

watch(() => store.state.token, () => {
    if (store.state.token !== "") {
      return
    }
    location.href = CHAT_AUTH_LOGIN_PATH
})

</script>

<template>
  <!-- <ChatApp /> -->
  <div class="dark bg-gray-900">
    <RouterView />
    <Modal v-if="store.state.modal.isOpen" @handle-close="closeModal">
        <template v-slot:body>
            <p>
                You have succeeded to subscribe the room.
            </p>
        </template>
    </Modal>
  </div>
</template>

<style scoped lang="css">
header {
  line-height: 1.5;
  max-width: 100vw;
}

nav > a {
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 768px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    margin-left: auto;
    margin-right: auto;
    max-width: 768px;
  }

  nav {
    text-align: left;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
