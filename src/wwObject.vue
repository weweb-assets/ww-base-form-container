<template>
    <div class="ww-form">
        <!-- wwManager:start -->
        <wwOrangeButton class="ww-orange-button" v-if="wwObjectCtrl.getSectionCtrl().getEditMode() == 'CONTENT'"></wwOrangeButton>
        <div class="ww-form-status" :class="status" v-if="wwObjectCtrl.getSectionCtrl().getEditMode() == 'CONTENT'">Form status: {{ status }}</div>
        <!-- wwManager:end -->

        <form :id="wwObject.content.data.id" :name="wwObject.content.data.config.name" :autocomplete="wwObject.content.data.config.autocomplete" @submit.prevent="submit" :class="wwObject.content.data.class">
            <!-- FORM CONTENT -->
            <wwLayoutColumn
                ref="content"
                tag="div"
                class="ww-obj"
                ww-default="ww-form-input"
                :ww-list="wwObject.content.data.content"
                @ww-add="add(wwObject.content.data.content, $event)"
                @ww-remove="remove(wwObject.content.data.content, $event)"
            >
                <wwObject v-for="wwObj in wwObject.content.data.content" :key="wwObj.uniqueId" :ww-object="wwObj"></wwObject>
            </wwLayoutColumn>
        </form>
    </div>
</template>

<script>
/* wwManager:start */
import { GET_FORM_CONFIG, CREATE_FORM_CONFIG, UPDATE_FORM_CONFIG } from './graphql';
import './popup';
/* wwManager:end */

