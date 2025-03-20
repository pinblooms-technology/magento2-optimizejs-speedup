# PinBlooms_OptimizeJs

## Overview
`PinBlooms_OptimizeJs` is a custom Magento 2 module developed to optimize the default JavaScript loading behavior in Magento 2, significantly improving website speed and performance.

## Features
- **JavaScript Optimization:** Reduces the size and execution time of JavaScript files.
- **Deferred Loading:** Loads non-essential scripts after the page renders to improve initial load time.
- **Minification Support:** Minimizes JS files to reduce file size and enhance performance.
- **Asynchronous Loading:** Enhances page speed by executing JavaScript files asynchronously.
- **SEO-Friendly Optimization:** Ensures faster load times, improving Core Web Vitals scores and user experience.

## Benefits
- **Faster Page Load Time:** Improves website speed by reducing JavaScript processing overhead.
- **Enhanced User Experience:** Ensures a seamless browsing experience with optimized script execution.
- **Better SEO Performance:** Faster load times contribute to improved search engine rankings.
- **Improved Core Web Vitals:** Helps pass Google's Page Experience metrics.

## Installation
### 1. Download the Module
Clone or download the module into your Magento 2 `app/code/PinBlooms/OptimizeJs` directory.

```sh
cd <your-magento-root-folder>
git clone <repository-url> app/code/PinBlooms/OptimizeJs
```

### 2. Enable the Module
Run the following commands to enable and set up the module:

```sh
php bin/magento module:enable PinBlooms_OptimizeJs
php bin/magento setup:upgrade
php bin/magento cache:flush
```

### 3. Deploy Static Content (For Production Mode)
```sh
php bin/magento setup:static-content:deploy -f
```

## Configuration
After installation, navigate to:

**Admin Panel → Stores → Configuration → PinBlooms → OptimizeJs**

Here, you can:
- Enable or disable JavaScript optimizations.
- Configure minification and defer settings.
- Customize optimization rules based on your store's requirements.

## Compatibility
- Magento 2.3.x - Magento 2.4.x
- PHP 7.3+ / 8.0+

## Troubleshooting
If you face any issues, try the following:
1. Clear Magento cache:
   ```sh
   php bin/magento cache:flush
   ```
2. Recompile and deploy static content:
   ```sh
   php bin/magento setup:di:compile
   php bin/magento setup:static-content:deploy -f
   ```
3. Ensure file permissions are set correctly.
   ```sh
   chmod -R 777 var/ pub/ generated/
   ```

## Contributing
If you find any issues or have feature requests, feel free to submit a pull request or create an issue.

## License
This module is open-source and distributed under the MIT License.

---
🚀 **Boost your Magento 2 store's performance with `PinBlooms_OptimizeJs` today!**
