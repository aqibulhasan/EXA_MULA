<template>
          <button class="vote-btn"><svg b-dbb52gm75x="" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path b-dbb52gm75x="" d="M9.27787 3.93695L3.68873 9.08488C2.70226 9.99348 3.31292 11.6411 4.65327 11.6873L7.05168 11.77C7.85951 11.7978 8.5 12.4608 8.5 13.2691V16.3571C8.5 17.1856 9.17157 17.8571 10 17.8571H10.9286C11.757 17.8571 12.4286 17.1856 12.4286 16.3571V13.2666C12.4286 12.4593 13.0675 11.7968 13.8743 11.7676L15.9325 11.6931C17.2708 11.6446 17.8797 10 16.8956 9.09178L11.3114 3.93797C10.7373 3.40808 9.85254 3.40764 9.27787 3.93695Z" stroke="black" stroke-width="2"></path>
                                </svg> {{ upVotes }}</button>
</template>

<script setup>
defineProps({upVotes: Number})
</script>
