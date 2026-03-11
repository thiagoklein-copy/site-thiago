COLOQUE AQUI OS 9 LOGOS (nesta pasta mesmo: public/logos/)

A pasta "public" fica na RAIZ do projeto (a mesma pasta onde está index.html e a pasta src).
Copie os 9 arquivos PNG para DENTRO de public/logos/ com estes nomes:

  ulbra.png
  dell.png
  gerdau.png
  weg.png
  randon.png
  ibasa.png
  petite-jolie.png
  romanzza.png
  zenklub.png

Depois rode o site com: npm run dev
(Abra pelo navegador em http://localhost:5173 — não abra o index.html direto no disco.)

--- Alternativa: Supabase (ou outro CDN) ---
1. Crie um bucket público no Supabase Storage.
2. Suba os PNGs e copie a URL pública de cada um.
3. Em src/components/LogoMarquee.jsx, troque cada src por essa URL.
   Ex: { src: 'https://xxx.supabase.co/storage/v1/object/public/logos/ulbra.png', alt: 'ULBRA' },
