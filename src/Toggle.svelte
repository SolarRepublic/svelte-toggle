<script>
  /**
   * Specify whether the toggle switch is toggled
   */
  export let toggled = true;

  /**
   * Specify the label text
   */
  export let label = "";

  /**
   * Set to `true` to visually hide the label
   */
  export let hideLabel = false;

  /**
   * Set to `true` to use the small variant
   */
  export let small = false;

  /**
   * Set to `true` to disable the button
   */
  export let disabled = false;

  /**
   * Set a descriptor for the toggled state
   * @type {string}
   */
  export let on = undefined;

  /**
   * Set a descriptor for the untoggled state
   * @type {string}
   */
  export let off = undefined;

  /**
   * Specify the switch color
   */
  export let switchColor = "var(--theme-color-black, #fff)";

  /**
   * Specify the toggled switch background color
   */
  export let toggledColor = "var(--theme-color-primary, #0f62fe)";

  /**
   * Specify the untoggled switch background color
   */
  export let untoggledColor = "var(--theme-color-graymed, #8d8d8d)";

  /**
   * Specify size of toggle in pixels
   */
  export let size = 20;

  import { createEventDispatcher } from "svelte";
  import ToggleCore from "./ToggleCore.svelte";

  const dispatch = createEventDispatcher();

  $: dispatch("toggle", toggled);
</script>

<ToggleCore bind:toggled let:label={labelProps} let:button>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label {...labelProps} class:hideLabel>{label}</label>
  <div>
    <button
      class:small
      {...$$restProps}
      {...button}
      style="font-size:{size}px; color: {switchColor}; background-color: {toggled
        ? toggledColor
        : untoggledColor};
      {$$restProps.style}"
      {disabled}
      on:click
      on:click={() => (toggled = !toggled)}
      on:focus
      on:blur
    />
    <slot {toggled}>
      {#if on && off}<span>{toggled ? on : off}</span>{/if}
    </slot>
  </div>
</ToggleCore>

<style>
  label {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
  }

  /**
  * Visually hide element without breaking screen readers
  * https://a11yproject.com/posts/how-to-hide-content/
  */
  .hideLabel {
    position: absolute;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
  }

  button {
    position: relative;
    padding: 0 0.25em;
    border: 0;
    border-radius: 0.75em;
    height: 1em;
    width: 2em;
    font: inherit;
    color: inherit;
    line-height: inherit;
		transition: color 1s var(--ease-out-quick);
  }

  button:not([disabled]) {
    cursor: pointer;
  }

  button[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  button:before {
    position: absolute;
    content: "";
    top: 0;
    bottom: 0;
    left: 0.2em;
    margin: auto;
    height: 0.6em;
    width: 0.6em;
    text-align: center;
    border-radius: 50%;
    background-color: currentColor;
    transition: transform 1s var(--ease-out-quick);
  }

  button[aria-checked="true"]:before {
    transform: translateX(1.25rem);
  }

  button.small {
    height: 1rem;
    width: 1.75rem;
  }

  button.small:before {
    height: 0.75rem;
    width: 0.75rem;
  }

  button.small[aria-checked="true"]:before {
    transform: translateX(0.75rem);
  }

  div {
    display: flex;
    align-items: center;
  }

  span {
    margin-left: 0.5rem;
  }
</style>
