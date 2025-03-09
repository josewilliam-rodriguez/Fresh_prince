export const getData = async (url) => {
    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    return data
  }