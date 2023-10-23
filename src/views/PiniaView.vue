<template>
  <div>
    <h2>Options API 활용한 예제(Vuex처럼)</h2>
    <input type="text" v-model="text" @keypress.enter="addAnimal">
    <button @click="addAnimal">추가</button>
    <h4>State에서 직접 불러오기</h4>
    <p>현황 : {{ animalList }}</p>
    <h4>getters로 불러오기</h4>
    <p>storeToRefs로 불러오기 : {{ getAnimalList }}</p>
    <p>computed를 이용해서 getters 직접 불러오기(Vuex식 방식) : {{ getAnimalList2 }}</p>
    <hr />
    <h2>Composition API 활용한 예제(좀 더 자바스크립트스런 함수형)</h2>
    <input type="text" v-model="compText" @keypress.enter="addFood">
    <button @click="addFood">추가</button>
    <h4>ref로 단일 개체 불러오기(기존의 State역할. 여기선 Array)</h4>
    <p>현황: {{ foodList }}</p>
    <h4>임의의 getters로 불러오기(getters로 오브젝트 키 값을 주는 것이 아닌, get-으로 명명 후 computed로 객체를 가져오게 됨.)</h4>
    <p>storeToRefs를 이용한 구조분해할당으로 가져오기 : {{ getFoodList }}</p>
    <p>computed를 통해 vuex의 방식처럼 가져오기 : {{ getFoodList2 }}</p>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { useOptionStore, useCompositionStore } from '@/piniaStore/pinia'
import { storeToRefs } from 'pinia'
export default {
  name: 'PiniaView',
  components: {},
  directives: {},
  provide () {
    return {
    }
  },
  props: {},
  setup () {
    const text = ref('')
    const optionsStore = useOptionStore()
    // 구조 분해 할당
    const { animalList, getAnimalList } = storeToRefs(optionsStore)
    function addAnimal () {
      optionsStore.$patch({
        animalList: [...animalList.value, text.value]
      })
      // 초기화
      text.value = ''
    }
    const compositionStore = useCompositionStore()
    const compText = ref('')

    // 반응성 유지를 위해 storeToRefs로 받아온다.
    const { foodList, getFoodList } = storeToRefs(compositionStore)
    function addFood () {
      compositionStore.$patch({
        // value로 받는 것에 주의한다.
        foodList: [...getFoodList.value, compText.value]
      })
      compText.value = ''
    }

    return {
      text,
      animalList,
      getAnimalList,
      getAnimalList2: computed(() => optionsStore.getAnimalList),
      addAnimal,
      compText,
      foodList,
      getFoodList,
      getFoodList2: computed(() => compositionStore.getFoodList),
      addFood
    }
  },
  data () {
    return {
      sampleData: ''
    }
  },
  computed: {},
  watch: {},
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeUnmount () {},
  unmounted () {},
  methods: {}
}
</script>
