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

[Documentação](https://testing-library.com/docs/react-testing-library/intro)

Essas bibliotecas utilizamos para renderizar nossos componentes.

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

## Iniciando Testes

Para criar um arquivo de testes colocamos o nome do componente com extensão de arquivo **.test.tsx** ou **.spec.tsx**, exemplo:

> Button.spec.tsx

Criamos a estrutura padrão do jest com **describe** e dentro dele nossos **it()** ou **test()**

```typescript
describe("tests of button", () => {
  it("Should render a button", () => {}));

```

### Renderizando componentes no teste

Importamos a função **render** do _@testing-library/react_ e passamos nosso componente como parâmetro.

```typescript
import { render } from "@testing-library/react";
import Button from "./Button";

describe("tests of button", () => {
  it("Should render a button", () => {
    render(<Button>Entrar</Button>);
  });
});
```

### Screen

Este é um objeto que utilizamos para acessar a "dom" virtual do teste e verificar se alguma coisa aconteceu como queríamos, nesse caso verificar se o texto que passei como children está na tela.

```typescript
import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("tests of button", () => {
  it("Should render a button", () => {
    render(<Button>Entrar</Button>);

    screen.getByText("Entrar");
  });
});
```

### Funções mais comuns do screen

1. **getByText**: procura um texto na tela, caso não queira levar em conta se tem letra minuscula ou maiúscula pode usar uma expressão regular como **getByText(/texto que deseja procurar/i)**
1. **getByRole**: procura algo pela "função" que o elemento faz, por exemplo a role de um input text é o _textbox_. Essa função aceita um segundo parâmetro que é um objeto que podemos especificar mais informações, no caso do input podemos colocar o name ou ID dele, exemplo: **getByRole("textbox", {name: "item"})**
1. **funções query**, por padrão caso o get não encontre o que ele já da error e falha o teste, já o query não, retorna um null e podemos usar esse retorno para verificar se o elemento estava lá ou não. Para todo get alguma coisa existe um query dele getByRole = queryByRole, getByText = queryByText.

### Eventos de Usuários

Um modo de simular um usuário interagindo com o sistema, digitando em um input por exemplo, podemos utilizar mais um recurso do test library que é o **User Event**.

```bash
npm install --save-dev @testing-library/user-event
```

#### Utilizando o userEvent

[Documentação](https://testing-library.com/docs/user-event/install)

Precisamos criar uma variável que vai simular o usuário, para fazer isso importamos o userEvent do _@testing-library/user-event_ e usamos a função userEvent.setup()

```typescript
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();
```

Após isso meu "user" vai ter alguns métodos como .type(elemento, texto), .click(elemento) e assim por diante.

## Cenários de testes

Para testar o front-end, geralmente será para verificar se algo está na tela, se mudou a renderização quando clicar em um evento e assim por diante.

Nesse exemplo eu testo se meu componente App renderizou completamente com todos os componentes que adicionei a ele.

```typescript
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Form component", () => {
  it("Should render the state initial correctly", () => {
    render(<App />);

    screen.getByText(/digite algo/i);
    screen.getByRole("textbox", { name: "Item" });
    screen.getByRole("button", { name: "Adicionar" });
    screen.getByText(/lista de items/i);
    screen.getByText(/Nenhum item adicionado ainda./i);
  });
});
```
