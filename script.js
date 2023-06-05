const button = document.getElementById("button")
const adviceTeller = document.getElementById("adviceDiv")
const idNumber = document.getElementById("numberOfAdvice")

function renderAdvice(advice) {
    adviceTeller.textContent = advice
}

function renderNumber(number) {
    idNumber.textContent = number
}

async function getAdvice() {

    const url ="https://api.adviceslip.com/advice"

    let advice = ''
    let number = ''

    try {
        const response = await fetch(url)
        const data = await response.json()

        if(data.slip.advice) {
            advice = `${data.slip.advice}`
        }

        if(data.slip.id) {
            number = `Advice #${data.slip.id}`
        }

        console.log(advice)
        console.log(number)
    }

    catch(e) {
        console.log(e)
    }

    renderAdvice(advice)
    renderNumber(number)
    tellMeAdvice(advice)
}

function tellMeAdvice(advice) {
    VoiceRSS.speech({
        key: '5ff4b1b6ab8143f488a977bc3a2f2a9c',
        src: advice,
        hl: 'en-us',
        v: 'Mike',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

button.addEventListener('click', getAdvice)