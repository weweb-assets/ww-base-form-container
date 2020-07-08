import wwFormConfigPopup from './wwFormConfigPopup.vue';
import wwFormIdPopup from './wwFormIdPopup.vue';
import wwFormClassPopup from './wwFormClassPopup.vue';

wwLib.wwPopups.addPopup('wwFormConfigPopup', wwFormConfigPopup);
wwLib.wwPopups.addPopup('wwFormIdPopup', wwFormIdPopup);
wwLib.wwPopups.addPopup('wwFormClassPopup', wwFormClassPopup);

wwLib.wwPopups.addStory('WWFORM_ELEMENTS', {
    title: {
        en: 'Select Form element',
        fr: 'Sélectionner un élément de formulaire',
    },
    type: 'wwPopupList',
    buttons: null,
    storyData: {
        list: {
            SUBMIT: {
                separator: {
                    en: 'Action',
                    fr: 'Action',
                },
                title: {
                    en: 'Submit Button',
                    fr: `Bouton d'envoies`,
                },
                desc: {
                    en: 'To send all the form element data',
                    fr: `Pour envoyer toutes les données d'élément de formulaire`,
                },
                icon: 'wwi wwi-button',
                next: null,
                result: {
                    wwObjectType: 'ww-form-submit',
                },
            },
            TEXT: {
                separator: {
                    en: 'Inputs',
                    fr: 'Inputs',
                },
                title: {
                    en: 'Text',
                    fr: 'Texte',
                },
                desc: {
                    en: 'Firstname, name, address, etc.',
                    fr: 'Nom, prénom, adresse, etc.',
                },
                icon: 'wwi wwi-text',
                next: null,
                result: {
                    wwObjectType: 'ww-form-input',
                    wwObjectData: {
                        config: {
                            name: 'text',
                            type: 'text',
                            placeholder: {
                                en: 'Enter text...',
                                fr: 'Entrez du text...',
                            },
                        },
                    },
                },
            },
            EMAIL: {
                title: {
                    en: 'Email',
                    fr: 'Email',
                },
                desc: {
                    en: 'john@doe.com',
                    fr: 'john@doe.com',
                },
                icon: 'wwi wwi-newsletter',
                next: null,
                result: {
                    wwObjectType: 'ww-form-input',
                    wwObjectData: {
                        config: {
                            name: 'email',
                            type: 'email',
                            placeholder: {
                                en: 'Enter email...',
                                fr: 'Entrez une adresse email...',
                            },
                        },
                    },
                },
            },
            PASSWORD: {
                title: {
                    en: 'Password',
                    fr: 'Mot de passe',
                },
                desc: {
                    en: '**********',
                    fr: '**********',
                },
                icon: 'fas fa-key',
                next: null,
                result: {
                    wwObjectType: 'ww-form-input',
                    wwObjectData: {
                        config: {
                            name: 'password',
                            type: 'password',
                            placeholder: {
                                en: 'Enter password...',
                                fr: 'Entrez un mot de passe...',
                            },
                        },
                    },
                },
            },
            PHONE: {
                title: {
                    en: 'Phone',
                    fr: 'Téléphone',
                },
                desc: {
                    en: 'Match format of your choice like 123-45-678',
                    fr: 'Correspond au format de votre choix comme 123-45-678',
                },
                icon: 'fas fa-phone',
                next: null,
                result: {
                    wwObjectType: 'ww-form-input',
                    wwObjectData: {
                        config: {
                            name: 'phone',
                            type: 'phone',
                            placeholder: {
                                en: 'Enter phone number...',
                                fr: 'Entrez un numéro de téléphone...',
                            },
                        },
                    },
                },
            },
            TEXTAREA: {
                title: {
                    en: 'Textarea',
                    fr: 'Zone de texte',
                },
                desc: {
                    en: 'For large texts like messages',
                    fr: 'Pour de grand texte comme des messages',
                },
                icon: 'fas fa-align-justify',
                next: null,
                result: {
                    wwObjectType: 'ww-form-textarea',
                },
            },
            NUMBER: {
                title: {
                    en: 'Number',
                    fr: 'Nombre',
                },
                desc: {
                    en: 'To select an integer',
                    fr: 'Pour choisir un nombre',
                },
                icon: 'fas fa-square-root-alt',
                next: null,
                result: {
                    wwObjectType: 'ww-form-input',
                    wwObjectData: {
                        config: {
                            name: 'number',
                            type: 'number',
                            placeholder: {
                                en: 'Enter a number...',
                                fr: 'Entrez un nombre...',
                            },
                        },
                    },
                },
            },
            CHECKBOX: {
                separator: {
                    en: 'Selectors',
                    fr: 'Sélecteurs',
                },
                title: {
                    en: 'Checkbox',
                    fr: 'Case à cocher',
                },
                desc: {
                    en: 'To pick a proposition',
                    fr: 'Pour choisir une proposition',
                },
                icon: 'far fa-check-square',
                next: null,
                result: {
                    wwObjectType: 'ww-form-checkbox',
                },
            },
            RADIO: {
                title: {
                    en: 'Radio',
                    fr: 'Radio',
                },
                desc: {
                    en: 'To select one proposition',
                    fr: 'Pour choisir une propositions',
                },
                icon: 'far fa-dot-circle',
                next: null,
                result: {
                    wwObjectType: 'ww-form-radio',
                },
            },
            DROPDOWN: {
                title: {
                    en: 'Dropdown',
                    fr: 'Menu déroulant',
                },
                desc: {
                    en: 'To pick a value from a menu',
                    fr: 'Pour choisir une valeur depuis un menu déroulant',
                },
                icon: 'wwi wwi-chevron-down',
                next: null,
                result: {
                    wwObjectType: 'ww-form-dropdown',
                },
            },
            // RANGE: {
            //     title: {
            //         en: 'Range',
            //         fr: ''
            //     },
            //     desc: {
            //         en: 'To select between two values',
            //         fr: 'Pour choisir entre deux valeurs'
            //     },
            //     // next: 'WWFORM_INPUT_CONFIG'
            // },
            DATE: {
                separator: {
                    en: 'Spécific',
                    fr: 'Spécifique',
                },
                title: {
                    en: 'Date',
                    fr: 'Date',
                },
                desc: {
                    en: 'Open a date picker popup',
                    fr: 'Ouvre un sélecteur de date',
                },
                icon: 'far fa-calendar-minus',
                next: null,
                result: {
                    wwObjectType: 'ww-form-input',
                    wwObjectData: {
                        config: {
                            name: 'date',
                            type: 'date',
                            placeholder: {
                                en: 'Enter a date...',
                                fr: 'Entrez une date...',
                            },
                        },
                    },
                },
            },
            TIME: {
                title: {
                    en: 'Time',
                    fr: 'Heure',
                },
                desc: {
                    en: 'Open a time picker popup',
                    fr: `Ouvre un sélecteur d'heure`,
                },
                icon: 'far fa-clock',
                next: null,
                result: {
                    wwObjectType: 'ww-form-input',
                    wwObjectData: {
                        config: {
                            name: 'time',
                            type: 'time',
                            placeholder: {
                                en: 'Enter a time...',
                                fr: 'Entrez une heure...',
                            },
                        },
                    },
                },
            },
            // FILE: {
            //     title: {
            //         en: 'File',
            //         fr: 'Fichier'
            //     },
            //     desc: {
            //         en: 'Open a upload popup',
            //         fr: 'Ouvrir une popup de téléchargement'
            //     },
            //     icon: 'wwi wwi-image',
            //     // next: 'WWFORM_INPUT_CONFIG'
            // },
            // COLORS: {
            //     title: {
            //         en: 'Colors',
            //         fr: 'Couleurs'
            //     },
            //     desc: {
            //         en: 'Open a color picker',
            //         fr: 'Ouvrir un sélecteur de couleur'
            //     },
            //     icon: 'wwi wwi-color',
            //     // next: 'WWFORM_INPUT_CONFIG'
            // },
            CAPTCHA_V2: {
                title: {
                    en: 'Captcha v2 Google',
                    fr: 'Captcha v2 Google',
                },
                desc: {
                    en: 'To prevent robot from sending you a message',
                    fr: 'Pour empêcher des robots de vous envoyer un message',
                },
                icon: 'far fa-square',
                next: null,
                result: {
                    wwObjectType: 'ww-form-captcha',
                },
            },
        },
    },
});

