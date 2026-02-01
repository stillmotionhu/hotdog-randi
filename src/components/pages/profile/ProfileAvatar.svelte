<script lang="ts">
	interface ProfileAvatarProps {
		firstname: string;
		lastname: string;
	}

	let { firstname, lastname }: ProfileAvatarProps = $props();

	let initials = $derived([firstname.substring(0, 1), lastname.substring(0, 1)].join(''));
</script>

<div class="profile__avatar">{initials}</div>

<style lang="scss">
	.profile__avatar {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80px;
		height: 80px;
		font-size: 2em;
		background-color: rgba(255, 255, 255, 0.6);
		border-radius: 50px;
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow:
			0 0px 32px rgba(0, 0, 0, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.5),
			inset 0 -1px 0 rgba(255, 255, 255, 0.1),
			inset 0 0 30px 5px rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(5px);
	}
</style>
