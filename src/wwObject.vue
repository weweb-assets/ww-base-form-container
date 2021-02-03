<template>
    <form
        :name="content.name"
        :autocomplete="content.autocomplete"
        @submit.prevent="submit"
        class="ww-form-container"
        :class="[formState, { editing: isEditing, selected: isSelected }]"
    >
        <wwLink v-show="false" ref="link" :ww-link="content.afterSubmitAction.link" />

        <div class="ww-form-container__relative">
            <wwLayout
                :class="{ hidden: formState === 'success' }"
                class="ww-form-container__content -normal"
                path="content"
            />
            <wwLayout
                :class="{ hidden: formState !== 'success' }"
                class="ww-form-container__content -success"
                path="successContent"
            />
            <wwLayout v-if="formState === 'error'" class="ww-form-container__content -error" path="errorContent" />
        </div>

        <!-- wwEditor:start -->
        <div class="ww-form-container__status label-xs" :class="formState">
            {{ formState }}
        </div>
        <div class="ww-form-container__menu">
            <wwEditorIcon small name="editor" />
        </div>
        <!-- wwEditor:end -->
    </form>
</template>

<script>
/* wwEditor:start */
import { getSettingsConfigurations, getAfterActionSubmitConfigurations } from './configurations';
/* wwEditor:end */

