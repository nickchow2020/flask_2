function starOutGrid(grid) {
    
    let indx = [];

    grid.forEach(row => {

            row.forEach((column,i)=>{
                if (column === "*"){
                    indx.push(i)
                }
            })

            if(row.includes("*")){
                for(let i = 0; i < row.length;i++){
                    row[i] = "*"
                }
            }
    });

    grid.forEach(row => {
        for(x of indx){
            row[x] = "*"
        }
    })

    return grid
}
