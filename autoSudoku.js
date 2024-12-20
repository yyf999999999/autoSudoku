let table = document.getElementById("sudoku");
let inputNumber = document.getElementById("inputNumber");
let beforeCell = [0, 0];

for (let i = 1; i < 10; i++){
    let button = document.createElement("button");
    button.innerText = i;
    button.classList.add("numberButton");
    button.setAttribute("onclick", `inputNum(${i})`);
    inputNumber.appendChild(button);
}
let nullButton = document.createElement("button");
nullButton.innerText = "del";
nullButton.classList.add("numberButton");
nullButton.setAttribute("onclick", `inputNum(null)`);
inputNumber.appendChild(nullButton);

const setUp = () =>{
    for (let i = 0; i < 9; i++){
        let tr = document.createElement("tr");
        for (let j = 0; j < 9; j++){
            let td = document.createElement("td");
            let button = document.createElement("button");
            button.innerText = "";
            button.classList.add("square");
            button.setAttribute("onclick", `setNumber(${i},${j})`);
            if (i == 0 && j == 0) button.style.backgroundColor = "#FFCCCC";
            td.appendChild(button);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

const setNumber = (r,c) =>{
    let beforeContent = table.rows[beforeCell[0]].cells[beforeCell[1]].querySelector("button");
    let content = table.rows[r].cells[c].querySelector("button");
    beforeContent.style.backgroundColor = "white";
    content.style.backgroundColor = "#FFCCCC";
    beforeCell = [r, c];
}

const inputNum = (num) =>{
    let content = table.rows[beforeCell[0]].cells[beforeCell[1]].querySelector("button");
    content.innerText = num;
}

const beforeSolve = () =>{
    let nowTable = new Array(9);
    let answers = new Array(9);
    for (let i = 0; i < 9; i++){
        let contents = new Array(9);
        for (let j = 0; j < 9; j++){
            let content = table.rows[i].cells[j].querySelector("button");
            contents[j] = content.innerText;
            if (!contents[j]){
                contents[j] = 0;
            }else{
                contents[j] = Number(contents[j]);
            }
        }
        nowTable[i] = contents;
        answers[i] = new Array(9);
    }
    solve(nowTable, answers);
}

const solve = (nowTable, answers) =>{
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (nowTable[i][j] === 0){
                let numbers = new Array(9).fill(0).map((_, a) => a + 1);
                let up = Math.floor(i / 3)*3;
                let left = Math.floor(j / 3)*3;for (let n = up; n < up + 3; n++){
                    for (let m = left; m < left + 3; m++){
                        if (nowTable[n][m]){
                            numbers[nowTable[n][m] - 1] = 0;
                        }
                    }
                }
                for (let n = 0; n < 9; n++){
                    if (nowTable[i][n]){
                        numbers[nowTable[i][n] - 1] = 0;
                    }
                }
                for (let n = 0; n < 9; n++){
                    if (nowTable[n][j]){
                        numbers[nowTable[n][j] - 1] = 0;
                    }
                }
                let answer = numbers.filter(TF => TF);
                if (answer.length == 1){
                    nowTable[i][j] = answer[0];
                    answers[i][j] = false;
                    return solve(nowTable, answers);
                }else{
                    answers[i][j] = answer;
                }
            }else{
                answers[i][j] = false;
            }
        }
    }
    for (let n = 1; n < 10; n++){
        let answersTable = new Array(9);
        for (let i = 0; i < 9; i++){
            answersTable[i] = new Array(9);
            for (let j = 0; j < 9; j++){
                if (answers[i][j]){
                    answersTable[i][j] = answers[i][j].includes(n);
                }else{
                    answersTable[i][j] = false;
                }
            }
        }
        console.log(answers);
        console.log(answersTable, n);
        for (let i = 0; i < 9; i++){
            for (let j = 0; j < 9; j++){
                if (answersTable[i][j] && !nowTable[i][j]){
                    let up = Math.floor(i / 3)*3;
                    let left = Math.floor(j / 3)*3;
                    let row = answersTable[i];
                    let column = answersTable.map(row => row[j]);
                    let ul = [];
                    for (let k = up; k < up + 3; k++){
                        ul.push(...answersTable[k].slice(left, left+3));
                    }
                    if (beforeCell[0] === i && beforeCell[1] === j){
                        console.log(row, j, row.filter(TF => TF).length);
                        console.log(column, i, column.filter(TF => TF));
                        console.log(ul,(i - up) * 3 + j - left, ul.filter(TF => TF));
                    }
                    if (row.filter(TF => TF).length === 1 && row[j] ||
                        column.filter(TF => TF).length === 1 && column[i] ||
                        ul.filter(TF => TF).length === 1 && ul[(i - up) * 3 + j - left]){
                        nowTable[i][j] = n;
                        answers[i][j] = false;
                        return solve(nowTable, answers);
                    }
                }
            }
        }
    }

    /*for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (answers[i][j]){
                let up = Math.floor(i / 3)*3;
                let left = Math.floor(j / 3)*3;
                for (let n = up; n < up + 3; n++){
                    for (let m = left; m < left + 3; m++){
                        if (nowTable[n][m]){
                            answers[i][j] = answers[i][j].filter(ans => ans!==nowTable[n][m]);
                        }
                    }
                }
                for (let n = 0; n < 9; n++){
                    if (nowTable[i][n]){
                        answers[i][j] = answers[i][j].filter(ans => ans!==nowTable[i][n]);
                    }
                }
                for (let n = 0; n < 9; n++){
                    if (nowTable[n][j]){
                        answers[i][j] = answers[i][j].filter(ans => ans!==nowTable[n][j]);
                    }
                }
                if (answers[i][j].length == 1){
                    nowTable[i][j] = answers[i][j][0];
                    answers[i][j] = false;
                }else{
                    answers[i][j] = answers[i][j];
                }
            }
        }
    }*/

    /*for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (answers[i][j]){
                for (let k = 0; k < answers[i][j].length; k++){
                    let up = Math.floor(i / 3)*3;
                    let left = Math.floor(j / 3)*3;
                    let ansTF = true;
                    for (let n = up; n < up + 3; n++){
                        if (i === n)continue;
                        if (nowTable[n].includes(answers[i][j][k])){
                            continue;
                        }else{
                            ansIs = [false, false, false];
                            for (let m = left; m < left + 3; m++){
                                if (answers[n][m]){
                                    if (!answers[n][m].includes(answers[i][j][k]))ansIs[m - left] = true;
                                }
                            }
                            if (beforeCell[0] == i && beforeCell[1] == j){
                                console.log(answers[i][j][k]);
                                console.log((nowTable[n][left] || ansIs[0]) && (nowTable[n][left+1] || ansIs[1]) 
                                && (nowTable[n][left+2] || ansIs[2]));
                            }
                            if ((nowTable[n][left] || ansIs[0]) && (nowTable[n][left+1] || ansIs[1]) 
                                && (nowTable[n][left+2] || ansIs[2])){
                                if (beforeCell[0] == i && beforeCell[1] == j)console.log(answers[i][j][k]);
                                continue;
                            }else{
                                ansTF = false;
                                break;
                            }
                        }
                    }
                    for (let n = left; n < left + 3; n++){
                        if (j === n)continue;
                        if (nowTable.map(row => row[n]).includes(answers[i][j][k])){
                            continue;
                        }else{
                            ansIs = [false, false, false];
                            for (let m = up; m < up + 3; m++){
                                if (answers[m][n]){
                                    if (!answers[m][n].includes(answers[i][j][k]))ansIs[m - up] = true;
                                }
                            }
                            if (beforeCell[0] == i && beforeCell[1] == j){
                                console.log(answers[1][n], answers[i][j][k]);
                                console.log((nowTable[up][n] || ansIs[0]) && (nowTable[up+1][n] || ansIs[1]) 
                                && (nowTable[up+2][n] || ansIs[2]));
                            }
                            if ((nowTable[up][n] || ansIs[0]) && (nowTable[up+1][n] || ansIs[1]) 
                                && (nowTable[up+2][n] || ansIs[2])){
                                continue;
                            }else{
                                ansTF = false;
                                break;
                            }
                        }
                    }
                    if (ansTF){
                        nowTable[i][j] = answers[i][j][k];
                        answers[i][j] = false;
                        break;
                    }
                }
            }
        }
    }*/

    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (nowTable[i][j] !== 0){
                table.rows[i].cells[j].querySelector("button").innerText = nowTable[i][j];
            }
        }
    }
}

document.addEventListener('keydown',
    e => {
        if (/^[1-9]$/.test(e.key)) {
            inputNum(Number(e.key));
        }else if (e.key === "Backspace" || e.key === "Delete"){
            inputNum(null);
        }else{
            switch (e.key) {
                case 'ArrowUp':
                    if (beforeCell[0]) setNumber(beforeCell[0]-1, beforeCell[1]);
                    break;
                case 'ArrowDown':
                    if (beforeCell[0] !== 8) setNumber(beforeCell[0]+1, beforeCell[1]);
                    break;
                case 'ArrowLeft':
                    if (beforeCell[1]) setNumber(beforeCell[0], beforeCell[1]-1);
                    break;
                case 'ArrowRight':
                    if (beforeCell[1] !== 8) setNumber(beforeCell[0], beforeCell[1]+1);
                    break;
                default:
                    break;
            }
        }
    });

setUp();