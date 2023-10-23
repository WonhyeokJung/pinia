<script setup>
import { ref } from 'vue'
import { useApiCallStore } from '../piniaStore/pinia'
import { storeToRefs } from 'pinia'

function loaded () {
  console.log('@load loaded')
}

const page = ref(null)
const limit = ref(null)
const apiCallStore = useApiCallStore()

const { images, getImages } = storeToRefs(apiCallStore)
// actions는 storeToRefs 사용해서 불러오면
// 함수 인식이 불가능하므로, 따로 부른다(Options, Composition 둘다)
// 아래 둘 중 하나로 쓰면 됨.
const { fetchImages } = apiCallStore
// const fetchImages = apiCallStore.fetchImages

</script>
<template>
  <div>
    <label for="page">
      원하는 페이지 입력 :
      <input v-model="page" class="page" type="text" placeholder="숫자 입력">
    </label>
    <label for="limit">
      원하는 장수 입력 :
      <input v-model="limit" class="limit" type="text" placeholder="숫자 입력">
    </label>
    <button @click="fetchImages(page, limit)" @keypress.enter="fetchImages(page, limit)">실행</button>
    <h2>state 이용한(images) 이미지 가져오기</h2>
    <div v-if="images" class="image-container">
      <div v-for="(image, i) in images" :key="i">
        <img :src="image.download_url" alt="IMAGE" @load="loaded">
      </div>
    </div>
    <h2>getters 이용한(getImages) 이미지 가져오기</h2>
    <div v-if="getImages" class="image-container">
      <div v-for="(image, i) in getImages" :key="i">
        <img :src="image.download_url" alt="IMAGE" @load="loaded">
      </div>
    </div>
  </div>
</template>
<style scoped>
.image-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
}
img {
  width: 300px;
  height: 225px;
  margin: 10px;
}
</style>
