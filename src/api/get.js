import axios from 'axios'
import { ref } from 'vue'

export async function $_getImages (...args) {
  const data = ref(null)
  if (args[0] === null || args[1] === null) {
    alert('페이지 수와 이미지 수를 입력해주세요.')
    return { data } // 안보내면 pinia.js의 fetchImages에서 const { data }를 못받아 구조분해할당을 못받음.
  }

  const BASE_URL = `https://picsum.photos/v2/list?page=${args[0]}&limit=${args[1]}`
  await axios.get(BASE_URL)
    .then((res) => {
      data.value = res.data
    })
  return { data }
}
