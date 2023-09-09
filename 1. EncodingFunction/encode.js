function encodeBaju(hj, hji, ht){
    try{
        if (ht > translateKode(hji)){
            console.log("GOOD, customer terbaik gak pake nawar")
        } else if (translateKode(hj) <= ht){
            console.log("ACCEPT, terima kasih sudah berbelanja")
        } else {
            console.log("REJECT, belum balik modal nih")
        }
    } catch (e){
        console.log(e)
    }
}

function translateKode(x){
    const encoding = 'TEDUHASYIK';
    let result = '';

    for (let c of x){
        let index = encoding.indexOf(c);
        if (index !== -1){
            result += index;
        } else {
            throw new Error('Invalid character')
        }
    }
    return parseInt(result)*1000;
}

encodeBaju("AT","YH",70000); // “ACCEPT, terima kasih sudah berbelanja”
encodeBaju("ESH", "DTT", 150000); // “REJECT, belum balik modal nih!”
encodeBaju("DET", "DHT", 250000);//GOOD, customer terbaik gak pake nawar”