export default {
    name: '__COMPONENT_NAME__',
    props: {
        content: Object,
        /* wwEditor:start */
        wwEditorState: Object,
        /* wwEditor:end */
    },
    wwDefaultContent: {
        content: [
            { isWwObject: true, type: 'ww-form-input' },
            { isWwObject: true, type: 'ww-button' },
        ],
        successContent: [{ isWwObject: true, type: 'ww-text' }],
        errorContent: [{ isWwObject: true, type: 'ww-text' }],
        state: 'normal',
        name: '',
        autocomplete: true,
        submitAction: 'weweb-email',
        method: 'post',
        url: '',
        data: [],
        headers: [],
        queries: [],
        wewebEmail: {},
        airtable: {},
        afterSubmitAction: {
            type: 'none',
            link: {},
            customScript: {},
        },
    },
    /* wwEditor:start */
    wwEditorConfiguration({ content }) {
        return {
            settingsOptions: {
                state: {
                    path: 'state',
                    label: { en: 'Form state', fr: 'Status du form.' },
                    type: 'TextSelect',
                    options: {
                        options: [
                            { value: 'normal', label: { en: 'Normal', fr: 'Normal' } },
                            { value: 'success', label: { en: 'Success', fr: 'Succès' } },
                            { value: 'error', label: { en: 'Error', fr: 'Erreur' } },
                        ],
                    },
                },
                name: {
                    path: 'name',
                    label: { en: 'Form name', fr: 'Nom du form.' },
                    type: 'Text',
                    options: {
                        placeholder: 'newsletter',
                    },
                },
                autocomplete: {
                    path: 'autocomplete',
                    label: { en: 'Autocomplete', fr: 'Autocomplétion' },
                    type: 'OnOff',
                },
                submitAction: {
                    path: 'submitAction',
                    label: { en: 'Submit action', fr: 'Action au submit' },
                    type: 'TextSelect',
                    options: {
                        options: [
                            { value: 'custom-request', label: { en: 'Custom request', fr: 'Requête person.' } },
                            { value: 'weweb-email', label: { en: 'WeWeb email', fr: 'Email WeWeb' } },
                            { value: 'zapier-hook', label: { en: 'Zapier Hook', fr: 'Hook Zapier' } },
                            { value: 'airtable', label: { en: 'Airtable', fr: 'Airtable' } },
                        ],
                    },
                },
                ...getSettingsConfigurations(content.submitAction),
                data: {
                    path: 'data',
                    label: { en: 'Hidden input', fr: 'Input caché' },
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
                query: {
                    path: 'queries',
                    label: { en: 'Query var', fr: 'Variable de query' },
                    type: 'List',
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
                },
                afterSubmitAction: {
                    path: 'afterSubmitAction.type',
                    label: { en: 'Action after submit', fr: 'Action après le submit' },
                    type: 'TextSelect',
                    options: {
                        options: [
                            { value: 'none', label: { en: 'None', fr: 'Aucune' } },
                            { value: 'link', label: { en: 'Link', fr: 'Link' } },
                            { value: 'custom-script', label: { en: 'Custom script', fr: 'Script custom' } },
                        ],
                    },
                },
                ...getAfterActionSubmitConfigurations(content.afterSubmitAction.type),
            },
        };
    },
    /* wwEditor:end */
    data() {
        return {
            designName: wwLib.wwWebsiteData.getWebsiteName(),
            state: 'normal',
            /* wwEditor:start */
            designId: wwLib.wwWebsiteData.getInfo().id,
            apiUrl: wwLib.wwApiRequests._getApiUrl(),
            /* wwEditor:end */
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        isSelected() {
            /* wwEditor:start */
            return this.wwEditorState.isSelected;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        formState() {
            /* wwEditor:start */
            return this.content.state;
            /* wwEditor:end */
            /* wwFront:start */
            // eslint-disable-next-line no-unreachable
            return this.state;
            /* wwFront:end */
        },
    },
    /* wwEditor:start */
    watch: {
        'content.submitAction'() {
            switch (this.content.submitAction) {
                case 'weweb-email':
                    return this.$emit('update', {
                        method: 'post',
                        url: `${this.apiUrl}/design/${this.designId}/form/email`,
                        headers: [],
                        wewebEmail: {
                            recipients: [{ email: wwLib.$store.getters['manager/getUser'].email }],
                        },
                    });
                case 'custom-request':
                    return this.$emit('update', {
                        method: 'post',
                        url: '',
                        headers: [],
                        wewebEmail: {},
                    });
                case 'zapier-hook':
                    return this.$emit('update', {
                        method: 'post',
                        url: '',
                        headers: [{ key: 'Content-Type', value: 'application/x-www-form-urlencoded' }],
                        wewebEmail: {},
                    });
                case 'airtable':
                    return this.$emit('update', {
                        method: 'post',
                        url: '',
                        headers: [
                            { key: 'Content-Type', value: 'application/json' },
                            { key: 'Authorization', value: `Bearer ${this.content.airtable.apiKey}` },
                        ],
                        wewebEmail: {},
                    });
            }
        },
        'content.afterSubmitAction.type'() {
            switch (this.content.afterSubmitAction.type) {
                case 'none':
                    this.$emit('update', {
                        afterSubmitAction: {
                            type: 'none',
                            link: {},
                            customScript: {},
                        },
                    });
                    break;
                case 'link':
                    this.$emit('update', {
                        afterSubmitAction: {
                            type: 'link',
                            link: {
                                type: 'internal',
                                pageId: wwLib.$store.getters['websiteData/getPageId'],
                                sectionId: null,
                                targetBlank: false,
                            },
                            customScript: {},
                        },
                    });
                    break;
                case 'custom-script':
                    this.$emit('update', {
                        afterSubmitAction: {
                            type: 'custom-script',
                            link: {},
                            customScript: {},
                        },
                    });
                    break;
            }
        },
        'content.airtable.apiKey'() {
            this.$emit('update', {
                headers: [
                    { key: 'Content-Type', value: 'application/json' },
                    { key: 'Authorization', value: `Bearer ${this.content.airtable.apiKey}` },
                ],
            });
        },
        'content.airtable.baseKey'() {
            this.$emit('update', {
                url: `https://api.airtable.com/v0/${this.content.airtable.baseKey}/${this.content.airtable.tableName}`,
            });
        },
        'content.airtable.tableName'() {
            this.$emit('update', {
                url: `https://api.airtable.com/v0/${this.content.airtable.baseKey}/${this.content.airtable.tableName}`,
            });
        },
    },
    /* wwEditor:end */
    methods: {
        setState(state) {
            /* wwEditor:start */
            this.$emit('update', { state });
            /* wwEditor:end */
            /* wwFront:start */
            this.state = state;
            /* wwFront:end */
        },
        getComputedData(data) {
            switch (this.content.submitAction) {
                case 'weweb-email':
                    return {
                        designName: this.designName,
                        recipients: this.content.wewebEmail.recipients,
                        ...data,
                    };
                case 'airtable':
                    return { records: [{ fields: data }] };
                default:
                    return data;
            }
        },
        async submit(form) {
            try {
                if (this.formState === 'success' || this.formState === 'loading') return;

                this.setState('loading');

                // INIT DATA
                const data = {};

                // ADD DATA REQUEST
                for (const elem of form.srcElement.elements) {
                    if (elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA' || elem.nodeName === 'SELECT') {
                        data[elem.name] = elem.type === 'number' ? parseFloat(elem.value) : elem.value;
                    }
                }

                // ADD QUERY VAR
                for (const query of this.content.queries) {
                    const value = this.$route.query[query.key];
                    if (value) data[query.key] = value;
                }

                const headers = this.content.headers.reduce((headersObj, elem) => {
                    return { ...headersObj, [elem.key]: elem.value };
                }, {});

                // REQUEST
                await axios({
                    method: this.content.method,
                    url: this.content.url,
                    data: {
                        ...this.content.data.reduce((dataObj, elem) => {
                            return { ...dataObj, [elem.key]: elem.value };
                        }, {}),
                        ...this.getComputedData(data),
                    },
                    headers,
                });

                this.afterSubmitAction();

                // CHANGE STATUS
                this.setState('success');
            } catch (err) {
                // CHANGE STATUS
                this.setState('error');
                wwLib.wwLog.error(err);
            }
        },
        async afterSubmitAction() {
            switch (this.content.afterSubmitAction.type) {
                case 'link':
                    return this.$refs.link.$el.click();
                case 'custom-script':
                    return eval(this.content.afterSubmitAction.customScript.code);
            }
        },
    },
    mounted() {
        /* wwEditor:start */
        this.setState('normal');
        /* wwEditor:end */
    },
};
</script>

<style lang="scss" scoped>
.ww-form-container {
    box-sizing: border-box;
    &.loading {
        button[type='submit'] {
            pointer-events: none;
        }
    }
    &__relative {
        position: relative;
    }
    &__content {
        display: flex;
        flex-direction: column;
        width: 100%;
        &.-normal {
            transition: all 0.3s ease;
            transition-delay: 0.3s;
            &.hidden {
                opacity: 0;
                visibility: hidden;
                transition-delay: 0s;
            }
        }
        &.-success {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.3s ease;
            transition-delay: 0.3s;
            &.hidden {
                opacity: 0;
                transition-delay: 0s;
                visibility: hidden;
            }
        }
    }
    /* wwEditor:start */
    &__status {
        position: absolute;
        top: -1px;
        color: var(--ww-color-white);
        padding: var(--ww-spacing-00) var(--ww-spacing-01);
        border-radius: var(--ww-spacing-00);
        background-color: var(--ww-color-blue-500);
        z-index: 101;
        opacity: 0;
        pointer-events: none;
        right: -1px;
        &.error {
            background-color: var(--ww-color-red-500);
        }
        &.success {
            background-color: var(--ww-color-green-500);
        }
        &.loading {
            background-color: var(--ww-color-yellow-500);
        }
    }
    &.selected {
        > .ww-form-container__status {
            opacity: 1;
            pointer-events: all;
        }
    }
    &.editing:hover {
        & > .border {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 1px solid var(--ww-editor-color);
            pointer-events: none;
            z-index: 10;
        }
        > .ww-form-container__menu {
            opacity: 1;
            pointer-events: all;
        }
    }
    &__menu {
        display: flex;
        position: absolute;
        top: 5px;
        left: 0;
        transform: translate(-50%, -50%);
        border-radius: 100%;
        padding: var(--ww-spacing-01);
        transition: opacity 0.2s ease;
        z-index: 101;
        cursor: pointer;
        background-color: var(--ww-color-green-500);
        color: var(--ww-color-white);
        justify-content: center;
        align-items: center;
        opacity: 0;
        pointer-events: none;
        &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 30px;
            height: 30px;
        }
    }
    /* wwEditor:end */
}
</style>
