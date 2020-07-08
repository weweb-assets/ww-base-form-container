<template>
    <div class="ww-popup-config">
        <!-- FORM ID -->
        <div class="content">
            <div class="elem">
                <wwManagerInput class="input" color="green" v-model="result.id" label="Form id" @change="result.id = $event"></wwManagerInput>
            </div>
        </div>
    </div>
</template>

<script> 
export default {
    name: "wwFormIdPopup",
    props: {
        options: {
            type: Object,
            default() {
                return {}
            }
        },
    },
    data() {
        return {
            // WWOBJECT
            wwObject: this.options.data.wwObject,
            // DATA
            type: '',
            result: {
                id: ''
            }
        }
    },
    methods: {
        init() {
            // FORM ID
            this.result.id = this.wwObject.content.data.id || this.result.id
            this.options.result = this.result
        }
    },
    created() {
        this.init()
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
    }
}

@media (min-width: 1024px) {
    .ww-popup-config {
        .content {
            width: 40%;
        }
    }
}
</style>