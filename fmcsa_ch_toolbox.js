// ==UserScript==
// @name         FMCSA CH toolbox
// @namespace    fmcsa_ch_toolbox
// @version      0.2
// @description  File print cleanup + extra buttons
// @author       alicemq
// @match        https://clearinghouse.fmcsa.dot.gov/*
// @run-at      document-idle
// @icon         https://www.google.com/s2/favicons?domain=mozilla.org
// @grant GM_setValue
// @grant GM_getValue
// @grant GM.setValue
// @grant GM.getValue
// @grant GM_setClipboard
// @grant unsafeWindow
// @grant window.close
// @grant window.focus
// @grant window.onurlchange
// @grant GM_addStyle
// @grant GM_addElement
// @grant         GM_log
// @require       https://raw.githubusercontent.com/alicemq/scripts/refs/heads/master/main/libs/GM_config-master/gm_config.js
// @require       https://raw.githubusercontent.com/alicemq/scripts/refs/heads/master/main/libs/moment.js
// @require       https://raw.githubusercontent.com/alicemq/scripts/refs/heads/master/main/libs/moment-timezone.js
// @require       https://raw.githubusercontent.com/alicemq/scripts/refs/heads/master/main/libs/moment-timezone-with-data.js
// @include       https://openuserjs.org/scripts/sizzle/The_GM_config_Unit_Test
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox. */

/* jshint esversion: 5 */
/* globals GM_config, GM_configStruct */
// ==/UserScript==

