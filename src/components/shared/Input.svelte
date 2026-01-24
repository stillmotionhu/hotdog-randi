<script lang="ts">
	import type { AutocompleteType } from '@/types/autocomplete-type';
	import type { InputType } from '@/types/input-type';

	import SearchInputIcon from './icons/SearchInputIcon.svelte';

	interface InputProps {
		type: InputType;
		name: string;
		label: string;
		autocomplete?: AutocompleteType;
		maxlength?: number;
		required?: boolean;
		value: string | null;
		errors?: Array<string>;
	}

	let {
		type,
		name,
		label,
		autocomplete = 'off',
		maxlength,
		required = false,
		value = $bindable<string | null>(''),
		errors = $bindable<Array<string>>([])
	}: InputProps = $props();
</script>

<div class="input" data-required={required} data-has-error={errors.length > 0}>
	<input
		class="input__field"
		{type}
		id={name}
		placeholder={label}
		{autocomplete}
		{maxlength}
		bind:value
	/>
	<label class="input__label" for={name}>
		{#if type === 'search'}
			<span class="input__label__icon" aria-hidden="true">
				<SearchInputIcon />
			</span>
		{/if}

		<span class="input__label__text">{label}</span>
	</label>
</div>

<style lang="scss">
	.input {
		position: relative;
		display: inline-block;
		width: 100%;
		height: 60px;
		background-color: rgba(255, 255, 255, 0.6);
		border-radius: 30px;
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow:
			0 0px 32px rgba(0, 0, 0, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.5),
			inset 0 -1px 0 rgba(255, 255, 255, 0.1),
			inset 0 0 30px 5px rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(5px);
		transition: transform 0.35s cubic-bezier(0.44, 1.14, 0.43, 1.32);

		&:has(.input__field:focus) {
			transform: scale(0.95);
			transition: transform 0.45s cubic-bezier(0.44, 1.14, 0.43, 1.32);
		}

		&__field {
			font-size: 1em;
			line-height: 1em;
			color: rgb(var(--fg));
			width: 100%;
			height: 60px;
			padding: 15px 25px;
			border-radius: 30px;
			background-color: transparent;
			outline: none;

			&:has(~ .input__label .input__label__icon) {
				padding-left: calc(25px + 1em + 6px);
			}

			&:-webkit-autofill {
				&,
				&:hover,
				&:focus {
					-webkit-text-fill-color: rgb(var(--fg));
					transition: background-color 5000s;
				}
			}

			&::placeholder {
				visibility: hidden;
			}
		}

		&__label {
			display: flex;
			flex-direction: row;
			justify-content: start;
			align-items: center;
			gap: 6px;
			position: absolute;
			top: 7px;
			left: 1px;
			font-size: 1em;
			font-weight: 500;
			color: rgb(100, 100, 100);
			padding: 15px 25px;
			cursor: text;

			&__text {
				line-height: 1em;

				.input__field:not(:placeholder-shown) ~ .input__label & {
					visibility: hidden;
				}

				.input[data-required='true'] &::after {
					content: '*';
					color: rgb(240, 10, 10);
					margin-left: 2px;
				}
			}

			&__icon {
				:global(.icon) {
					aspect-ratio: 1;
					height: 1em;
					fill: rgb(var(--fg));
				}
			}
		}
	}
</style>
