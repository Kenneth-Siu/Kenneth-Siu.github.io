import Droppable from "https://cdn.jsdelivr.net/npm/@shopify/draggable/build/esm/Droppable/Droppable.mjs";

const droppable = new Droppable(document.querySelectorAll('section'), {
    draggable: '.item',
    dropzone: '.dropzone',
});

function revealAnswers(sectionSelector) {
    const section = document.querySelector(sectionSelector);
    let score = 0;
    const answerContainers = section.querySelectorAll(sectionSelector + " .answer-container");
    answerContainers.forEach((answerContainer) => {
        const answer = answerContainer.querySelector(".answer")
        answer.style.display = "flex";
        const item = answerContainer.querySelector(".item");
        if ((item && item.textContent) === answer.textContent) {
            answer.style.color = "green";
            answer.querySelector("span").textContent += " ✅"
            score++;
        } else {
            answer.style.color = "red";
            answer.querySelector("span").textContent += " ❌"
        }
        item && item.classList.remove("item");
        answerContainer.querySelector(".dropzone").classList.remove("dropzone");
    });
    section.querySelector("button").style.display = "none";
    section.querySelector(".names").style.display = "none";
    const scoreText = section.querySelector(".score-text");
    scoreText.style.display = "flex";
    const maxScore = answerContainers.length;
    scoreText.querySelector(".score").textContent += score;
    scoreText.querySelector(".max-score").textContent += maxScore;
    section.querySelector(".move-on-button").style.display = "block";
    if (score / maxScore > 0.5) {
        scoreText.querySelector(".emoji").textContent += "🎉";
    } else {
        scoreText.querySelector(".emoji").textContent += "😔";
    }
}
document.querySelector(".favourite-cards .reveal-answers-button").addEventListener("click", () => revealAnswers(".favourite-cards"));
document.querySelector(".favourite-sets .reveal-answers-button").addEventListener("click", () => revealAnswers(".favourite-sets"));

function revealNextSection(buttonSelector, nextSectionSelector) {
    document.querySelector(nextSectionSelector).style.display = "block";
    document.querySelector(buttonSelector).style.display = "none";
}
document.querySelector(".favourite-cards .move-on-button").addEventListener("click", () => revealNextSection(".favourite-cards .move-on-button", ".favourite-sets"));
document.querySelector(".favourite-sets .move-on-button").addEventListener("click", () => revealNextSection(".favourite-sets .move-on-button", ".favourite-keywords"));