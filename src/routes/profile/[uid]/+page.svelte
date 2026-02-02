<script lang="ts">
	import { page } from '$app/stores';
	import { navigating } from '$app/stores';
	import { goto } from '$app/navigation';
	import { userState } from '@/states/user.svelte';
	import type { User } from '@/collections/User';
	import type { Rating } from '@/collections/Rating';
	import { fetchUserDataByUid } from '@/utils/users/fetch-user-data-by-uid';
	import { fetchRatingsByUserUid } from '@/utils/ratings/fetch-ratings-by-user-uid';
	import { isAccountFollowedByCurrentUser } from '@/utils/users/is-account-followed-by-current-user';
	import { isCurrentUserFollowedByUid } from '@/utils/users/is-current-user-followed-by-uid';
	import { followUserByUid } from '@/utils/users/follow-user-by-uid';

	import LoadingWrapper from '@/components/shared/LoadingWrapper.svelte';
	import Spinner from '@/components/shared/Spinner.svelte';
	import PageContainer from '@/components/layout/PageContainer.svelte';
	import ProfileAvatar from '@/components/pages/profile/ProfileAvatar.svelte';
	import RatingsContainer from '@/components/shared/RatingsContainer.svelte';
	import RatingCard from '@/components/shared/rating-card/RatingCard.svelte';
	import Button from '@/components/shared/Button.svelte';
	import { onMount } from 'svelte';

	let user: User | null | undefined = $state<User | null | undefined>(undefined);
	let ratings: Array<Rating> | null | undefined = $state<Array<Rating> | null | undefined>(
		undefined
	);
	let isFollowedByCurrentUser: boolean = $state<boolean>(false);
	let isCurrentUserFollowedByThisAccount: boolean = $state<boolean>(false);
	let isReady: boolean = $state<boolean>(false);
	let isLoading: boolean = $state<boolean>(true);

	const onSpinnerAnimationEnd = (): void => {
		isReady = true;
	};

	const handleFollowButtonClick = async (): Promise<void> => {
		let { uid }: { uid?: string } = $page.params;

		if (typeof uid === 'undefined') {
			console.error('There is no given user UID!');
			return;
		}

		try {
			await followUserByUid(uid);

			isFollowedByCurrentUser = await isAccountFollowedByCurrentUser(uid);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSettingsButtonClick = (): void => {
		goto('/settings');
	};

	const fetchData = (uid: string | undefined): void => {
		if (typeof uid === 'undefined') {
			console.error('There are no given user UID');
			return;
		}

		if (userState.uid === uid) {
			user = userState.data;
			return;
		}

		fetchUserDataByUid(uid).then((value: User | null) => {
			user = value;
		});

		isAccountFollowedByCurrentUser(uid).then((value: boolean): void => {
			isFollowedByCurrentUser = value;
		});

		isCurrentUserFollowedByUid(uid).then((value: boolean): void => {
			isCurrentUserFollowedByThisAccount = value;
		});
	};

	onMount(() => {
		fetchData($page.params.uid);
	});

	$effect(() => {
		if ($navigating) {
			if (!($navigating.to && $navigating.to.params && $navigating.to.params.uid)) {
				return;
			}

			isReady = false;
			isLoading = true;

			fetchData($navigating.to.params.uid);
		}
	});

	$effect(() => {
		let { uid }: { uid?: string } = $page.params;

		if (typeof uid === 'undefined' || typeof user === 'undefined' || user === null) {
			return;
		}

		fetchRatingsByUserUid(uid, 'date-asc').then((value: Array<Rating> | null) => {
			ratings = value;
			isLoading = false;
		});
	});
</script>

{#if !isReady}
	<LoadingWrapper>
		<Spinner shouldFadeOut={!isLoading} onAnimationEnd={onSpinnerAnimationEnd} />
	</LoadingWrapper>
{:else}
	<PageContainer id="profilePage">
		{#if user}
			<header class="profile__header">
				<ProfileAvatar firstname={user.firstname} lastname={user.lastname} />

				<div class="profile__header__details">
					<h1 class="profile__header__name">{user.firstname} {user.lastname}</h1>

					<div class="profile__header__info__wrapper">
						<div class="profile__header__info">
							<p class="profile__header__info__amount">{ratings?.length || 0}</p>
							<h2 class="profile__header__info__label">ratings</h2>
						</div>

						<div class="profile__header__info">
							<p class="profile__header__info__amount">{user.followers.length}</p>
							<h2 class="profile__header__info__label">followers</h2>
						</div>

						<div class="profile__header__info">
							<p class="profile__header__info__amount">{user.followings.length}</p>
							<h2 class="profile__header__info__label">followings</h2>
						</div>
					</div>
				</div>

				<div class="profile__header__buttons">
					{#if userState.uid !== user.uid}
						<Button
							size="compact"
							color={isFollowedByCurrentUser ? 'dark' : 'primary'}
							onclick={handleFollowButtonClick}
						>
							{#if isFollowedByCurrentUser}
								Following
							{:else if isCurrentUserFollowedByThisAccount}
								Follow back
							{:else}
								Follow
							{/if}
						</Button>
					{:else}
						<Button size="compact" color="dark" onclick={handleSettingsButtonClick}>
							Settings
						</Button>
					{/if}
				</div>
			</header>

			<div class="profile__ratings__wrapper">
				<RatingsContainer>
					{#if !ratings || ratings.length === 0}
						This user does not have ratings yet.
					{:else}
						{#each ratings as rating (rating.uid)}
							<RatingCard {rating} />
						{/each}
					{/if}
				</RatingsContainer>
			</div>
		{/if}
	</PageContainer>
{/if}

<style lang="scss">
	:global(.page__container#profilePage) {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.profile {
		&__header {
			display: grid;
			grid-template-areas:
				'avatar details'
				'buttons buttons';
			grid-template-columns: 80px auto;
			grid-template-rows: auto auto;
			gap: 15px;
			animation-name: reveal-element;
			animation-duration: 0.5s;

			:global(.profile__avatar) {
				grid-area: avatar;
			}

			&__details {
				display: flex;
				flex-direction: column;
				gap: 10px;
				grid-area: details;
			}

			&__info__wrapper {
				display: flex;
				flex-direction: row;
				gap: 35px;
			}

			&__name {
				font-size: 1.25em;
			}

			&__info {
				display: flex;
				flex-direction: column;
				gap: 5px;
				cursor: pointer;

				&__amount,
				&__label {
					font-size: 0.8em;
				}

				&__amount {
					font-weight: 500;
				}

				&__label {
					font-weight: 400;
				}
			}

			&__buttons {
				grid-area: buttons;
			}
		}
	}
</style>
