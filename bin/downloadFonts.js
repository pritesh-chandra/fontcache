#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const config = require(path.join(process.cwd(), "fonts.config.json"));

const customFontDir = config.outputDir;
const publicFolderDir = customFontDir
  ? path.join(process.cwd(), customFontDir)
  : path.join(process.cwd(), "public", "Fonts");

if (!fs.existsSync(publicFolderDir)) {
  fs.mkdirSync(publicFolderDir, { recursive: true });
}

const downloadFonts = async (fontFamily, fontWeight) => {
  const url = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${fontWeight}&display=swap`;
  const response = await fetch(url);
  const cssText = await response.text();

  const fontUrlMatch = cssText.match(/url\(([^)]+)\)/);
  if (fontUrlMatch) {
    const fontUrl = fontUrlMatch[1].replace(/^"/, "").replace(/"$/, "");
    const fontFileResponse = await fetch(fontUrl);
    const fontBuffer = await fontFileResponse.buffer();

    const sanitizedFontFamily = fontFamily.replace(/\s+/g, '-');

    const fontDir = path.join(publicFolderDir, sanitizedFontFamily);
    if (!fs.existsSync(fontDir)) {
      fs.mkdirSync(fontDir);
    }

    const fontFilePath = path.join(
      fontDir,
      `${sanitizedFontFamily}-${fontWeight}.woff2`
    );
    fs.writeFileSync(fontFilePath, fontBuffer);

    console.log(`Downloaded ${sanitizedFontFamily} - ${fontWeight}`);
}
};

const updateCSSFile = (fontFamily, fontWeight, fontPath) => {
    const sanitizedFontFamily = fontFamily.replace(/\s+/g, '-');

    const cssFilePath = path.join(publicFolderDir, sanitizedFontFamily, `${sanitizedFontFamily}.css`);
    const cssContent = `
@font-face {
    font-family: '${sanitizedFontFamily}';
    font-style: normal;
    font-weight: ${fontWeight};
    font-display: swap;
    src: url(${fontPath}) format('woff2');
}`;

    const fontRecordPath = path.join(publicFolderDir, sanitizedFontFamily, 'fontRecord.json');

    let fontRecord = {};
    if (fs.existsSync(fontRecordPath)) {
        fontRecord = JSON.parse(fs.readFileSync(fontRecordPath, "utf-8"));
    }

    if (!fontRecord[fontWeight]) {
        fs.appendFileSync(cssFilePath, cssContent);
        
        fontRecord[fontWeight] = true;
        fs.writeFileSync(fontRecordPath, JSON.stringify(fontRecord));
    } else {
        console.log(`Font-face rule for ${sanitizedFontFamily} - ${fontWeight} already exists. Skipping update.`);
    }
};

const addPreloaderToIndexHTML = (fontFamilies) => {
    const indexPath = path.join("public", "index.html");
    let indexHTML = fs.readFileSync(indexPath, "utf-8");

    const preloaderTags = fontFamilies.map((fontFamily) => {
        return `<link rel="stylesheet" href="%PUBLIC_URL%/Fonts/${fontFamily}/${fontFamily}.css" />`;
    }).join('\n');

    const headTagPosition = indexHTML.indexOf('<head>');
    if (headTagPosition !== -1) {
        indexHTML =
            indexHTML.slice(0, headTagPosition + 6) + 
            '\n' + preloaderTags + '\n' +
            indexHTML.slice(headTagPosition + 6);
    } else {
        console.log("No <head> tag found in index.html. Preloader HTML not added.");
    }

    fs.writeFileSync(indexPath, indexHTML);
};

const downloadAllFonts = async () => {
    const fontFamilies = [];
  
    for (const { family, weights } of config.fonts) {
      const sanitizedFamily = family.replace(/\s+/g, '-');
      fontFamilies.push(sanitizedFamily);
      
      for (const weight of weights) {
        await downloadFonts(family, weight);
        updateCSSFile(family, weight, `./${sanitizedFamily}-${weight}.woff2`);
      }
    }
    addPreloaderToIndexHTML(fontFamilies);
  };
  

downloadAllFonts().catch((err) => {
  console.error("Failed to download fonts", err);
  process.exit(1);
});