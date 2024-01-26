import './styles.css';

import { createApp } from 'vue';
import App from './app/App.vue';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import WaveUI from 'wave-ui';
import 'wave-ui/dist/wave-ui.css';
import router from "./routes/routes";
import { store } from "./store/store";

// const app = createApp(App);
const app = createApp(App);

app.use(WaveUI);

app.use(router)

app.use(store)

app.mount('#chat-client');
