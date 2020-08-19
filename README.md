# Kuantokusta

- O projeto foi desenvolvido utilizando ESLint, Prettier e EditorConfig,
- Style Guide: AirBNB
- Gerenciador de pacotes utilizado: `yarn`
- CSS Mobile First
- Não foi utilizado nenhuma lib de CSS, como Material ou Bootstrap.
- Todos os componentes do projeto estão dentro do diretório `app/components`.
- Em `templates` estão todos os componentes fixos (header, footer, main).
- No diretório `cart` estão as `actions` e o `reducer` do carrinho (NgRx).
- Os produtos que estão no carrinho também serão salvos no `LocalStorage`, o que é feito diretamente no `reducer`, quando o usuário retorna à página, o `app.component` recupera todas as informações do `LocalStorage` e salva no Estado Global (NgRx).
- No `header`, o contador aumenta e diminui de acordo com a `quantidade de itens no carrinho`, ele não altera se aumentar a quantidade de um item específico, por exemplo, 2x o item A e 1x o item B, o header irá apresentar o número 2, isso não é um bug, somente achei ser mais coerente esta contagem.
- O valor total por item e o valor total do carrinho são reativos, ou seja, eles serão alterados conforme mudança no estado do carrinho.
- O site está sendo renderizado ao lado do servidor (SSR) com o `Angular Universal`.
- Primeiro criar um build do projeto com o comando `yarn build:ssr`
- Correr o comando `yarn serve:ssr` e aceder ao link `http://localhost:4000/`




