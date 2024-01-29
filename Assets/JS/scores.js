var scoresList = document.getElementById("scoreList");
var scores = JSON.parse(localStorage.getItem("highScores")) || [];
var clearBtn = document.getElementById("clearScores");
// Sort Scores
scores.sort(function (a, b) {
    return b.score - a.score;
});
for (var i = 0; i < scores.length; i++) {
    var li = document.createElement("li");
    li.textContent = scores[i].initials + " - " + scores[i].score;
    scoresList.appendChild(li);
}
// Clear Scores
clearBtn.addEventListener("click", function () {
    localStorage.clear();
    scoresList.innerHTML = "";
});
