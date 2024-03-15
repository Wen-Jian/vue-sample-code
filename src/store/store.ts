import { createStore } from 'vuex';
import type { StoreState } from '../model/store';
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence<StoreState>({
  storage: window.localStorage,
  modules: ['token'],
});

export const store = createStore<StoreState>({
  state() {
    return {
      token: null,
      web3Provider: null,
      modal: {
        isOpen: false,
        content: '',
      }
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    modal(state) {
      return state.modal
    },
    web3Provider(state) {
      return state.web3Provider
    }
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token;
    },
    setModal(state, modal) {
      state.modal = {
        isOpen: modal.isOpen,
        content: modal.content
      }
    },
    setWeb3Provider(state, web3Provider) {
      state.web3Provider = web3Provider
    }
  },
  plugins: [vuexLocal.plugin],
});
