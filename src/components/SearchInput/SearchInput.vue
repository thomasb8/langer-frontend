<template>
  <div class="input-container">
    <SearchIcon></SearchIcon>
    <input type="text" :value="inputValue" @input="onChange"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchIcon from './SearchIcon.svg?component';

export default defineComponent({
  components: {
    SearchIcon
  },
  props: {
    inputValue: {
      type: String,
      required: true
    }
  },
  methods: {
    onChange(event: Event) {
      this.$emit('onChange', (event.target as HTMLInputElement).value);
    }
  }
})
</script>

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
