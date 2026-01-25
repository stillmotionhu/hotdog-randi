<div class="separator__wrapper">
	<span class="separator__text">or</span>
</div>

<style lang="scss">
	.separator {
		&__wrapper {
			position: relative;
			display: flex;
			justify-content: center;
			width: 100%;
			padding: 1rem 0;

			&::before {
				content: '';
				position: absolute;
				display: block;
				top: 50%;
				width: 100%;
				height: 2px;
				background-color: rgb(150, 150, 150);
				transform: translateY(-50%);
				z-index: -1;
			}
		}

		&__text {
			color: rgb(150, 150, 150);
			font-size: 0.875rem;
			text-transform: uppercase;
			background-color: rgb(var(--bg));
			padding: 0 6px;
		}
	}
</style>
