function snakeToCamel(arr) {
    let splitArr = arr.split("_")
    return splitArr.reduce((acc,next)=>{
        return acc + next.charAt(0).toUpperCase() + next.slice(1)
    })
}

