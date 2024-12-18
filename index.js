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
        scoreText.querySelector(".emoji").textContent += "🤔";
    }
    window.scrollTo(0, document.body.scrollHeight);
}
document.querySelector(".favourite-cards .reveal-answers-button").addEventListener("click", () => revealAnswers(".favourite-cards"));
document.querySelector(".favourite-sets .reveal-answers-button").addEventListener("click", () => revealAnswers(".favourite-sets"));
document.querySelector(".favourite-basic-land-printings .reveal-answers-button").addEventListener("click", () => revealAnswers(".favourite-basic-land-printings"));
document.querySelector(".favourite-keywords .reveal-answers-button").addEventListener("click", () => revealAnswers(".favourite-keywords"));
document.querySelector(".favourite-vanilla-creatures .reveal-answers-button").addEventListener("click", () => revealAnswers(".favourite-vanilla-creatures"));

function revealNextSection(buttonSelector, nextSectionSelector) {
    document.querySelector(buttonSelector).style.display = "none";
    const nextSection = document.querySelector(nextSectionSelector);
    nextSection.style.display = "flex";
    const rect = nextSection.getBoundingClientRect();
    window.scrollBy(0, rect.top);
}
document.querySelector(".favourite-cards .move-on-button").addEventListener("click", () => revealNextSection(".favourite-cards .move-on-button", ".favourite-sets"));
document.querySelector(".favourite-sets .move-on-button").addEventListener("click", () => revealNextSection(".favourite-sets .move-on-button", ".favourite-basic-land-printings"));
document.querySelector(".favourite-basic-land-printings .move-on-button").addEventListener("click", () => revealNextSection(".favourite-basic-land-printings .move-on-button", ".favourite-keywords"));
document.querySelector(".favourite-keywords .move-on-button").addEventListener("click", () => revealNextSection(".favourite-keywords .move-on-button", ".favourite-vanilla-creatures"));

function revealFinalScore(buttonSelector, nextSectionSelector) {
    document.querySelector(buttonSelector).style.display = "none";
    const section = document.querySelector(nextSectionSelector)
    section.style.display = "block";
    let currentScore = 0;
    const answerMaxScore = parseInt(document.querySelector(".favourite-cards .max-score").textContent);
    const unorderedList = section.querySelector(".section-scores");
    window.scrollTo(0, document.body.scrollHeight);
    let clipboardText = "";
    setTimeout(() => {
        const score1 = parseInt(document.querySelector(".favourite-cards .score").textContent);
        currentScore += score1;
        const listItem1 = document.createElement("p");
        const text1 = "Favourite cards: " + score1 + " / " + answerMaxScore;
        listItem1.textContent = text1;
        clipboardText += text1 + "\n";
        unorderedList.appendChild(listItem1);
        window.scrollTo(0, document.body.scrollHeight);

        setTimeout(() => {
            const score2 = parseInt(document.querySelector(".favourite-sets .score").textContent);
            currentScore += score2;
            const listItem2 = document.createElement("p");
            const text2 = "Favourite sets: " + score2 + " / " + answerMaxScore;
            listItem2.textContent = text2;
            clipboardText += text2 + "\n";
            unorderedList.appendChild(listItem2);
            window.scrollTo(0, document.body.scrollHeight);

            setTimeout(() => {
                const score3 = parseInt(document.querySelector(".favourite-basic-land-printings .score").textContent);
                currentScore += score3;
                const listItem3 = document.createElement("p");
                const text3 = "Favourite basic land printings: " + score3 + " / " + answerMaxScore;
                listItem3.textContent = text3;
                clipboardText += text3 + "\n";
                unorderedList.appendChild(listItem3);
                window.scrollTo(0, document.body.scrollHeight);

                setTimeout(() => {
                    const score4 = parseInt(document.querySelector(".favourite-keywords .score").textContent);
                    currentScore += score4;
                    const listItem4 = document.createElement("p");
                    const text4 = "Favourite keywords/mechanics: " + score4 + " / " + answerMaxScore;
                    listItem4.textContent = text4;
                    clipboardText += text4 + "\n";
                    unorderedList.appendChild(listItem4);
                    window.scrollTo(0, document.body.scrollHeight);

                    setTimeout(() => {
                        const score5 = parseInt(document.querySelector(".favourite-vanilla-creatures .score").textContent);
                        currentScore += score5;
                        const listItem5 = document.createElement("p");
                        const text5 = "Favourite vanilla creatures: " + score5 + " / " + answerMaxScore;
                        listItem5.textContent = text5;
                        clipboardText += text5 + "\n";
                        unorderedList.appendChild(listItem5);
                        window.scrollTo(0, document.body.scrollHeight);

                        setTimeout(() => {
                            clipboardText += "**Final Score: ";
                            const finalScoreText = document.querySelector(".final-score-text");
                            finalScoreText.style.display = "block";

                            const scoreText = section.querySelector(".final-score-text");
                            scoreText.style.display = "flex";
                            scoreText.querySelector(".score").textContent += currentScore;
                            const maxScore = answerMaxScore * 5;
                            scoreText.querySelector(".max-score").textContent += maxScore;
                            if (currentScore / maxScore > 0.9) {
                                scoreText.querySelector(".emoji").textContent += "🏆";
                                clipboardText += "🏆";
                            } else if (currentScore / maxScore > 0.5) {
                                scoreText.querySelector(".emoji").textContent += "🥳";
                                clipboardText += "🥳";
                            } else if (currentScore / maxScore > 0.2) {
                                scoreText.querySelector(".emoji").textContent += "😕";
                                clipboardText += "😕";
                            } else {
                                scoreText.querySelector(".emoji").textContent += "😵";
                                clipboardText += "😵";
                            }
                            clipboardText += " " + currentScore + " / " + maxScore + "**";
                            window.scrollTo(0, document.body.scrollHeight);


                            setTimeout(() => {
                                const cta = document.querySelector(".cta");
                                cta.style.display = "block";
                                cta.querySelector("button").addEventListener("click", () => navigator.clipboard.writeText(clipboardText));
                                window.scrollTo(0, document.body.scrollHeight);
                            }, 1600);
                        }, 1600);
                    }, 800);
                }, 800);
            }, 800);
        }, 800);
    }, 800);
}

document.querySelector(".favourite-vanilla-creatures .move-on-button").addEventListener("click", () => revealFinalScore(".favourite-vanilla-creatures .move-on-button", ".final-score"));