# 🎨 Locker System UI

![Descrição opcional](/public/gif.gif)

Frontend do projeto **Locker System**, desenvolvido em **React** com **Styled Components**, para gerenciamento de armários de encomendas em portarias de prédios.  
Este repositório é responsável pela interface web que consome a API do backend em Java Spring Boot.

---

## 📚 Sumário

- [Tecnologias Utilizadas](#-tecnologias-utilizadas)  
- [Requisitos](#-requisitos)  
- [Instalação](#-instalação)  
- [Configuração](#-configuração)  
- [Estrutura do Projeto](#-estrutura-do-projeto)  
- [Funcionalidades](#-funcionalidades)  
- [Integração com Backend](#-integração-com-backend)  
- [Roadmap](#-roadmap)  
- [Licença](#-licença)  

---

## 🚀 Tecnologias Utilizadas

- **React 18+**
- **TypeScript**
- **Styled Components**
- **Axios** (requisições HTTP)
- **React Router DOM**
- **Redux Toolkit** (gerenciamento de estado)
- **Vite** ou **Create React App** (dependendo da configuração inicial)

---

## 🖥️ Requisitos

Antes de começar, instale:

- [Node.js 18+](https://nodejs.org/)  
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)  

---

## ⚙️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/mariavitoriaventura/LockerSystemUI.git
cd LockerSystemUI
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Execute a aplicação:

```bash
npm start
# ou
yarn start
```

O frontend estará disponível em:  
👉 `http://localhost:3000`

---

## ⚙️ Configuração

No arquivo `.env`, configure a URL da API do backend:

```
VITE_API_URL=http://localhost:8080
```

Isso permite que o frontend se comunique com o backend Spring Boot.

---

## 📂 Estrutura do Projeto

```
LockerSystemUI/
 ├── src/
 │   ├── components/     # Componentes reutilizáveis (Navbar, Sidebar, Modal, etc.)
 │   ├── pages/          # Páginas principais (Login, Dashboard, Residents, Deliveries)
 │   ├── store/          # Redux Toolkit (slices e configuração)
 │   ├── api/            # Configuração do Axios e serviços de requisição
 │   ├── models/         # Tipagens e interfaces TypeScript
 │   ├── styles/         # Estilos globais com Styled Components
 │   └── App.tsx         # Roteamento principal
 └── public/
      └── index.html
```

---

## 📋 Funcionalidades

- **Login e autenticação JWT**  
- **Dashboard dos lockers**  
  - Exibe lockers livres e ocupados  
  - Cadastro de entrega em locker livre  
  - Exibição de detalhes da entrega em locker ocupado  
- **Gerenciamento de moradores**  
  - Listagem e busca por nome/apartamento  
  - Cadastro e exclusão de moradores  
- **Gerenciamento de entregas**  
  - Listagem com filtros  
  - Cadastro de novas entregas  
  - Edição de observações e apartamento  
- **Perfil do usuário e Logout**  

---

## 🔗 Integração com Backend

O frontend consome a API exposta pelo backend do [Locker System](https://github.com/mariavitoriaventura/LockerSystem).  
A autenticação é feita via **JWT**, armazenado no `localStorage`, e enviado no header `Authorization` em todas as requisições.

Exemplo:

```ts
api.get("/deliveries", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
```

---

## 🔮 Roadmap

- [x] Login e autenticação com JWT  
- [x] Dashboard de lockers  
- [x] CRUD de moradores  
- [x] CRUD de entregas  
- [ ] Validação em tempo real no cadastro de entregas  
- [ ] Upload de foto na coleta da entrega  
- [ ] Melhorias de UX/UI  

---

## 📜 Licença

Este projeto foi desenvolvido com finalidade **educacional** e de **estudo em React + Styled Components**.  
Sinta-se à vontade para clonar e adaptar para seus próprios projetos.

---
