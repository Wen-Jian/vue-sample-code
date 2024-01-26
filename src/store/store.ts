import { createStore } from 'vuex';
import type { StoreState } from '../model/store';
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence<StoreState>({
  storage: window.localStorage,
});

export const store = createStore<StoreState>({
  state: {
    token: null,
    modal: {
      isOpen: false,
      content: '',
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setModal(state, modal) {
      state.modal = {
        isOpen: modal.isOpen,
        content: modal.content
      }
    }
  },
  plugins: [vuexLocal.plugin],
});
