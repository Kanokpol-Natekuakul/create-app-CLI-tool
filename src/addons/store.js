export function getConfig({ stackName, hasAddon }) {
  const isTs = hasAddon.typescript;
  const ext = isTs ? 'ts' : 'js';
  const extJsx = isTs ? 'tsx' : 'jsx';

  const dependencies = {};
  const configFiles = {};

  if (stackName === 'react') {
    dependencies['zustand'] = '^4.5.0';

    configFiles[`src/store/useStore.${ext}`] = `import { create } from 'zustand';

export const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));`;

    if (hasAddon.router) {
      configFiles[`src/pages/Home.${extJsx}`] = `import { useStore } from '../store/useStore';

export default function Home() {
  const { count, increment, decrement } = useStore();
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Home Page (Zustand Store)</h1>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}`;
    } else {
      configFiles[`src/App.${extJsx}`] = `import { useStore } from './store/useStore';

export default function App() {
  const { count, increment, decrement } = useStore();
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>{{projectName}} (Zustand Sandbox)</h1>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}`;
    }

  } else if (stackName === 'vue') {
    dependencies['pinia'] = '^2.1.0';

    configFiles[`src/store/counter.${ext}`] = `import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    }
  }
});`;

    let vueMain = `import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
${hasAddon.router ? "import router from './router'\n" : ""}
const app = createApp(App)
app.use(createPinia())
${hasAddon.router ? "app.use(router)\n" : ""}
app.mount('#app')`;
    configFiles[`src/main.${ext}`] = vueMain;

    if (hasAddon.router) {
      configFiles['src/pages/Home.vue'] = `<template>
  <div style="text-align: center; padding: 2rem;">
    <h1>Home Page (Pinia Store)</h1>
    <h2>Count: {{ store.count }}</h2>
    <button @click="store.increment">+</button>
    <button @click="store.decrement">-</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '../store/counter';
const store = useCounterStore();
</script>`;
    } else {
      configFiles['src/App.vue'] = `<template>
  <div style="text-align: center; padding: 2rem;">
    <h1>{{projectName}} (Pinia Sandbox)</h1>
    <h2>Count: {{ store.count }}</h2>
    <button @click="store.increment">+</button>
    <button @click="store.decrement">-</button>
  </div>
</template>

<script setup>
import { useCounterStore } from './store/counter';
const store = useCounterStore();
</script>`;
    }
  }

  return { dependencies, configFiles };
}
