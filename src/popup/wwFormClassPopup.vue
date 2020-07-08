<template>
    <div class="ww-popup-config">
        <!-- FORM CLASS -->
        <div class="content">
            <div class="elem">
                <div class="class" v-for="(elem, index) in result.class" :key="index">
                    <wwManagerInput class="input" color="blue" v-model="result.class[index]" label="Class name" @change="result.class[index] = $event"></wwManagerInput>
                    <div class="remove-elem" @click="removeElem(result.class, index)">&times;</div>
                </div>
                <wwManagerButton class="button-add" center invert color="blue" @click="addElem(result.class)">Add</wwManagerButton>
            </div>
        </div>
    </div>
</template>

<script> 
export default {
    name: "wwFormClassPopup",
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
            result: {
                class: ['']
            }
        }
    },
    methods: {
        init() {
            // FORM CLASS
            this.result.class = this.wwObject.content.data.class || this.result.class
            this.options.result = this.result
        },
        addElem(array) {
            array.push([''])
        },
        removeElem(array, index) {
            array.splice(index, 1)
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
        .class {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
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
            transition: all .5s ease;
            cursor: pointer;
            .content {
                padding: 0px 10px;
            }   
            &:hover {
                background: #e02a4d;
                color: white;
            }
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