export default {
    name: 'ww-form-container',
    props: {
        wwObjectCtrl: Object
    },
    data() {
        return {
            form: null,
            status: 'default'
        };
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        }
    },
    mounted() {
        this.init();
        this.$emit('ww-loaded', this);
    },
    methods: {
        async init() {
            this.wwObject.content.data.content = this.wwObject.content.data.content || [];
            this.wwObject.content.data.config = this.wwObject.content.data.config || {};

            this.wwObjectCtrl.update(this.wwObject);

            this.form = this.$el.querySelector('form');
        },
        defaultStatus() {
            this.status = 'default';
            wwLib.$emit(`ww-form-status`, this.status);
            this.wwObjectCtrl.update(this.wwObject);
        },
        loadingStatus() {
            this.status = 'loading';
            wwLib.$emit(`ww-form-status`, this.status);
            this.wwObjectCtrl.update(this.wwObject);
        },
        successStatus() {
            this.status = 'success';
            wwLib.$emit(`ww-form-status`, this.status);
            this.wwObjectCtrl.update(this.wwObject);
        },
        errorStatus() {
            this.status = 'error';
            wwLib.$emit(`ww-form-status`, this.status);
            this.wwObjectCtrl.update(this.wwObject);
        },
        goToPage(pageId) {
            wwLib.wwLinkPopups.closeAll();
            const path = wwLib.wwWebsiteData.getPageRoute(pageId, true) || '/';
            wwLib.goTo(path);
            this.$emit('next', null);
        },
        async submit(form) {
            try {
                // CHANGE STATUS
                this.loadingStatus();

                // INIT DATA
                const data = new FormData();

                // ADD DATA REQUEST
                for (const elem of form.srcElement.elements) {
                    if (elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA' || elem.nodeName === 'SELECT') {
                        data.append(elem.name, elem.value);
                    }
                }
                // ADD QUERY VAR
                if (this.wwObject.content.data.config.queryVar && this.wwObject.content.data.config.queryVar != {}) {
                    for (const elem of this.wwObject.content.data.config.queryVar) {
                        const value = this.$route.query[elem];
                        if (value) data.append(elem, value);
                    }
                }

                await axios.post(`${wwLib.wwApiRequests._getApiUrl()}/design/${wwLib.wwWebsiteData.getInfo().id}/form/${this.wwObject.content.data.config.id}/send`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                //RUN JS
                if (this.wwObject.content.data.config.js && this.wwObject.content.data.config.js.length) {
                    try {
                        eval(this.wwObject.content.data.config.js);
                    } catch (error) {
                        wwLib.wwLog.error('----------------------------');
                        wwLib.wwLog.error('Failed to execute custom JS.');
                        wwLib.wwLog.error(this.wwObject.content.data.config.js);
                        wwLib.wwLog.error('----------------------------');
                        wwLib.wwLog.error(error);
                    }
                }

                // REDIRECT
                if (this.wwObject.content.data.config.redirect.enabled) {
                    this.goToPage(this.wwObject.content.data.config.redirect.linkPage);
                }

                // CHANGE STATUS
                this.successStatus();
            } catch (err) {
                // CHANGE STATUS
                this.errorStatus();
                wwLib.wwLog.error('ERROR:', err);
            }
        },
        /* wwManager:start */
        add(list, options) {
            try {
                list.splice(options.index, 0, options.wwObject);
                this.wwObjectCtrl.update(this.wwObject);
            } catch (error) {
                wwLib.wwLog.error('ERROR : ', error);
            }
        },
        remove(list, options) {
            try {
                list.splice(options.index, 1);
                this.wwObjectCtrl.update(this.wwObject);
            } catch (error) {
                wwLib.wwLog.error('ERROR:', error);
            }
        },
        async options() {
            try {
                const config = await this.getFormConfig();
                const options = {
                    firstPage: 'WW_FORM_SECURE_OPTIONS',
                    data: {
                        wwObject: this.wwObject,
                        config: config
                    }
                };

                const result = await wwLib.wwPopups.open(options);
                wwLib.wwObjectHover.setLock(this);

                if (typeof result.config != 'undefined') {
                    this.wwObject.content.data.config.type = result.config.type;

                    if (result.config.type === 'weweb-email') {
                        this.wwObject.content.data.config.recipients = result.config.recipients;
                        this.wwObject.content.data.config.color = result.config.color;
                    } else {
                        delete this.wwObject.content.data.config.recipients;
                        delete this.wwObject.content.data.config.color;
                    }

                    this.wwObject.content.data.config.name = result.config.name;
                    this.wwObject.content.data.config.autocomplete = result.config.autocomplete;
                    this.wwObject.content.data.config.redirect = result.config.redirect;
                    this.wwObject.content.data.config.queryVar = result.config.queryVar;
                    this.wwObject.content.data.config.js = result.config.js;

                    const { method, action, hiddenData, headers } = result.config;
                    if (!this.wwObject.content.data.config.id) {
                        await this.createFormConfig(method, action, hiddenData, headers);
                    } else {
                        await this.updateFormConfig(method, action, hiddenData, headers);
                    }
                }
                if (typeof result.id != 'undefined') {
                    this.wwObject.content.data.id = result.id;
                }
                if (typeof result.class != 'undefined') {
                    this.wwObject.content.data.class = result.class;
                }
                this.wwObjectCtrl.update(this.wwObject);
                this.wwObjectCtrl.globalEdit(result);
            } catch (err) {
                wwLib.wwLog.error('ERROR', err);
            }
            wwLib.wwObjectHover.removeLock();
        },
        async getFormConfig() {
            try {
                if (!this.wwObject.content.data.config.id) return;
                const result = await wwLib.$apollo.query({
                    query: GET_FORM_CONFIG,
                    variables: {
                        designId: parseInt(await wwLib.$store.getters['websiteData/getDesignInfo'].id),
                        formConfigId: this.wwObject.content.data.config.id
                    },
                    fetchPolicy: 'no-cache'
                });
                if (!result) throw new Error('ERROR_GET_FORM_CONFIG');
                return result.data.getFormConfig;
            } catch (err) {
                wwLib.wwLog.error(err);
            }
        },
        async createFormConfig(method, url, data, headers) {
            try {
                const result = await wwLib.$apollo.mutate({
                    mutation: CREATE_FORM_CONFIG,
                    fetchPolicy: 'no-cache',
                    variables: {
                        designId: parseInt(await wwLib.$store.getters['websiteData/getDesignInfo'].id),
                        method,
                        url,
                        data,
                        headers
                    }
                });
                if (!result) throw new Error('ERROR_CREATE_FORM_CONFIG');

                this.wwObject.content.data.config.id = result.data.createFormConfig.id;
            } catch (err) {
                wwLib.wwLog.error(err);
            }
        },
        async updateFormConfig(method, url, data, headers) {
            try {
                const result = await wwLib.$apollo.mutate({
                    mutation: UPDATE_FORM_CONFIG,
                    variables: {
                        designId: parseInt(await wwLib.$store.getters['websiteData/getDesignInfo'].id),
                        formConfigId: this.wwObject.content.data.config.id,
                        method,
                        url,
                        data,
                        headers
                    },
                    fetchPolicy: 'no-cache'
                });
                if (!result) throw new Error('ERROR_UPDATE_FORM_CONFIG');
            } catch (err) {
                wwLib.wwLog.error(err);
            }
        }
        /* wwManager:end */
    }
};
</script>

<style lang="scss" scoped>
.ww-form {
    form {
        width: 100%;
    }
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 50px;
    min-height: 25px;
    /* wwManager:start */
    .ww-orange-button {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
        z-index: 1;
    }
    .ww-form-status {
        position: absolute;
        top: 0;
        left: 20px;
        transform: translate(0%, -50%);
        z-index: 1;
        color: white;
        padding: 2px 5px;
        border-radius: 2px;
        font-size: 12px;
        background-image: linear-gradient(90deg, #2e85c2, #1763a9);
        &.error {
            background: linear-gradient(90deg, #e02a4d 0, #ce003b);
        }
        &.success {
            background-image: linear-gradient(90deg, #49b9b3, #19947c);
        }
        &.loading {
            background: linear-gradient(90deg, #ea5e1c 0, #ef811a);
        }
    }
    /* wwManager:end */
}
</style>