wwLib.wwPopups.addStory('WW_FORM_CONFIG_POPUP', {
    title: {
        en: 'Form Configuration',
        fr: `Configuration du formulaire`,
    },
    type: 'wwFormConfigPopup',
    buttons: {
        OK: {
            text: {
                en: 'Ok',
                fr: 'Valider',
            },
            next: false,
        },
    },
});

wwLib.wwPopups.addStory('WW_FORM_ID_POPUP', {
    title: {
        en: 'Form Id',
        fr: `Id du formulaire`,
    },
    type: 'wwFormIdPopup',
    buttons: {
        OK: {
            text: {
                en: 'Ok',
                fr: 'Valider',
            },
            next: false,
        },
    },
});

wwLib.wwPopups.addStory('WW_FORM_CLASS_POPUP', {
    title: {
        en: 'Form Class',
        fr: `Class du formulaire`,
    },
    type: 'wwFormClassPopup',
    buttons: {
        OK: {
            text: {
                en: 'Ok',
                fr: 'Valider',
            },
            next: false,
        },
    },
});

wwLib.wwPopups.addStory('WW_FORM_OPTIONS', {
    title: {
        en: 'Edit Form',
        fr: 'Editer le formulaire',
    },
    type: 'wwPopupEditWwObject',
    buttons: null,
    storyData: {
        list: {
            ACTION_API: {
                separator: {
                    en: 'CONFIGURATION',
                    fr: 'CONFIGURATION',
                },
                title: {
                    en: 'Form Configuration',
                    fr: 'Configuration du formulaire',
                },
                desc: {
                    en: '',
                    fr: '',
                },
                icon: 'wwi wwi-config',
                next: 'WW_FORM_CONFIG_POPUP',
            },
            ID: {
                title: {
                    en: 'Form Id',
                    fr: 'Id du formulaire',
                },
                desc: {
                    en: 'Edit the attribute ID',
                    fr: "Modifier l'attribut ID",
                },
                icon: 'wwi wwi-icon',
                next: 'WW_FORM_ID_POPUP',
            },
            CLASS: {
                title: {
                    en: 'Form Class',
                    fr: 'Classes du formulaire',
                },
                desc: {
                    en: 'Edit the class list',
                    fr: 'Modifier la liste de classe',
                },
                icon: 'wwi wwi-edit',
                next: 'WW_FORM_CLASS_POPUP',
            },
        },
    },
});
