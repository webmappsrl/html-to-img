const puppeteer = require('puppeteer');
const express = require('express');

const app = express();
const port = 3000;

async function convertHtmlToPdf(url, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'}); // Aspetta che la rete sia inattiva per almeno 500ms
  await page.pdf({ path: outputPath, format: 'A4' });
  await browser.close();
  console.log(`PDF salvato in: ${outputPath}`);
}

app.get('/generate-pdf', async (req, res) => {
  const url = req.query.url;
  const outputPath = 'output.pdf';

  if (!url) {
    return res.status(400).send('URL mancante');
  }

  try {
    await convertHtmlToPdf(url, outputPath);
    res.download(outputPath);
  } catch (error) {
    console.error(error);
    res.status(500).send('Errore durante la generazione del PDF');
  }
});

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
