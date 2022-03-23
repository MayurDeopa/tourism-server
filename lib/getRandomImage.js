
const getRandomImage = (arr)=>{
    if(!arr) return [];
    return arr[Math.floor(Math.random()*(arr.length))]
}

module.exports =getRandomImage;