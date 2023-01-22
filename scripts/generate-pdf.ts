import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: {width:1920,height:1080}  // This option will ensure that the viewport uses the entire screen
  });
  const page = await context.newPage();

  await page.goto('http://127.0.0.1:3000/short', { waitUntil: 'networkidle' });

  const downloadButton = page.locator('a[download]');
  await downloadButton.evaluate((node) => (node.innerHTML = ''));
  await page.emulateMedia({ media: 'screen' });
  await page.pdf({
    path: 'public/resume.pdf',
    margin: {
      top: '50px',
      bottom: '80px',
    },
    printBackground: true,
  });

  await browser.close();
})();
