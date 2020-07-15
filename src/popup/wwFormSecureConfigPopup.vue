<template>
    <div class="ww-popup-config">
        <!-- DEFAULT CONFIGURATION -->
        <div class="content">
            <div class="elem">
                <div class="title">Form Name</div>
                <wwManagerInput class="input" :color="getInputColor(result.config.name, 'green')" v-model="result.config.name" label="Name (ex: newsletter, etc...)" @change="updateNameForm"></wwManagerInput>
            </div>
            <div class="elem">
                <div class="title">Autocomplete</div>
                <wwManagerRadio :value="result.config.autocomplete" @change="result.config.autocomplete = $event"></wwManagerRadio>
            </div>
            <div class="elem">
                <div class="title">Page redirection after submit</div>
                <wwManagerRadio :value="result.config.redirect.enabled" @change="result.config.redirect.enabled = $event"></wwManagerRadio>
                <wwManagerSelect class="elem" v-if="result.config.redirect.enabled" :options="pagesOptions" :value="result.config.redirect.linkPage" @change="result.config.redirect.linkPage = $event"></wwManagerSelect>
            </div>
            <div class="elem">
                <div class="title">Form Preset</div>
                <wwManagerSelect :options="typeOptions" :value="type" @change="type = $event"></wwManagerSelect>
            </div>
        </div>
        <!-- WEWEB-EMAIL CONFIGURATION -->
        <div class="content" v-if="result.config.type === 'weweb-email'">
            <div class="elem">
                <div class="title">Recipients</div>
                <div class="email" v-for="(recipient, index) in result.config.recipients" :key="recipient.id">
                    <wwManagerInput class="input" :color="getInputColor(recipient.address.email, 'green')" v-model="recipient.address.email" @change="initHiddenData" :validation="validateEmail" label="Email"></wwManagerInput>
                    <div class="remove-elem" center color="red" @click="removeRecipient(index)">&times;</div>
                </div>
                <wwManagerButton class="button-add" center invert color="blue" @click="addRecipient">Add recipient</wwManagerButton>
            </div>
            <div class="elem">
                <div class="title">Weweb Email color</div>
                <wwManagerColorSelect
                    :value="result.config.color"
                    @change="
                        result.config.color = $event;
                        initHiddenData;
                    "
                ></wwManagerColorSelect>
            </div>
        </div>
        <!-- CUSTOM-API CONFIGURATION -->
        <div class="content" v-else-if="result.config.type === 'custom-api'">
            <div class="elem">
                <div class="title">Method</div>
                <wwManagerSelect :options="methodOptions" :value="result.config.method" @change="result.config.method = $event"></wwManagerSelect>
            </div>
            <div class="elem">
                <div class="title">Api Url</div>
                <wwManagerInput class="input" :color="getInputColor(result.config.action, 'green')" v-model="result.config.action" label="Url" :validation="validateUrl"></wwManagerInput>
            </div>
            <div class="elem">
                <div class="title">Hidden form inputs</div>
                <div v-for="(elem, index) in result.config.hiddenData" :key="`hidden-data-${index}`" class="data-request">
                    <wwManagerInput class="input" color="blue" v-model="elem.name" label="Name" @change="result.config.hiddenData[index].name = $event"></wwManagerInput>
                    <wwManagerInput class="input data-request-value" color="green" v-model="elem.value" label="Value" @change="result.config.hiddenData[index].value = $event"></wwManagerInput>
                    <div class="remove-elem" @click="removeElem(result.config.hiddenData, index)">&times;</div>
                </div>
                <wwManagerButton class="button-add data-request-add" center invert color="blue" @click="addElem(result.config.hiddenData, {})">Add</wwManagerButton>
            </div>
            <div class="elem">
                <div class="title">Request Headers</div>
                <div v-for="(elem, index) in result.config.headers" :key="`headers-${index}`" class="data-request">
                    <wwManagerInput class="input" color="blue" v-model="elem.name" label="Name" @change="result.config.headers[index].name = $event"></wwManagerInput>
                    <wwManagerInput class="input data-request-value" color="green" v-model="elem.value" label="Value" @change="result.config.headers[index].value = $event"></wwManagerInput>
                    <div class="remove-elem" @click="removeElem(result.config.headers, index)">&times;</div>
                </div>
                <wwManagerButton class="button-add data-request-add" center invert color="blue" @click="addElem(result.config.headers, {})">Add</wwManagerButton>
            </div>
            <div class="elem">
                <div class="title">Query variables in URL</div>
                <div v-for="(elem, index) in result.config.queryVar" :key="`query-var-${index}`" class="data-request">
                    <wwManagerInput class="input" color="blue" v-model="result.config.queryVar[index]" label="Name"></wwManagerInput>
                    <div class="remove-elem" @click="removeElem(result.config.queryVar, index)">&times;</div>
                </div>
                <wwManagerButton class="button-add data-request-add" center invert color="blue" @click="addElem(result.config.queryVar, '')">Add</wwManagerButton>
            </div>
        </div>

        <div class="content">
            <div class="elem">
                <div class="title">Run Javascript on submit</div>
                <textarea class="input" v-model="result.config.js" style="height: 300px;"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'wwFormSecureConfigPopup',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            // WEBSITE DATA
            designName: wwLib.wwWebsiteData.getWebsiteNameFromRoute(),
            designId: wwLib.wwWebsiteData.getInfo().id,
            apiUrl: wwLib.wwApiRequests._getApiUrl(),
            pagesOptions: {
                type: 'text',
                values: []
            },
            // WWOBJECT
            wwObject: this.options.data.wwObject,
            config: this.options.data.config,
            // DATA
            type: '',
            result: {
                config: {
                    name: '',
                    autocomplete: true,
                    type: 'weweb-email',
                    action: '',
                    method: '',
                    redirect: {
                        enabled: false,
                        linkPage: undefined
                    },
                    hiddenData: [],
                    headers: [],
                    // WEWEB-EMAIL CONFIGURATION
                    recipients: [],
                    from: '',
                    color: '#ce003b',
                    queryVar: []
                }
            },
            // SELECT OPTIONS
            typeOptions: {
                type: 'text',
                values: [
                    {
                        value: 'weweb-email',
                        default: true,
                        text: {
                            en: 'Weweb email service',
                            fr: `Service d'email Weweb`
                        }
                    },
                    {
                        value: 'custom-api',
                        text: {
                            en: 'Custom Api',
                            fr: 'Api personnalisé'
                        }
                    }
                ]
            },
            methodOptions: {
                type: 'text',
                values: [
                    {
                        value: 'GET',
                        text: {
                            en: 'GET',
                            fr: 'GET'
                        }
                    },
                    {
                        value: 'POST',
                        default: true,
                        text: {
                            en: 'POST',
                            fr: 'POST'
                        }
                    },
                    {
                        value: 'PUT',
                        text: {
                            en: 'PUT',
                            fr: 'PUT'
                        }
                    },
                    {
                        value: 'PATCH',
                        text: {
                            en: 'PATCH',
                            fr: 'PATCH'
                        }
                    },
                    {
                        value: 'DELETE',
                        text: {
                            en: 'DELETE',
                            fr: 'DELETE'
                        }
                    }
                ]
            },
            // INPUT VALIDATION
            validateUrl: {
                regex: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6})?\b([-a-zA-Z0-9@:%_\+.~#?&//=\,]*)$/gi,
                message: {
                    en: 'URL is in incorrect format.',
                    fr: "L'url est dans un format incorrect."
                }
            },
            validateEmail: {
                regex: /^$/gi,
                message: {
                    en: 'Email is in incorrect format.',
                    fr: "L'email est dans un format incorrect."
                }
            }
        };
    },
    watch: {
        type() {
            if (this.type === 'weweb-email') {
                // WEWEB-EMAIL CONFIGURATION
                this.result.config.action = `${this.apiUrl}/design/${this.designId}/send_form_info`;
                this.result.config.method = 'POST';
                this.result.config.recipients = this.result.config.recipients || [{ address: { email: wwLib.$store.getters['manager/getUser'].email } }];
                this.result.config.color = this.result.config.color;
                this.result.config.headers = [{ name: 'Content-Type', value: 'multipart/form-data' }];
                this.result.config.hiddenData = [
                    {
                        name: 'ww-type',
                        value: 'form'
                    },
                    {
                        name: 'ww-from',
                        value: this.designName
                    },
                    {
                        name: 'ww-recipients',
                        value: JSON.stringify(this.result.config.recipients)
                    },
                    {
                        name: 'ww-color',
                        value: this.result.config.color
                    }
                ];
                this.result.config.queryVar = [];
            } else if (this.result.config.type === 'weweb-email') {
                // DEFAULT CONFIGURATION
                this.result.config.action = '';
                this.result.config.method = 'POST';
                this.result.config.headers = [];
                this.result.config.hiddenData = [];
                this.result.config.recipients = undefined;
                this.result.config.queryVar = [];
            }
            this.result.config.type = this.type;
        }
    },
    methods: {
        // INIT CONFIGURATION
        init() {
            // DEFAULT CONFIGURATION
            this.wwObject.content.data.config = this.wwObject.content.data.config || {};
            this.result.config.type = this.wwObject.content.data.config.type || this.result.config.type;
            this.result.config.name = this.wwObject.content.data.config.name || this.result.config.name;
            this.result.config.autocomplete = this.wwObject.content.data.config.autocomplete || this.result.config.autocomplete;
            this.result.config.action = this.config.url || this.result.config.action;
            this.result.config.method = this.config.method || this.result.config.method;
            this.result.config.redirect = this.wwObject.content.data.config.redirect || this.result.config.redirect;
            this.result.config.js = this.wwObject.content.data.config.js || this.result.config.js;

            // CUSTOM-API CONFIGURATION
            this.result.config.headers = this.config.headers || this.result.config.headers;
            this.result.config.hiddenData = this.config.data || this.result.config.hiddenData;

            // WEWEB-EMAIL CONFIGURATION
            this.result.config.recipients = this.initList(this.wwObject.content.data.config.recipients);
            this.result.config.from = this.wwObject.content.data.config.from || this.result.config.from;
            this.result.config.color = this.wwObject.content.data.config.color || this.result.config.color;

            this.result.config.queryVar = this.wwObject.content.data.config.queryVar || this.result.config.queryVar;

            this.options.result = this.result;
            this.type = this.result.config.type;
            this.initPageOptions();
        },
        initPageOptions() {
            for (const page of wwLib.wwWebsiteData.getPages()) {
                this.pagesOptions.values.push({
                    value: page.id,
                    text: {
                        en: page.name,
                        fr: page.name
                    }
                });
            }
            this.pagesOptions.values[0].default = true;
            this.pagesOptions.values.sort((a, b) => a.text.en.localeCompare(b.text.en));
        },
        updateNameForm() {
            this.result.config.name = this.result.config.name.trim().replace(/\s/gm, '-');
        },
        // WEWEB-EMAIL CONFIGURATION
        initList(list) {
            const defaultValue = [{ address: { email: '' } }];
            if (!list || !list.length) list = defaultValue;
            return list;
        },
        initHiddenData() {
            this.result.config.hiddenData = [
                {
                    name: 'ww-type',
                    value: 'form'
                },
                {
                    name: 'ww-from',
                    value: this.designName
                },
                {
                    name: 'ww-recipients',
                    value: JSON.stringify(this.result.config.recipients)
                },
                {
                    name: 'ww-color',
                    value: this.result.config.color
                }
            ];
        },
        addRecipient() {
            this.result.config.recipients.push({
                address: { email: '' }
            });
            this.initHiddenData();
        },
        removeRecipient(index) {
            this.result.config.recipients.splice(index, 1);
            this.initHiddenData();
        },
        // UTILS
        getInputColor(inputValue, defaultColor = 'green') {
            return inputValue ? defaultColor : 'orange';
        },
        addElem(array, elem = {}) {
            array.push(elem);
        },
        removeElem(array, index) {
            array.splice(index, 1);
        }
    },
    created() {
        this.init();
    }
};
</script>

<style scoped lang="scss">
.ww-popup-config {
    .content {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 90%;
        margin: 10px auto;
        .elem {
            margin: 10px auto;
            width: 100%;
            .input {
                width: 100%;
            }
        }
        .title {
            color: #e02a4d;
            font-size: 1.2rem;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .email {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }
    }
}

@media (min-width: 1024px) {
    .ww-popup-config {
        .content {
            width: 40%;
        }
    }
}

.data-request {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .data-request-value {
        margin-left: 10px;
    }
}

.data-request-add {
    margin-top: 10px;
}

.button-add {
    width: 50%;
    margin: 10px auto;
}

.remove-elem {
    margin-left: 10px;
    font-size: 25px;
    border: 1px solid #e02a4d;
    border-radius: 50%;
    min-width: 35px;
    min-height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e02a4d;
    transition: all 0.5s ease;
    cursor: pointer;
    .content {
        padding: 0px 10px;
    }
    &:hover {
        background: #e02a4d;
        color: white;
    }
}
</style>
