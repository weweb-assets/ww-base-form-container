<template>
    <form
        :name="formName"
        :autocomplete="content.autocomplete"
        class="ww-form-container"
        :class="{ editing: isEditing, selected: isSelected }"
        data-ww-flag="form-container"
        @submit.prevent="onSubmit"
    >
        <div class="ww-form-container__relative">
            <wwLayout class="ww-form-container__content" path="formContent" />
        </div>
    </form>
</template>

<script>
export default {
    props: {
        content: { type: Object, required: true },
        wwElementState: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['trigger-event'],
    computed: {
        formName() {
            return this.wwElementState.name;
        },
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
    },
    methods: {
        async onSubmit() {
            this.$emit('trigger-event', { name: 'submit' });
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-form-container {
    &__relative {
        position: relative;
    }
    &__content {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
}
</style>
