# html-to-img

launch command in the root without docker:
npm install
node index.js

launch command in the root with docker:
build:
docker build --platform linux/amd64 -t html-to-pdf .
run:
docker run -p 3000:3000 -d html-to-pdf
