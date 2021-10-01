export default {
    editor: {
        label: {
            fr: 'Conteneur de formulaire',
            en: 'Form Container',
        },
        menuOptions: {
            quick: {
                sections: ['state'],
            },
        },
    },
    triggerEvents: [
        { name: 'submit', label: { en: 'On submit' } },
        { name: 'submit-error', label: { en: 'On submit error' } },
    ],
    properties: {
        state: {
            label: { en: 'Form state', fr: 'Status du form.' },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { value: 'normal', label: { en: 'Normal', fr: 'Normal' } },
                    { value: 'success', label: { en: 'Success', fr: 'Succès' } },
                    { value: 'error', label: { en: 'Error', fr: 'Erreur' } },
                ],
            },
            editorOnly: true,
            defaultValue: 'normal',
        },
        content: {
            hidden: true,
            defaultValue: [
                { isWwObject: true, type: 'ww-form-input' },
                { isWwObject: true, type: 'ww-button' },
            ],
        },
        successContent: {
            hidden: true,
            defaultValue: [{ isWwObject: true, type: 'ww-text' }],
        },
        errorContent: {
            hidden: true,
            defaultValue: [{ isWwObject: true, type: 'ww-text' }],
        },
        name: {
            label: { en: 'Form name', fr: 'Nom du form.' },
            section: 'settings',
            type: 'Text',
            options: {
                placeholder: 'newsletter',
            },
            defaultValue: '',
        },
        autocomplete: {
            section: 'settings',
            label: { en: 'Autocomplete', fr: 'Autocomplétion' },
            type: 'OnOff',
            defaultValue: true,
        },
        submitAction: {
            label: { en: 'Submit action', fr: 'Action au submit' },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { value: 'custom-request', label: { en: 'Custom request', fr: 'Requête person.' } },
                    { value: 'weweb-email', label: { en: 'WeWeb email', fr: 'Email WeWeb' } },
                    { value: 'zapier-hook', label: { en: 'Zapier Hook', fr: 'Hook Zapier' } },
                    { value: 'airtable', label: { en: 'Airtable', fr: 'Airtable' } },
                    { value: 'none', label: { en: 'None', fr: 'None' } },
                ],
            },
            defaultValue: 'weweb-email',
        },
        wewebEmail: {
            type: 'Object',
            section: 'settings',
            options: {
                item: {
                    recipients: {
                        label: { en: 'Recipients', fr: 'Destinataires' },
                        type: 'Array',
                        options: {
                            item: {
                                type: 'Object',
                                options: {
                                    item: {
                                        email: {
                                            type: 'Text',
                                            options: { placeholder: 'Email address' },
                                            bindable: true,
                                            defaultValue: '',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            hidden: content => content.submitAction !== 'weweb-email',
            defaultValue: { recipients: [] },
        },
        method: {
            label: { en: 'Type of request', fr: 'Type de requête' },
            type: 'TextSelect',
            section: 'settings',
            options: content => ({
                options: [
                    { value: 'post', label: { en: 'POST', fr: 'POST' } },
                    { value: 'get', label: { en: 'GET', fr: 'GET' } },
                    { value: 'put', label: { en: 'PUT', fr: 'PUT' } },
                    ...(content.submitAction === 'custom-request'
                        ? [
                              { value: 'put', label: { en: 'PUT', fr: 'PUT' } },
                              { value: 'patch', label: { en: 'PATCH', fr: 'PATCH' } },
                              { value: 'delete', label: { en: 'DELETE', fr: 'DELETE' } },
                          ]
                        : []),
                ],
            }),
            hidden: content => content.submitAction !== 'zapier-hook' && content.submitAction !== 'custom-request',
            defaultValue: 'post',
        },
        url: {
            label: { en: 'Target', fr: 'Cible' },
            type: 'Text',
            section: 'settings',
            options: content => ({
                placeholder: content.submitAction === 'zapier-hook' ? 'https://hooks.zapier.com/...' : 'https://www...',
            }),
            hidden: content => content.submitAction !== 'zapier-hook' && content.submitAction !== 'custom-request',
            defaultValue: '',
        },
        headers: {
            label: { en: 'Request headers', fr: 'Entêtes de requête' },
            section: 'settings',
            type: 'Array',
            options: {
                item: {
                    type: 'Object',
                    options: {
                        item: {
                            key: {
                                type: 'Text',
                                options: {
                                    placeholder: 'Key',
                                },
                            },
                            path: {
                                type: 'Text',
                                options: {
                                    placeholder: 'Value',
                                },
                            },
                        },
                    },
                },
            },
            hidden: content => content.submitAction !== 'zapier-hook' && content.submitAction !== 'custom-request',
            defaultValue: [],
        },
        airtable: {
            type: 'Object',
            section: 'settings',
            options: {
                item: {
                    apiKey: {
                        label: { en: 'Api key', fr: "Clée de l'api" },
                        type: 'Text',
                        section: 'settings',
                        options: { placeholder: 'key' },
                    },
                    baseKey: {
                        label: { en: 'Base key', fr: 'Clée de la base' },
                        type: 'Text',
                        section: 'settings',
                        options: { placeholder: 'key' },
                    },
                    tableName: {
                        label: { en: 'Table name', fr: 'Nom de la table' },
                        type: 'Text',
                        section: 'settings',
                        options: { placeholder: 'Name' },
                    },
                },
            },
            hidden: content => content.submitAction !== 'airtable',
            defaultValue: {},
        },
        data: {
            label: { en: 'Hidden input', fr: 'Input caché' },
            type: 'Array',
            section: 'settings',
            options: {
                item: {
                    type: 'Object',
                    section: 'settings',
                    options: {
                        item: {
                            key: {
                                type: 'Text',
                                options: { placeholder: 'Key' },
                            },
                            value: {
                                type: 'Text',
                                options: { placeholder: 'Value' },
                            },
                        },
                    },
                },
            },
            defaultValue: [],
        },
        queries: {
            label: { en: 'Query var', fr: 'Variable de query' },
            type: 'Array',
            section: 'settings',
            options: {
                item: {
                    type: 'Text',
                    options: {
                        placeholder: 'Variable',
                    },
                },
            },
            defaultValue: [],
        },
        afterSubmitAction: {
            type: 'Object',
            section: 'settings',
            options: {
                item: {
                    type: {
                        label: { en: 'Action after submit', fr: 'Action après le submit' },
                        type: 'TextSelect',
                        section: 'settings',
                        options: {
                            options: [
                                { value: 'none', label: { en: 'None', fr: 'Aucune' } },
                                { value: 'link', label: { en: 'Link', fr: 'Link' } },
                                { value: 'custom-script', label: { en: 'Custom script', fr: 'Script custom' } },
                            ],
                        },
                    },
                    link: {
                        label: { en: '', fr: '' },
                        type: 'Link',
                        section: 'settings',
                        hidden: content => content.afterSubmitAction.type !== 'link',
                    },
                    customScript: {
                        label: { en: '', fr: '' },
                        type: 'Script',
                        section: 'settings',
                        hidden: content => content.afterSubmitAction.type !== 'custom-script',
                    },
                },
            },
            defaultValue: { type: 'none' },
        },
        afterErrorAction: {
            type: 'Object',
            section: 'settings',
            options: {
                item: {
                    type: {
                        label: { en: 'Action after error', fr: 'Action après une erreur' },
                        type: 'TextSelect',
                        section: 'settings',
                        options: {
                            options: [
                                { value: 'none', label: { en: 'None', fr: 'Aucune' } },
                                { value: 'link', label: { en: 'Link', fr: 'Link' } },
                                { value: 'custom-script', label: { en: 'Custom script', fr: 'Script custom' } },
                            ],
                        },
                    },
                    link: {
                        label: { en: '', fr: '' },
                        type: 'Link',
                        section: 'settings',
                        hidden: content => content.afterErrorAction.type !== 'link',
                    },
                    customScript: {
                        label: { en: '', fr: '' },
                        type: 'Script',
                        section: 'settings',
                        hidden: content => content.afterErrorAction.type !== 'custom-script',
                    },
                },
            },
            defaultValue: { type: 'none' },
        },
    },
};
