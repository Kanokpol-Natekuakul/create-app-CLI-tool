export function getConfig({ stackName, hasAddon }) {
  const isTs = hasAddon.typescript;
  const extJsx = isTs ? 'tsx' : 'jsx';
  const extJs = isTs ? 'ts' : 'js';

  const dependencies = {};
  const configFiles = {};

  if (stackName === 'react') {
    dependencies['react-router-dom'] = '^6.22.0';

    configFiles[`src/pages/Home.${extJsx}`] = `export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Home Page</h1>
      <p>Welcome to your routed React application.</p>
    </div>
  );
}`;

    configFiles[`src/pages/About.${extJsx}`] = `import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>About Page</h1>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}`;

    configFiles[`src/App.${extJsx}`] = `import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <strong>{{projectName}}</strong>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;`;

  } else if (stackName === 'vue') {
    dependencies['vue-router'] = '^4.2.0';

    configFiles['src/pages/Home.vue'] = `<template>
  <div style="text-align: center; padding: 2rem;">
    <h1>Home Page</h1>
    <p>Welcome to your routed Vue application.</p>
  </div>
</template>`;

    configFiles['src/pages/About.vue'] = `<template>
  <div style="text-align: center; padding: 2rem;">
    <h1>About Page</h1>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>`;

    configFiles[`src/router/index.${extJs}`] = `import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;`;

    // Overwrite Vue's standard entry file
    configFiles[`src/main.${extJs}`] = `import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')`;

    // Overwrite Vue's App.vue
    configFiles['src/App.vue'] = `<template>
  <div>
    <nav style="padding: 1rem; border-bottom: 1px solid #ccc; display: flex; gap: 1rem; justify-content: center;">
      <strong>{{projectName}}</strong>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>`;
  }

  return { dependencies, configFiles };
}
