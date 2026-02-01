<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { userState } from '@/states/user.svelte';
	import type { User } from '@/collections/User';
	import type { Rating } from '@/collections/Rating';
	import { fetchUserDataByUid } from '@/utils/users/fetch-user-data-by-uid';
	import { fetchRatingsByUserUid } from '@/utils/ratings/fetch-ratings-by-user-uid';
	import { signOutCurrentUser } from '@/utils/auth/sign-out-current-user';

	import LoadingWrapper from '@/components/shared/LoadingWrapper.svelte';
	import Spinner from '@/components/shared/Spinner.svelte';
	import PageContainer from '@/components/layout/PageContainer.svelte';
	import ProfileAvatar from '@/components/pages/profile/ProfileAvatar.svelte';
	import RatingsContainer from '@/components/shared/RatingsContainer.svelte';
	import RatingCard from '@/components/shared/rating-card/RatingCard.svelte';
	import Button from '@/components/shared/Button.svelte';

	let { uid }: { uid?: string } = $page.params;
	let user: User | null | undefined = $state<User | null | undefined>(undefined);
	let ratings: Array<Rating> | null | undefined = $state<Array<Rating> | null | undefined>(
		undefined
	);
	let isReady: boolean = $state<boolean>(false);
	let isLoading: boolean = $state<boolean>(true);

	const onSpinnerAnimationEnd = (): void => {
		isReady = true;
	};

	onMount(() => {
		if (userState.uid === uid) {
			user = userState.data;
			return;
		}

		if (typeof uid === 'undefined') {
			console.error('There are no given user UID');
			return;
		}

		fetchUserDataByUid(uid).then((value: User | null) => {
			user = value;
		});
	});

	$effect(() => {
		if (typeof uid === 'undefined' || typeof user === 'undefined' || user === null) {
			return;
		}

		fetchRatingsByUserUid(uid, 'date-asc').then((value: Array<Rating> | null) => {
			ratings = value;
			isLoading = false;
		});
	});

	const handleSignOut = () => {
		// TODO: Better, visual handling.
		signOutCurrentUser()
			.then(() => {
				goto('/sign-in');
			})
			.catch((error) => {
				console.error('Error signing out:', error);
			});
	};
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

			{#if userState.uid === uid}
				<Button color="danger" onclick={handleSignOut}>Sign Out</Button>
			{/if}
		{/if}
	</PageContainer>
{/if}

<style lang="scss">
	:global(.page__container#profilePage) {
		display: flex;
		flex-direction: column;
		gap: 35px;
	}

	.profile {
		&__header {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 20px;
			animation-name: reveal-element;
			animation-duration: 0.5s;

			&__details {
				display: flex;
				flex-direction: column;
				gap: 10px;
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
		}
	}
</style>
