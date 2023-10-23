import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { $_getImages } from '../api/get'

export const useOptionStore = defineStore('options', {
  state: () => ({
    animalList: ['Monkey', 'Lion', 'Tiger', 'Rabbit']
  }),
  getters: {
    getAnimalList: (state) => state.animalList
  }
})

export const useCompositionStore = defineStore('composition', () => {
  const foodList = ref(['Hamburger', 'Ramyeon'])
  const getFoodList = computed((state, getters, rootState, rootGetters) => foodList.value)
  return {
    foodList,
    getFoodList
  }
})

// ApiView
export const useApiCallStore = defineStore('apicall', () => {
  const images = ref([])
  const getImages = computed(() => images.value)
  async function fetchImages (page, limit) {
    const { data } = await $_getImages(page, limit)
    images.value = data.value
  }
  return {
    images,
    getImages,
    fetchImages
  }
})
