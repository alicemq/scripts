// ==UserScript==
// @name         FMCSA File print name change
// @namespace    fmcsa_file_print_change
// @version      0.1
// @description  File print cleanup
// @author       alicemq
// @match        https://clearinghouse.fmcsa.dot.gov/*
// @match *://*/*
// @match file:///C:/Users/z/Downloads/04-26-2023-CH-JAMES-DIPPEL-ARTIRA-TRANSPORTATION-INC.html
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
// @require       https://raw.githubusercontent.com/alicemq/scripts/main/libs/GM_config-master/gm_config.js
// @require       https://raw.githubusercontent.com/alicemq/scripts/main/libs/moment.js
// @require       https://raw.githubusercontent.com/alicemq/scripts/main/libs/moment-timezone.js
// @require       https://raw.githubusercontent.com/alicemq/scripts/main/libs/moment-timezone-with-data.js
// @include       https://openuserjs.org/scripts/sizzle/The_GM_config_Unit_Test
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox. */

/* jshint esversion: 5 */
/* globals GM_config, GM_configStruct */
// ==/UserScript==

//CONFIG_BEGIN

var fieldDefs = {
    'name': {
        'label': GM_config.create('Name'),
        'section': [GM_config.create('FMCSA file name settings'), 'We need this info to do stuff'],
        'type': 'text',
        'default': 'Joe Simmons'
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
    'newtime': {
        'label': 'neveikia dar',
        'type': 'text',
        'default': moment(),
       'save': false
    },
    'comp_names':
    {
      'label': 'Comp replace ex. "COMP USA INC:COMP USA"',
      'type': 'textarea',
      'default': ''
    }

};

GM_config.init(
{
  id: 'GM_config',
  title: 'Configurable Options Script',
  fields: fieldDefs,
  css: '#GM_config_section_1 .config_var, #GM_config_section_2 .config_var, #GM_config_section_3 .config_var { margin: 5% !important;display: inline !important; }',
  events:
  {
    open: function(doc) {
      doc.getElementById('GM_config_section_header_1').className = 'field_label';
      var customCSS = GM_config.fields['customCSS'].node;
      var validCSS = GM_config.fields['validCSS'].node;
      customCSS.value = validCSS.value;
      customCSS.addEventListener('change', function () {
        if(/\w+\s*\{\s*\w+\s*:\s*\w+[\s|\S]*\}/.test(customCSS.value))
          validCSS.value = customCSS.value;
      }, false);
    },
    save: function(values) {
      // All the values that aren't saved are passed to this function
      // for (i in values) alert(values[i]);
    }
  },
  'types':
  {
    'date': {
      'default': null,
        toNode: function(configId) {
          var field = this.settings,
              value = this.value,
              id = this.id,
              create = this.create,
              format = (field.format || 'mm/dd/yyyy').split('/'),
              slash = null,
              retNode = create('div', { className: 'config_var',
                id: configId + '_' + id + '_var',
                title: field.title || '' });

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
              onkeydown: function(e) {
                var input = e.target;
                if (input.value.length >= input.size)
                  input.value = input.value.substr(0, input.size - 1);
              }
            };

            // Jump to the next input once one is complete
            // This saves the user a little work
            if (i < format.length - 1) {
              slash = create(' / ');
              props.onkeyup = function(e) {
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
        toValue: function() {
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
        reset: function() {
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
var saveButton = {'en': 'Save', 'de': 'Speichern'};
var closeButton = {'en': 'Close', 'de': 'Schließen'};
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
    'init': function()
    {
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
    'save': function(values) { // All unsaved values are passed to save
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



$("body").append ( '<button class="set_btn" id="settings">Open Settings</button> \
                  ' );
GM_addStyle ( " \
    @media print {\
      #settings {\
      display: none;\
  }\
}\
             .set_btn { \
	background:linear-gradient(to bottom, #f0c911 5%, #f2ab1e 100%); \
	background-color:#f0c911; \
	border-radius:6px; \
	border:1px solid #e65f44; \
	display:inline-block; \
	cursor:pointer; \
	color:#c92200; \
	font-family:Arial; \
	font-size:18px; \
	font-weight:bold; \
	padding:8px 24px; \
	text-decoration:none; \
    position: fixed; \
    top: 0; \
    z-index: 999999999;\
} \
.set_btn:hover { \
background:linear-gradient(to bottom, #f2ab1e 5%, #f0c911 100%); \
	background-color:#f2ab1e; \
} \
.set_btn:active { \
    background:linear-gradient(to bottom, #f2ab1e 5%, #f0c911 100%); \
	background-color:#f2ab1e; \
	position: fixed; \
    top: 0; \
    z-index: 999999999;\
} \
" );

var settings_btn = document.querySelector ("#settings");
if (settings_btn) {
    settings_btn.addEventListener("click", function() { GM_config.open(); }, false);

}
//CONFIG_END

var company;
var comp_search = "Employer Conducting Query: ";
var bTags = document.getElementsByTagName("h5");
var initialWindowTitle = null;
var aTags = document.getElementsByTagName("label");
var searchText = "Name:";
var found;
var trim_end_DOT = "USDOT";

for (var i = 0; i < aTags.length; i++) {
  if (aTags[i].textContent == searchText) {
    found = aTags[i].nextSibling.textContent;
    break;
  }
}

for (var h = 0; h < bTags.length; h++) {
  if (bTags[h].textContent.startsWith(comp_search)) {

      company = bTags[h].textContent.replace(comp_search,"");
    break;
  }
}

const comp_replace = GM_config.get('comp_names').split(/\r?\n/);

var comp_dict = []
var name = ""
comp_replace.forEach((item) => {
   name = item.split(':')
  comp_dict[name[0]] = name[1];
});

if ( company.includes(trim_end_DOT)) {
company = company.substring( 0, company.indexOf( " (USDOT" ) ).trim();
}
else {
console.log(company)
}

if (company in comp_dict) {
    company = comp_dict[company]
}

function pavadinimas() {
    'use strict';
initialWindowTitle = window.document.title;
    window.document.title = moment().tz(GM_config.get('timezone')).subtract(GM_config.get('minusday'), 'days').format(GM_config.get('dateformat')) + " CH "+ found.toUpperCase() +" " + company.toUpperCase();
};
console.log(pavadinimas());
pavadinimas();

