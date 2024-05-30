#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const config = require(path.join(process.cwd(), 'fonts.config.json'));

const publicFolderDir = path.join(process.cwd(), 'public', 'Fonts');

if(!fs.existsSync(publicFolderDir)) {
    fs.mkdirSync(publicFolderDir, { recursive: true });
}

const downloadFonts = async (fontFamily, fontWeight) => {
    const url = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${fontWeight}&display=swap`;
    const response = await fetch(url);
    const cssText = await response.text();

    const fontUrlMatch = cssText.match(/url\(([^)]+)\)/);
    if(fontUrlMatch) {
        const fontUrl = fontUrlMatch[1].replace(/^"/, '').replace(/"$/, '');
        const fontFileResponse = await fetch(fontUrl);
        const fontBuffer = await fontFileResponse.buffer();

        const fontDir = path.join(publicFolderDir, fontFamily);
        if(!fs.existsSync(fontDir)) {
            fs.mkdirSync(fontDir);
        }

        const fontFilePath = path.join(fontDir, `${fontFamily}-${fontWeight}.woff2`);
        fs.writeFileSync(fontFilePath, fontBuffer);

        console.log(`Downloaded ${fontFamily} - ${fontWeight}`);
    }
};

const downloadAllFonts = async () => {
    for(const { family, weights } of config.fonts) {
        for(const weight of weights) {
            await downloadFonts(family, weight);
        }
    }
}

downloadAllFonts().catch((err) => {
    console.error('Failed to download fonts', err);
    process.exit(1);
});