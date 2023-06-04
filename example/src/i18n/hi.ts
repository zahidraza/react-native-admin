import type { TranslationMessages } from '@jazasoft/react-native-admin';

const hindiTranslationMessages: TranslationMessages = {
  app: {
    name: 'ओप्ताफ्लोर',
    description: 'सुपरवाइजर',
    copyright: 'जज़ा सॉफ्टवेयर',
  },
  Screens: {
    RoleSelector: {
      name: 'रोल चुनिये',
      message: {
        select_role: 'रोल चुनिये',
      },
    },
    AccountTab: {
      name: 'अकाउंट',
    },
    Account: {
      name: 'अकाउंट',
      title: {
        profile: 'प्रोफाइल',
        settings: 'सेटिंग्स',
      },
      lang: {
        title: 'भाषा चुनिये',
        label: 'भाषा',
      },
      theme: {
        title: 'थीम चुनिये',
        label: 'थीम',
        value_automatic: 'ऑटोमैटिक',
        value_light: 'लाइट',
        value_dark: 'डार्क',
      },
      role: {
        title: 'रोल चुनिये',
        label: 'रोल',
      },
      profile: {
        full_name: 'पूरा नाम',
        department: 'डिपार्टमेंट',
        line: 'लाइन',
      },
    },
    Test: {
      name: 'टेस्ट',
    },
  },
  action: {
    add: 'ऐड',
    create: 'क्रिएट',
    save: 'सेव',
    next: 'आगे',
    submit: 'सबमिट',
    back: 'बैक',
    confirm: 'कन्फर्म',
    cancel: 'कैंसिल',
    delete: 'डिलीट',
    remove: 'रिमूव',
    edit: 'एडिट',
    update: 'अपडेट',
    refresh: 'रिफ्रेश',
    search: 'सर्च',
    filter: 'फ़िल्टर',
    sort: 'सॉर्ट',
    toggle_theme: 'टॉगल थीम',
  },
  message: {
    about: 'अबाउट',
    are_you_sure: 'अरे यु सूरे?',
    delete_content: 'अरे यु सूरे यू वांट तो डिलीट थिस आइटम?',
    delete_title: 'डिलीट %{नाम}',
    error: "ा क्लाइंट एरर ॉक्र्रेड एंड योर रिक्वेस्ट कोल्डन'त बे कम्प्लेटेड.",
    invalid_form: 'थे फॉर्म इस नॉट वैलिड. प्लीज चेक फॉर िर्रोर्स',
    loading: 'थे पेज इस लोडिंग',
    no: ' जस्ट ा मोमेंट प्लीज',
    yes: 'नो',
    bulk_delete_content: {
      one: 'अरे यु सूरे यू वांट तो डिलीट थिस %{element}?',
      other: 'अरे यु सूरे यू वांट तो डिलीट थेसे %{count} %{elements}?',
    },
    bulk_delete_title: {
      one: 'डिलीट %{element}',
      other: 'डिलीट %{count} %{element}',
    },
    bulk_update_content: {
      one: 'अरे यु सूरे यू वांट तो अपडेट थिस %{element}?',
      other: 'अरे यु सूरे यू वांट तो अपडेट थी %{count} %{elements}?',
    },
    bulk_update_title: {
      one: 'अपडेट %{element}',
      other: 'अपडेट %{count} %{element}',
    },
  },
  filter: {
    label: 'फ़िल्टर',
    sort_by: 'सोर्ट बाइ',
    apply: 'अप्लाई',
    clear: 'क्लियर',
    location: {
      department: 'डिपार्टमेंट',
      line: 'लाइन',
      section: 'सेक्शन',
    },
  },
  auth: {
    label: {
      username: 'यूजरनाम',
      password: 'पासवर्ड',
      old_password: 'पुराना पासवर्ड',
      new_password: 'नया पासवर्ड',
      confirm_new_password: 'कन्फर्म नया पासवर्ड',
      otp: 'ओ टी पी',
    },
    button: {
      login: 'लॉगिन',
      logout: 'लॉगआउट',
      forgot_password: 'फॉरगॉट पासवर्ड?',
      change_password: 'पासवर्ड बदलिये',
    },
    heading: {
      change_password: 'पासवर्ड बदलिये',
    },
    message: {
      login_error: 'ऑथेंटिकेशन फेल्ड. प्लीज रेट्री',
      password_change_success: 'पासवर्ड सफलता पुर्वक बदल दी गई',
      unsupported_role: 'रोल - [ %{roleIds} ] मोबाइल मे सपोर्टेड नहीं है. [ %{roles} ] रोल सपोर्टेड है',
    },
  },
  notification: {
    created: 'element क्रिएटेड',
    item_doesnt_exist: '%{element} डस नॉट एक्सिस्ट',
    server_error: 'सर्वर कम्युनिकेशन एरर',
    i18n_error: 'कन्नोत लोड थे ट्रान्सलेशन्स फॉर थे स्पेसिफ़िएड लैंग्वेज',
    canceled: 'एक्शन कांसेल्लेड',
    logged_out: 'योर सेशन हास् एंडेड',
    not_authorized: ' प्लीज रीकनेक्ट.',
    updated: {
      zero: '%{count} %{elements} अपडेटेड',
      one: '%{element} अपडेटेड',
      other: '%{count} %{elements} अपडेटेड',
    },
    deleted: {
      zero: '%{count} %{elements} देलेटेड',
      one: '%{element} देलेटेड',
      other: '%{count} %{elements} देलेटेड',
    },
  },
  validation: {
    required: 'रिक्वायर्ड',
    minLength: 'मस्ट बे %{मं} चरक्टेर्स ात लीस्ट',
    maxLength: 'मस्ट बे %{मैक्स} चरक्टेर्स और लेस्स',
    minValue: 'मस्ट बे ात लीस्ट %{मं}',
    maxValue: 'मस्ट बे %{मैक्स} और लेस्स',
    number: 'मस्ट बे ए नंबर',
    email: 'मस्ट बे अ वैलिड ईमेल',
    oneOf: 'मस्ट बे ओने ऑफ़: %{ओप्तिओंस}',
    regex: 'मस्ट मैच ा स्पेसिफिक फॉर्मेट (रेगएक्सप): %{पैटर्न}',
  },
};

export default hindiTranslationMessages;
