const WEWEB_EMAIL_SETTINGS = {
    recipients: {
        path: 'wewebEmail.recipients',
        label: { en: 'Recipients', fr: 'fr' },
        type: 'List',
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
    },
};

const CUSTOM_REQUEST_SETTINGS = {
    method: {
        path: 'method',
        label: { en: 'Type of request', fr: 'fr' },
        type: 'TextSelect',
        options: {
            options: [
                { value: 'post', label: { en: 'POST', fr: 'POST' } },
                { value: 'get', label: { en: 'GET', fr: 'GET' } },
                { value: 'put', label: { en: 'PUT', fr: 'PUT' } },
                { value: 'patch', label: { en: 'PATCH', fr: 'PATCH' } },
                { value: 'delete', label: { en: 'DELETE', fr: 'DELETE' } },
            ],
        },
    },
    target: {
        path: 'url',
        label: { en: 'Target', fr: 'fr' },
        type: 'Text',
        options: {
            placeholder: 'https://www...',
        },
    },
    headers: {
        path: 'headers',
        label: { en: 'Request headers', fr: 'fr' },
        type: 'List',
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
    },
};

export const getSettingsConfigurations = submitAction => {
    switch (submitAction) {
        case 'weweb-email':
            return WEWEB_EMAIL_SETTINGS;
        default:
            return CUSTOM_REQUEST_SETTINGS;
    }
};
