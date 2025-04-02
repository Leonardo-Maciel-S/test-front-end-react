# Testes Front-end

Repositório criado para praticar meus conhecimentos em testes no front-end.

## Ferramentas

Para esses testes utilizei o **Vitest** e o **Test Library**

## Configurando ambiente

Precisamos inicialmente instalar as bibliotecas:

### Vitest

Essa é a biblioteca que utilizamos para testar nossas funções Typescript.

```bash
npm i vitest @types/jest -D
```

Adicionar um script no meu package.json

```json

"script": {
  "test": "vitest"
}
```

Dentro do meu vite.config.ts tenho que criar um novo campo e adicionar uma linha no topo do arquivo

```typescript
/// <reference types="vitest" />

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
  },
});
```

### Test Library e JSDOM

Essas biblioteca utilizamos para renderizar nossos componentes.

```bash
npm install -D @testing-library/react @testing-library/dom @types/react @types/react-dom @testing-library/jest-dom jsdom
```

Criamos um arquivo **setupTest.ts** pra executar um script de "limpeza" que será executado sempre ao final de um teste para não interferir um no outro.

```typescript
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});
```

Agora eu preciso configurar mais uma propriedade no meu **vite.config.ts**.

```typescript
/// <reference types="vitest" />

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTest.ts",
  },
});
```
