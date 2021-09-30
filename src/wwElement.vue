<template>
    <form
        :name="content.name"
        :autocomplete="content.autocomplete"
        class="ww-form-container"
        :class="[formState, { editing: isEditing, selected: isSelected }]"
        @submit.prevent="submit"
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
export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['update:sidepanel-content', 'update:content:effect', 'trigger-event'],
    data() {
        return {
            designName: wwLib.wwWebsiteData.getWebsiteName(),
            state: 'normal',
            remountKey: 0,
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
            return this.wwEditorState.sidepanelContent.state;
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
                    return this.$emit('update:content:effect', {
                        method: 'post',
                        url: `${this.apiUrl}/design/${this.designId}/form/email`,
                        headers: [],
                        wewebEmail: {
                            recipients: [{ email: wwLib.wwEditorHelper.getUser().email }],
                        },
                    });
                case 'custom-request':
                    return this.$emit('update:content:effect', {
                        method: 'post',
                        url: '',
                        headers: [],
                        wewebEmail: {},
                    });
                case 'zapier-hook':
                    return this.$emit('update:content:effect', {
                        method: 'post',
                        url: '',
                        headers: [{ key: 'Content-Type', value: 'application/x-www-form-urlencoded' }],
                        wewebEmail: {},
                    });
                case 'airtable': {
                    const airtable = this.content.airtable || {};
                    return this.$emit('update:content:effect', {
                        method: 'post',
                        url: `https://api.airtable.com/v0/${airtable.baseKey}/${airtable.tableName}`,
                        headers: [
                            { key: 'Content-Type', value: 'application/json' },
                            { key: 'Authorization', value: `Bearer ${airtable.apiKey}` },
                        ],
                        wewebEmail: {},
                    });
                }
            }
        },
        'content.afterSubmitAction.type'() {
            switch (this.content.afterSubmitAction.type) {
                case 'none':
                    this.$emit('update:content:effect', {
                        afterSubmitAction: {
                            type: 'none',
                            link: {},
                            customScript: {},
                        },
                    });
                    break;
                case 'link':
                    this.$emit('update:content:effect', {
                        afterSubmitAction: {
                            type: 'link',
                            link: {
                                type: 'internal',
                                pageId: wwLib.wwWebsiteData.getCurrentPageId(),
                                sectionId: null,
                                targetBlank: false,
                            },
                            customScript: {},
                        },
                    });
                    break;
                case 'custom-script':
                    this.$emit('update:content:effect', {
                        afterSubmitAction: {
                            type: 'custom-script',
                            link: {},
                            customScript: {},
                        },
                    });
                    break;
            }
        },
        'content.afterErrorAction.type'() {
            switch (this.content.afterErrorAction.type) {
                case 'none':
                    this.$emit('update:content:effect', {
                        afterErrorAction: {
                            type: 'none',
                            link: {},
                            customScript: {},
                        },
                    });
                    break;
                case 'link':
                    this.$emit('update:content:effect', {
                        afterErrorAction: {
                            type: 'link',
                            link: {
                                type: 'internal',
                                pageId: wwLib.wwWebsiteData.getCurrentPageId(),
                                sectionId: null,
                                targetBlank: false,
                            },
                            customScript: {},
                        },
                    });
                    break;
                case 'custom-script':
                    this.$emit('update:content:effect', {
                        afterErrorAction: {
                            type: 'custom-script',
                            link: {},
                            customScript: {},
                        },
                    });
                    break;
            }
        },
        'content.airtable.apiKey'() {
            this.$emit('update:content:effect', {
                headers: [
                    { key: 'Content-Type', value: 'application/json' },
                    { key: 'Authorization', value: `Bearer ${this.content.airtable.apiKey}` },
                ],
            });
        },
        'content.airtable.baseKey'() {
            this.$emit('update:content:effect', {
                url: `https://api.airtable.com/v0/${this.content.airtable.baseKey}/${this.content.airtable.tableName}`,
            });
        },
        'content.airtable.tableName'() {
            this.$emit('update:content:effect', {
                url: `https://api.airtable.com/v0/${this.content.airtable.baseKey}/${this.content.airtable.tableName}`,
            });
        },
    },
    mounted() {
        this.setState('normal');
    },
    /* wwEditor:end */
    methods: {
        setState(state) {
            /* wwEditor:start */
            this.$emit('update:sidepanel-content', { path: 'state', value: state });
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
                /* wwEditor:start */
                if (this.isEditing) {
                    return false;
                }
                /* wwEditor:end */

                if (this.formState === 'success' || this.formState === 'loading') return;

                this.setState('loading');

                // INIT DATA
                const data = {};

                // ADD DATA REQUEST
                for (const elem of form.srcElement.elements) {
                    if (elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA' || elem.nodeName === 'SELECT') {
                        switch (elem.type) {
                            case 'number':
                                data[elem.name] = parseFloat(elem.value);
                                break;
                            case 'date':
                                data[elem.name] = new Date(elem.value).toUTCString();
                                break;
                            case 'checkbox':
                                data[elem.name] = elem.value === 'on' ? true : false;
                                break;
                            default:
                                data[elem.name] = elem.value;
                                break;
                        }
                    }

                    if (
                        elem.classList.contains('g-recaptcha-response') &&
                        wwLib.getFrontWindow().grecaptcha.getResponse() === ''
                    ) {
                        const errorMessage = wwLib.getFrontDocument().createElement('p');
                        errorMessage.innerHTML = 'Invalid reCAPTCHA. Please try again';
                        errorMessage.style.color = '#ff0000';
                        errorMessage.style.fontSize = '12px';
                        elem.parentNode.appendChild(errorMessage);

                        setTimeout(() => {
                            elem.parentNode.removeChild(errorMessage);
                        }, 8000);
                        throw new Error();
                    }
                }

                // ADD QUERY VAR
                for (const query of this.content.queries) {
                    const value = this.$route.query[query];
                    if (value) data[query] = value;
                }

                const headers = this.content.headers.reduce((headersObj, elem) => {
                    return { ...headersObj, [elem.key]: elem.value };
                }, {});

                const formData = {
                    ...this.content.data.reduce((dataObj, elem) => {
                        return { ...dataObj, [elem.key]: elem.value };
                    }, {}),
                    ...this.getComputedData(data),
                };

                // REQUEST
                await axios({
                    method: this.content.method,
                    url: this.content.url,
                    data: formData,
                    headers,
                });

                this.$emit('trigger-event', { name: 'submit', payload: { formData: data } });
                this.afterSubmitAction();

                // CHANGE STATUS
                this.setState('success');
            } catch (err) {
                // CHANGE STATUS
                this.setState('error');

                this.$emit('trigger-event', { name: 'submit-error', payload: { formError: err } });
                this.afterErrorAction();

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
        async afterErrorAction() {
            switch (this.content.afterErrorAction.type) {
                case 'link':
                    return this.$refs.link.$el.click();
                case 'custom-script':
                    return eval(this.content.afterErrorAction.customScript.code);
            }
        },
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
