# FontCache

FontCache is a modern tool that downloads and manages Google Fonts locally, allowing you to use them in your projects without relying on third-party API calls. Ideal for environments with restricted internet access or for those aiming to improve performance and privacy.

## Features
- Download and manage Google Fonts locally
- Customize which fonts and weights to download
- Seamlessly integrate with popular build tools
- Optimize font loading for performance
- Ensure fonts are accessible and compatible across devices

## Benefits
### 1. **Offline Availability**
With FontCache, you can use Google Fonts in environments with restricted internet access or offline mode, ensuring that your project’s typography is always available.
### 2. **Improved Performance**
By hosting fonts locally, you reduce the need for external HTTP requests, leading to faster load times and better performance, especially in resource-constrained environments.
### 3. **Increased Privacy**
FontCache eliminates the need for external API calls to Google Fonts, which can enhance user privacy and comply with data protection regulations by preventing user data from being shared with third parties.
### 4. **Customization**
Easily configure which fonts and weights to download, tailored to your project's specific needs, reducing unnecessary bloat and ensuring optimal performance.
### 5. **Consistency**
Ensure consistent font availability across different environments and deployment scenarios, removing dependency on external resources that might change or become unavailable.

## Installation
Install FontCache as a development dependency in your project:

```bash
npm install --save-dev fontcache
```

## Configuration
Create a fonts.config.json file in the root directory of your project to specify which fonts and weights you need:
```json
{
  "fonts": [
    {
      "family": "OpenSans",
      "weights": ["400", "700"]
    },
    {
      "family": "Roboto",
      "weights": ["400", "700"]
    }
  ]
}
```

## Usage
### Automatically Download Fonts
Add a script to your project's `package.json` to run the font downloader after dependencies are installed:
```json
{
  "scripts": {
    "postinstall": "download-fonts"
  }
}
```

This script will download the specified fonts and place them in the public/Fonts directory.

## Automatically Generate CSS File
FontCache also generates a `{fontName}.css` file with `@font-face` declarations for each downloaded font. This file will be placed in the same directory where the fonts are downloaded, making it easy to include in your project.
*This is an example of `Roboto.css` file that is generated inside `/public/Fonts/Roboto`.*
```css
@font-face {
  font-family: 'Roboto';
  src: url('/public/Fonts/Roboto/Roboto-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('/public/Fonts/Roboto/Roboto-700.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}
```

## Automatically adds preloader to `index.html` file
FontCache also generates a preloader inside `index.html` file for each downloaded font. This will help developers to directly just use the fonts by name inside `components.css files`.
*This is an example of `Roboto` font that is included as preloader inside `/public/index.html`.*
```html
<link rel="stylesheet" href="%PUBLIC_URL%/Fonts/Roboto/Roboto.css" />
```

Then, use these fonts in your React components:
*Inline react styling*
```jsx
import React from 'react';
import './App.css'; // Ensure this CSS file contains your @font-face definitions

const App = () => {
  return (
    <div style={{ fontFamily: 'Roboto' }}>
      <h1>Hello, world!</h1>
      <p>This is a paragraph with dynamic fonts!</p>
    </div>
  );
};

export default App;
```

*Inside specific css file*
```css
h1 {
  font-family: "Roboto";
  font-weight: 700;
}

p {
  font-family: "Roboto";
  font-weight: 400;
}
```

## Advanced Usage
### Customizing Font Download Directory
By default, FontCache downloads fonts to the `public/Fonts` directory. You can customize this by specifying a different directory in your `fonts.config.json` file:
```json
{
  "fonts": [
    {
      "family": "OpenSans",
      "weights": ["400", "700"]
    },
    {
      "family": "Roboto",
      "weights": ["400", "700"]
    }
  ],
  "outputDir": "static/fonts"
}
```

## Screenshot of `public` folder
![Screenshot of public folder showcasing folder structure](https://ibb.co/bPZndgs)

## Test Coverage

File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------|---------|----------|---------|---------|-------------------
All files        |   93.33 |     62.5 |   66.66 |   93.33 |                   
downloadFonts.js |   93.33 |     62.5 |   66.66 |   93.33 | 47-48             


## Contributing
We welcome contributions to FontCache! If you have ideas for improvements or find bugs, please open an issue or submit a pull request on [GitHub](https://github.com/pritesh-chandra/fontcache/pulls).

## License
FontCache is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
