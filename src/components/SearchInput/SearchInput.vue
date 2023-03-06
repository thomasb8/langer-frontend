<script setup lang="ts">
import SearchIcon from './SearchIcon.svg?component';

const props = defineProps({ inputValue: { type: String, required: true } });

const emits = defineEmits(['onChange']);

function onChange(event: Event) {
  emits('onChange', (event.target as HTMLInputElement).value);
}
</script>

<template>
  <div class="input-container">
    <SearchIcon></SearchIcon>
    <input type="text" :value="props.inputValue" @input="onChange"/>
  </div>
</template>

<style scoped lang="scss">
.input-container {
  background: white;
  color: var(--color-text-dark);
  display: flex;
  width: 330px;
  height: 36px;
  align-items: center;
  border-radius: 8px;
  &:focus-within {
    box-shadow: 0 0 0 2px #5470FF;
  }
  svg {
    color: var(--color-text-dark);
    margin: 0 16px;
  }
  input {
    border: 0;
    width: 100%;
    font-size: 1rem;
    &:focus {
      outline: none;
    }
  }
}
</style>
