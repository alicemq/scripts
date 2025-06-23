# FMCSA CH Toolbox

A Tampermonkey/Greasemonkey userscript that enhances the FMCSA Clearinghouse website with additional functionality for file management and navigation.

## Overview

This userscript adds several features to the FMCSA Clearinghouse website:
- **File print cleanup**: Automatically formats window titles for better file organization
- **Extra navigation buttons**: Quick access to Conduct Query and Query History pages
- **Configurable settings**: Customizable date formats, timezones, and company name replacements
- **Multi-language support**: English and German language options

## Features

### 1. Enhanced Navigation
- Adds "Conduct Query" and "Query History" buttons to the main navigation menu
- Provides quick access to frequently used pages

### 2. Automatic File Naming
- Automatically formats window titles for better file organization
- Supports custom date formats and timezone settings
- Can use either current date (minus configurable days) or query submission date
- Includes company name replacement functionality

### 3. Configuration Panel
- Accessible via "Open Settings" button in the footer
- Configurable options include:
  - Date format preferences
  - Timezone settings
  - Company name replacement mappings
  - Days to subtract from current date
  - Language selection (English/German)

### 4. Company Name Replacement
- Automatically replaces company names in file titles based on user-defined mappings
- Format: `"ORIGINAL NAME:REPLACEMENT NAME"` (one per line)

## Installation

### Prerequisites
- **Tampermonkey** (Chrome/Firefox) or **Greasemonkey** (Firefox)
- Access to the FMCSA Clearinghouse website

### Installation Steps
1. Install Tampermonkey or Greasemonkey browser extension
2. Click on the Tampermonkey/Greasemonkey icon in your browser
3. Select "Create a new script"
4. Copy and paste the entire contents of `fmcsa_ch_toolbox.js`
5. Save the script (Ctrl+S)
6. Navigate to https://clearinghouse.fmcsa.dot.gov/ to activate the script

## Configuration

### Accessing Settings
1. Navigate to any page on the FMCSA Clearinghouse website
2. Scroll to the bottom of the page
3. Click "Open Settings" in the footer links section

### Available Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Minus days | Integer | 1 | Days to subtract from current date |
| Date format | Text | "MM DD YYYY" | Format for date display |
| Timezone | Text | "America/Chicago" | Timezone for date calculations |
| Comp replace | Textarea | "BRAVO COMP:BRAVO" | Company name replacement mappings |
| File name date | Select | "Date from requested" | Date source for file naming |

### Company Name Replacement
Add company name mappings in the format:
```
ORIGINAL COMPANY NAME:REPLACEMENT NAME
ANOTHER COMPANY:SHORT NAME
```

Example:
```
BRAVO COMP:BRAVO
SMITH TRANSPORTATION INC:SMITH TRANS
```

## Usage

### Automatic Features
- **Window Title Formatting**: Automatically updates page titles when viewing query results
- **Navigation Enhancement**: Additional buttons appear in the main navigation menu

### Manual Features
- **Settings Access**: Click "Open Settings" in the footer to configure the script. Settings are saved in your browser's local storage. "Open Settings" button is only visible on the FMCSA Clearinghouse website and is hidden in print view.
- **Language Switching**: Change between English and German in the settings panel

## File Structure

```
scripts/
├── fmcsa_ch_toolbox.js          # Main userscript file
└── main/
    └── libs/                    # External library dependencies
        ├── GM_config-master/
        │   └── gm_config.js     # Configuration management library
        ├── moment.js            # Date manipulation library
        ├── moment-timezone.js   # Timezone support
        └── moment-timezone-with-data.js  # Timezone data
```

## Dependencies

The script requires the following external libraries (automatically loaded):
- **GM_config**: Configuration management and UI
- **Moment.js**: Date and time manipulation
- **Moment Timezone**: Timezone support

## Browser Compatibility

- **Chrome**: Via Tampermonkey extension
- **Firefox**: Via Tampermonkey or Greasemonkey extension
- **Edge**: Via Tampermonkey extension
- **Safari**: Via Tampermonkey extension

## Version History

- **v0.2**: Current version with enhanced configuration options
- **v0.1**: Initial release with basic functionality

## Troubleshooting

### Script Not Working
1. Ensure Tampermonkey/Greasemonkey is properly installed
2. Check that the script is enabled for the FMCSA Clearinghouse domain
3. Verify the script matches the correct URL pattern: `https://clearinghouse.fmcsa.dot.gov/*`

### Settings Not Saving
1. Check browser permissions for the userscript manager
2. Ensure you're on the correct domain when accessing settings
3. Try refreshing the page after saving settings

### Date Format Issues
1. Verify your timezone setting is correct
2. Check that the date format follows the expected pattern
3. Ensure the "Minus days" value is appropriate for your use case

## Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on the FMCSA Clearinghouse website
5. Submit a pull request

## License

This project is open source. Please check the script header for specific licensing information.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the configuration options
3. Ensure you're using a compatible browser and userscript manager

## Security Notes

- The script only runs on the FMCSA Clearinghouse domain
- No personal data is transmitted to external servers
- All configuration is stored locally in your browser
- The script uses standard browser APIs and doesn't require elevated permissions 