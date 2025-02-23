const BUTTONS = document.querySelectorAll(".buttons > button")
const SCORE = document.getElementById("score")
const catFact = document.getElementById("catFact")

let myScore = 0
let compScore = 0
let selected = null
let score = `${myScore}:${compScore}`
let fact = false

SCORE.innerHTML = score

let images = [
    {
        name: "rock",
        image: "src/images/rock.png"
    },
    {
        name: "scissors",
        image: "src/images/scissors.png"
    },
    {
        name: "paper",
        image: "src/images/paper.png"
    }
]

BUTTONS.forEach(button => {
    button.addEventListener("click", (event) => {
        selected = button.id
        
        let myHand = document.getElementById("my-select")
        let compHand = document.getElementById("random-select")
        let shakeRock = document.getElementsByClassName("shakeRock")

        myHand.setAttribute("src", images.filter(data => data.name === selected)[0].image)
        const selectedRandom = images[Math.floor(Math.random() * 3)]
        compHand.setAttribute("src", selectedRandom.image)

        shakeRock[0].style.animation = "shake 2s 1"
        shakeRock[1].style.animation = "shake 2s 1"
        myHand.style.animation = "shake 2s 1, switchTo 2s 1"
        compHand.style.animation = "shake 2s 1, switchTo 2s 1"
                
        setTimeout(() => {
            shakeRock[0].style.animation = "unset"
            shakeRock[1].style.animation = "unset"
            myHand.style.animation = "unset"
            compHand.style.animation = "unset"

            if (((selected === "rock") && (selectedRandom.name === "scissors")) || ((selected === "scissors") && (selectedRandom.name === "paper")) || ((selected === "paper") && (selectedRandom.name === "rock"))) {
                myScore++
                fact = true
            }
            if (((selected === "scissors") && (selectedRandom.name === "rock")) || ((selected === "paper") && (selectedRandom.name === "scissors")) || ((selected === "rock") && (selectedRandom.name === "paper"))) {
                compScore++
            }
            
            score = `${myScore}:${compScore}`
            if (fact) {
                document.getElementById("fact").classList.add("factStyle")

                fetch("https://catfact.ninja/fact")
                .then(response => response.json())
                .then(data => {
                    catFact.innerHTML = data.fact
                })
                catFact.style.border = "3px solid rgb(80, 80, 80)"
                SCORE.innerHTML = "Jūs atvērāt jaunu kaķa faktu!"
                setTimeout(() => {
                    SCORE.innerHTML = score
                }, 1500)
                fact = false
            }
            else {
                SCORE.innerHTML = score
            }
        }, 2000)
    })
});


const heading = new IntersectionObserver((entries) => {
    entries.forEach (entry => {
        entry.target.classList.toggle("animatedHeading", entry.isIntersecting)
    })
}, {
    rootMargin: "100px",
})
heading.observe(document.getElementById("heading"))

const rps = new IntersectionObserver((entries) => {
    entries.forEach (entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add(entry.target.id);
        } else {
            entry.target.classList.remove(entry.target.id);
        }
    })
}, {
    rootMargin: "50px",
})
const animatedImages = document.querySelectorAll(".animated-rps")
animatedImages.forEach(animatedImage => {
    rps.observe(animatedImage)
})