function buttons() {
    'use strict';
   // extra buttons
    document.querySelector("#nav-menu > li:nth-child(2)").insertAdjacentHTML("afterend", `<li tabindex="0" class=""><a href="/Query/Add">
      <span class="icon"><svg version="1.1" id="About-Icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="181.99601586914062 88.70600732421875 86.56799633789062 97.29399267578125" xml:space="preserve">
          <path class="stroke-color" stroke-width="11.728" d="M225.28,169.41c20.67,0,37.42-16.75,37.42-37.42c0-20.67-16.75-37.42-37.42-37.42s-37.42,16.75-37.42,37.42
              C187.86,152.65,204.62,169.41,225.28,169.41z"></path>

      <polygon class="fill-color" points="212.67,171.49 225.29,186 237.91,171.49 "></polygon>

          <path class="fill-color" d="M221.22,144.22v-13.39c-0.29-0.16-0.44-0.29-0.6-0.33c-1.35-0.32-3.76-0.41-3.88-0.98
              c-0.47-2.26-0.34-4.68-0.15-7.02c0.03-0.39,1.45-0.92,2.24-0.95c3.28-0.11,6.57,0.01,9.86-0.06c1.98-0.04,2.74,0.75,2.71,2.77
              c-0.09,5.93,0.03,11.87-0.07,17.8c-0.03,1.9,0.58,2.76,2.5,2.48c2.46-0.35,3.13,0.78,3.06,3.13c-0.18,5.94,0.59,5.22-5.32,5.25
              c-4.29,0.02-8.58-0.06-12.87,0.03c-1.76,0.04-2.59-0.55-2.4-2.35c0.02-0.18,0-0.37,0-0.55
              C216.23,145.03,216.23,145.03,221.22,144.22"></path>
          <path class="fill-color" d="M226.22,115.57c-1,0-2.04,0.16-2.99-0.06c-0.66-0.15-1.66-0.78-1.71-1.29c-0.21-1.89-0.21-3.82-0.02-5.71
              c0.05-0.5,1.03-1.12,1.68-1.28c0.95-0.22,1.99-0.08,2.99-0.07c6,0.05,5.02-0.61,5.26,5.26c0.11,2.6-0.83,3.51-3.3,3.17
              c-0.62-0.09-1.27-0.01-1.91-0.01V115.57z"></path>

      </svg></span>Conduct Query</a></li>

      <li tabindex="0" class=""><a href="/Query">
          <span class="icon"><svg version="1.1" id="About-Icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="181.99601586914062 88.70600732421875 86.56799633789062 97.29399267578125" xml:space="preserve">
              <path class="stroke-color" stroke-width="11.728" d="M225.28,169.41c20.67,0,37.42-16.75,37.42-37.42c0-20.67-16.75-37.42-37.42-37.42s-37.42,16.75-37.42,37.42
                  C187.86,152.65,204.62,169.41,225.28,169.41z"></path>

          <polygon class="fill-color" points="212.67,171.49 225.29,186 237.91,171.49 "></polygon>

              <path class="fill-color" d="M221.22,144.22v-13.39c-0.29-0.16-0.44-0.29-0.6-0.33c-1.35-0.32-3.76-0.41-3.88-0.98
                  c-0.47-2.26-0.34-4.68-0.15-7.02c0.03-0.39,1.45-0.92,2.24-0.95c3.28-0.11,6.57,0.01,9.86-0.06c1.98-0.04,2.74,0.75,2.71,2.77
                  c-0.09,5.93,0.03,11.87-0.07,17.8c-0.03,1.9,0.58,2.76,2.5,2.48c2.46-0.35,3.13,0.78,3.06,3.13c-0.18,5.94,0.59,5.22-5.32,5.25
                  c-4.29,0.02-8.58-0.06-12.87,0.03c-1.76,0.04-2.59-0.55-2.4-2.35c0.02-0.18,0-0.37,0-0.55
                  C216.23,145.03,216.23,145.03,221.22,144.22"></path>
              <path class="fill-color" d="M226.22,115.57c-1,0-2.04,0.16-2.99-0.06c-0.66-0.15-1.66-0.78-1.71-1.29c-0.21-1.89-0.21-3.82-0.02-5.71
                  c0.05-0.5,1.03-1.12,1.68-1.28c0.95-0.22,1.99-0.08,2.99-0.07c6,0.05,5.02-0.61,5.26,5.26c0.11,2.6-0.83,3.51-3.3,3.17
                  c-0.62-0.09-1.27-0.01-1.91-0.01V115.57z"></path>

          </svg></span>Query History</a></li>`);
  };
  buttons();

  //CONFIG_BEGIN

  var fieldDefs = {
    'name': {
      'label': '',
      'section': [GM_config.create('FMCSA file name settings'), 'We need this info to do stuff'],
      'type': 'hidden'
    },
    'minusday': {
      'label': 'Minus days',
      'type': 'int',
      'default': 1
    },
    'dateformat': {
      'label': "Date format",
      'type': 'text',
      'default': "MM DD YYYY"
    },
    'timezone': {
      'label': 'Timezone',
      'type': 'text',
      'default': 'America/Chicago'
    },
    'currenttime': {
      'label': 'Current time',
      'type': 'text',
      'default': moment(),
      'save': false
    },
    'comp_names':
    {
      'label': 'Comp replace ex. "COMP USA INC:COMP USA"',
      'type': 'textarea',
      'default': ''
    },
    'file_name_date': {
      'label': 'File name date',
      'options': ['Date from settings', 'Date from requested'],
      'type': 'select',
      'default': 'Date from requested'
    },


  };

  GM_config.init(
    {
      id: 'GM_config',
      title: 'Configurable Options Script',
      fields: fieldDefs,
      css: '#GM_config_section_1 .config_var, #GM_config_section_2 .config_var, #GM_config_section_3 .config_var { margin: 5% !important;display: inline !important; }',
      events:
      {
        open: function (doc) {
          doc.getElementById('GM_config_section_header_1').className = 'field_label';
          var customCSS = GM_config.fields['customCSS'].node;
          var validCSS = GM_config.fields['validCSS'].node;
          customCSS.value = validCSS.value;
          customCSS.addEventListener('change', function () {
            if (/\w+\s*\{\s*\w+\s*:\s*\w+[\s|\S]*\}/.test(customCSS.value))
              validCSS.value = customCSS.value;
          }, false);
        },
        save: function (values) {
          // All the values that aren't saved are passed to this function
          // for (i in values) alert(values[i]);
        }
      },
      'types':
      {
        'date': {
          'default': null,
          toNode: function (configId) {
            var field = this.settings,
              value = this.value,
              id = this.id,
              create = this.create,
              format = (field.format || 'mm/dd/yyyy').split('/'),
              slash = null,
              retNode = create('div', {
                className: 'config_var',
                id: configId + '_' + id + '_var',
                title: field.title || ''
              });

            // Save the format array to the field object so
            // it's easier to hack externally
            this.format = format;

            // Create the field lable
            retNode.appendChild(create('label', {
              innerHTML: field.label,
              id: configId + '_' + id + '_field_label',
              for: configId + '_field_' + id,
              className: 'field_label'
            }));

            // Create the inputs for each part of the date
            value = value ? value.split('/') : this['default'];
            for (var i = 0, len = format.length; i < len; ++i) {
              var props = {
                id: configId + '_field_' + id + '_' + format[i],
                type: 'text',
                size: format[i].length,
                value: value ? value[i] : '',
                onkeydown: function (e) {
                  var input = e.target;
                  if (input.value.length >= input.size)
                    input.value = input.value.substr(0, input.size - 1);
                }
              };

              // Jump to the next input once one is complete
              // This saves the user a little work
              if (i < format.length - 1) {
                slash = create(' / ');
                props.onkeyup = function (e) {
                  var input = e.target,
                    inputs = input.parentNode.getElementsByTagName('input'),
                    num = 0;

                  for (; num < inputs.length && input != inputs[num]; ++num);
                  if (input.value.length >= input.size)
                    inputs[num + 1].focus();
                };
              } else slash = null;

              // Actually create and append the input element
              retNode.appendChild(create('input', props));
              if (slash) retNode.appendChild(slash);
            }

            return retNode;
          },
          toValue: function () {
            var rval = null;
            if (this.wrapper) {
              var inputs = this.wrapper.getElementsByTagName('input');
              rval = '';

              // Join the field values together seperated by slashes
              for (var i = 0, len = inputs.length; i < len; ++i) {
                // Don't save values that aren't numbers
                if (isNaN(Number(inputs[i].value))) {
                  alert('Date is invalid');
                  return null;
                }
                rval += inputs[i].value + (i < len - 1 ? '/' : '');
              }
            }

            // We are just returning a string to be saved
            // If you want to use this value you'll want a Date object
            return rval;
          },
          reset: function () {
            // Empty all the input fields
            if (this.wrapper) {
              var inputs = this.wrapper.getElementsByTagName('input');
              for (var i = 0, len = inputs.length; i < len; ++i)
                inputs[i].value = '';
            }
          }
        }
      }
    });

  // Retrieve language setting
  var lang = GM_config.getValue('lang', 'en');

  // Fields in different languages
  var langDefs = {
    'en': // Fields in English
    {
      'lang':
      {
        'label': 'Choose Language',
        'type': 'select',
        'options': ['en', 'de'],
        'save': false // This field's value will NOT be saved
      }
    }

  };

  // Use field definitions for the stored language
  var fields = langDefs[lang];

  // The title for the settings panel in different languages
  var titles = {
    'en': 'Translations Dialog',
    'de': 'Übersetzungen Dialog'
  };
  var title = titles[lang];

  // Translations for the buttons and reset link
  var saveButton = { 'en': 'Save', 'de': 'Speichern' };
  var closeButton = { 'en': 'Close', 'de': 'Schließen' };
  var resetLink = {
    'en': 'Reset fields to default values',
    'de': 'Felder zurücksetzen auf Standardwerte'
  };

  var gmc_trans = new GM_configStruct(
    {
      'id': 'GM_config_trans', // The id used for this instance of GM_config
      'title': title,
      'fields': fields, // Fields object
      'events':
      {
        'init': function () {
          // You must manually set an unsaved value
          this.fields['lang'].value = lang;
        },
        'open': function (doc) {
          // translate the buttons
          var config = this;
          doc.getElementById(config.id + '_saveBtn').textContent = saveButton[lang];
          doc.getElementById(config.id + '_closeBtn').textContent = closeButton[lang];
          doc.getElementById(config.id + '_resetLink').textContent = resetLink[lang];
        },
        'save': function (values) { // All unsaved values are passed to save
          for (var i in values) {
            if (i == 'lang' && values[i] != lang) {
              var config = this;
              lang = values[i];

              // Use field definitions for the chosen language
              fields = langDefs[lang];
              config.fields['lang'].value = lang;

              // Use the title for the chose language
              title = titles[lang];

              // Re-initialize GM_config for the language change
              config.init({ 'id': config.id, title: title, 'fields': fields });

              // Refresh the config panel for the new language change
              config.close();
              config.open();

              // Save the chosen language for next time
              config.setValue('lang', lang);
            }
          }
        }
      }
    });
  //define where button will appear
  const where = document.querySelector("body > footer > div > div.row.footer-links > div:nth-child(1) > span > ul")
  const node = document.createElement("li");
  const anchor = document.createElement('a');
  anchor.setAttribute('id', 'settings');
  anchor.classList.add('set_btn');
  anchor.textContent = 'Open Settings';
  node.appendChild(anchor);

  where.appendChild(node);

  GM_addStyle(" \
    @media print {\
      #settings {\
      display: none;\
                 }\
               }\
  .set_btn { \
      cursor: pointer; \
  } \
  " );

  var settings_btn = document.querySelector("#settings");
  if (settings_btn) {
    settings_btn.addEventListener("click", function () { GM_config.open(); }, false);

  }
  //CONFIG_END
  //==================================================================================================
  //code starts here
  //2024 code
  var xpath_queryInfo = "//h2[contains(text(),'Query Overview')]"; // get block of query info
  var matchingElement = document.evaluate(xpath_queryInfo, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  var dataResult = [];
  var data = matchingElement.parentElement;
  var dataLabel = Array.from(data.getElementsByTagName('label'))
  var employer = data.querySelectorAll('[class$="detail-list"]')[0].previousElementSibling.textContent.split(": ")[1].split(' ('); // Get employer name and DOT
  var employerName = employer[0]; // Get Employer name
  var employerDOT = employer[1].split('# ')[1].slice(0, -1); // Get employer DOT number

  // add employer and DOT number to results array
  dataResult['Employer'] = employerName;
  dataResult['EmployerDOT'] = employerDOT;
  // parse label elements
  for (let elem of dataLabel) {
    var dataKey = elem.innerHTML;
    var dataValue = elem.nextSibling.data.trim();

    if (dataKey.toLowerCase().includes("Query Submitted".toLowerCase())) {
      dataValue = elem.nextElementSibling.innerHTML;
    } else if (dataKey.toLowerCase().includes("CDL".toLowerCase())) {
      dataKey = "CDL"
    }

    dataKey = dataKey.replace(/:$/, "");

    dataResult[dataKey] = dataValue;
  };
  //2024 code end

  var company = dataResult['Employer'];
  var initialWindowTitle = null;

  // initialize company nae replacement dictionary
  const comp_replace = GM_config.get('comp_names').split(/\r?\n/); // gets company name list from settings
  var comp_dict = []
  var name = ""
  comp_replace.forEach((item) => {
    name = item.split(':')
    comp_dict[name[0]] = name[1];
  });

  // getting company replacement name
  if (company in comp_dict) {
    company = comp_dict[company]
  }

  function formatDate(dateString) {
    const datePart = dateString.split(' '); // Split the string into date and time parts
    // Extract only the date part
    const trimmedDate = datePart[0];
    const dateParts = trimmedDate.split('/'); // Split the string into date parts

    if (dateParts.length === 3) {
      const year = dateParts[2];
      const month = dateParts[0].padStart(2, '0'); // Pad month with zero if needed
      const day = dateParts[1].padStart(2, '0'); // Pad day with zero if needed
      return `${month} ${day} ${year}`;
    }
    return null; // Return null if the input format is not as expected
  }

  function getRequestedDate() {
    // const item = getItemByParentText(GM_config.get('parent_text'), GM_config.get('item_text'), GM_config.get('parent_element'), GM_config.get('item_element'));
    const item = dataResult["Created"];
    const formattedDate = formatDate(item);
    switch (GM_config.get('file_name_date')) {
      case 'Date from settings':
        return moment().tz(GM_config.get('timezone')).subtract(GM_config.get('minusday'), 'days').format(GM_config.get('dateformat'));
      case 'Date from requested':
        return formattedDate;
    };
  };

  function pavadinimas() {
    'use strict';
    initialWindowTitle = window.document.title;
    window.document.title = getRequestedDate() + " CH " + dataResult['Name'].toUpperCase() + " " + company.toUpperCase();

  };

  pavadinimas();

