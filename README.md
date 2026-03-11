# Portfólio Thiago Klein

Hero Section e layout inspirados no [Portfolite](https://portfolite.framer.website/), com conteúdo do seu site [thiagoklein.com.br](https://www.thiagoklein.com.br/).

## Stack

- **React 18** + **Vite**
- **Tailwind CSS** para estilização
- **React Router** para rotas (Início, Sobre, Portfólio, Blog)

## Estrutura

- **Navbar** flutuante com backdrop-blur, logo à esquerda e links à direita (menu hamburger no mobile).
- **Hero Section** na página Início: pill badge, H1 de impacto, subtexto e dois CTAs (primário com glow, secundário outline).
- **Estética dark**: fundo preto com mesh gradient (gradientes radiais suaves).
- Páginas: **Início**, **Sobre**, **Portfólio**, **Blog** com textos extraídos do seu site atual.

## Como rodar

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Personalização

- Textos e links estão nas páginas em `src/pages/` e no `HeroSection` em `src/pages/Inicio.jsx`.
- Cores e espaçamentos podem ser ajustados em `tailwind.config.js` e nos componentes.
- O mesh gradient está em `src/index.css` (classe `.mesh-gradient`).
