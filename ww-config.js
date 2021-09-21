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
                ],
            },
            defaultValue: 'weweb-email',
        },
        wewebEmailRecipients: {
            label: { en: 'Recipients', fr: 'Destinataires' },
            type: 'List',
            section: 'settings',
            options: {
                options: [
                    {
                        path: 'email',
                        type: 'Text',
                        options: {
                            placeholder: 'Email address',
                        },
                    },
                ],
            },
            hidden: content => content.submitAction !== 'weweb-email',
            defaultValue: [],
        },
        method: {
            label: { en: 'Type of request', fr: 'Type de requête' },
            type: 'TextSelect',
            section: 'settings',
            options: {
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
            },
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
            type: 'List',
            section: 'settings',
            options: {
                options: [
                    {
                        path: 'key',
                        type: 'Text',
                        options: {
                            placeholder: 'Key',
                        },
                    },
                    {
                        path: 'value',
                        type: 'Text',
                        options: {
                            placeholder: 'Value',
                        },
                    },
                ],
            },
            hidden: content => content.submitAction !== 'zapier-hook' && content.submitAction !== 'custom-request',
            defaultValue: [],
        },
        airtableApiKey: {
            label: { en: 'Api key', fr: "Clée de l'api" },
            type: 'Text',
            section: 'settings',
            options: {
                placeholder: 'key',
            },
            hidden: content => content.submitAction !== 'airtable',
        },
        airtableBaseKey: {
            label: { en: 'Base key', fr: 'Clée de la base' },
            type: 'Text',
            section: 'settings',
            options: {
                placeholder: 'key',
            },
            hidden: content => content.submitAction !== 'airtable',
        },
        airtableTableName: {
            label: { en: 'Table name', fr: 'Nom de la table' },
            type: 'Text',
            section: 'settings',
            options: {
                placeholder: 'Name',
            },
            hidden: content => content.submitAction !== 'airtable',
        },
        data: {
            label: { en: 'Hidden input', fr: 'Input caché' },
            type: 'List',
            section: 'settings',
            options: {
                options: [
                    {
                        path: 'key',
                        type: 'Text',
                        options: {
                            placeholder: 'Key',
                        },
                    },
                    {
                        path: 'value',
                        type: 'Text',
                        options: {
                            placeholder: 'Value',
                        },
                    },
                ],
            },
            defaultValue: [],
        },
        queries: {
            label: { en: 'Query var', fr: 'Variable de query' },
            type: 'List',
            section: 'settings',
            options: {
                options: [
                    {
                        path: 'key',
                        type: 'Text',
                        options: {
                            placeholder: 'Variable',
                        },
                    },
                ],
            },
            defaultValue: [],
        },
        afterSubmitActionType: {
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
            defaultValue: 'none',
        },
        afterSubmitActionLink: {
            label: { en: '', fr: '' },
            type: 'Link',
            section: 'settings',
            hidden: content => content.afterSubmitActionType !== 'link',
            defaultValue: {},
        },
        afterSubmitActionCustomScript: {
            label: { en: '', fr: '' },
            type: 'Script',
            section: 'settings',
            hidden: content => content.afterSubmitActionType !== 'custom-script',
            defaultValue: {},
        },
        afterErrorActionType: {
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
            defaultValue: 'none',
        },
        afterErrorActionLink: {
            label: { en: '', fr: '' },
            type: 'Link',
            section: 'settings',
            hidden: content => content.afterErrorActionType !== 'link',
            defaultValue: {},
        },
        afterErrorActionCustomScript: {
            label: { en: '', fr: '' },
            type: 'Script',
            section: 'settings',
            hidden: content => content.afterErrorActionType !== 'custom-script',
            defaultValue: {},
        },
    },
};
