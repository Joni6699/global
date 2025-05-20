let GroupVopros = [vopros, vopros2, vopros3, vopros4]
let test = GroupVopros[0];
let nomerVopros = -1;
let questionNumb = 0;
let userScore = 0;
let p = 0 
const nextBtn = document.querySelector('.next-btn');
const kConteiner = document.querySelector(".k-container");
const tryAgainBtn = document.querySelector(".tryagainbtn");
const processVal = document.querySelector('.process-val');
const сancel = document.querySelector(".сancel");
const level = document.querySelector(".level");
level.onclick = () => {
	levelUp()
	zamenaTest()
}
tryAgainBtn.onclick = () => {
	zamenaTest()
}
function levelUp() {
	p++
	if (p >= GroupVopros.length) {
		p = 0 
	}
	test = GroupVopros[p]
}
function zamenaTest() {
	kConteiner.style.transform = "translate(calc(100% + 600px), 0) scale(0)";
	conteiner.style.transform = "translate(0, 0)";
	nomerVopros = -1
	questionNumb = 0
	userScore = 0
	nomerVopros++
	pokazatotvet(nomerVopros)
	questionNumb++
	questionCounter(questionNumb)
	processVal.style.width = `${(nomerVopros / test.length) * 100}%`
	nextBtn.classList.remove('active')
	nextBtn.textContent = 'Continuе';
}
nextBtn.onclick = () => {
	if (nomerVopros < test.length - 1) {
		nomerVopros++
		pokazatotvet(nomerVopros)
		questionNumb++
		questionCounter(questionNumb)
		let processValue = (nomerVopros / test.length) * 110
		processVal.style.width = `${processValue}%`;
		// nextBtn.classList.remove('active')
		if (nomerVopros == test.length - 1) {
			nextBtn.textContent = 'Result';
		}
	} else {
		kConteiner.style.transform = 'translate(0, 0)';
		conteiner.style.transform = 'translate(calc(100% + 600px), 0) scale(0)';
		procentOtvet()
	}
}
сancel.onclick = () => {
	zConteiner.style.transform = 'translate(0, 0)';
	conteiner.style.transform = 'translate(calc(100% + 600px), 0) scale(0)';
	nomerVopros = -2
	questionNumb = 0
	userScore = 0
	nomerVopros++
	pokazatotvet(nomerVopros)
	questionNumb++
	questionCounter(questionNumb)
	nextBtn.classList.remove('active')
};
const optionList = document.querySelector('.option-list')
function pokazatotvet(index) {
	const voprosik = document.querySelector('.question-text')
	voprosik.textContent = `${test[index].num}. ${test[index].question}`
	let optionTag = `<div class="option"><span>${test[index].options[0]}</span></div>
        <div class="option"><span>${test[index].options[1]}</span></div>
        <div class="option"><span>${test[index].options[2]}</span></div>
        <div class="option"><span>${test[index].options[3]}</span></div>`
	optionList.innerHTML = optionTag
	const option = document.querySelectorAll('.option')
	for (let i = 0; i < option.length; i++) {
		option[i].setAttribute('onclick', 'optionSelected(this)')
	}
}
function optionSelected(answer) {
	let userAnswer = answer.textContent
	let correctAnswer = test[nomerVopros].answer
	let allOptions = optionList.children.length
	for (let i = 0; i < allOptions; i++) {
		optionList.children[i].classList.add('disabled')
	}
	nextBtn.classList.add('active')
	if (userAnswer == correctAnswer) {
		answer.classList.add('correct')
		userScore += 1
		headerScore()
	} else {
		answer.classList.add('incorrect')
		for (let i = 0; i < allOptions; i++) {
			if (optionList.children[i].textContent == correctAnswer) {
				optionList.children[i].setAttribute('class', 'option correct')
			}
		}
	}
}
function questionCounter(index) {
	const questionTotal = document.querySelector('.question-total')
	questionTotal.textContent = `${index}/${test.length}`
}
function headerScore() {
	const headerScoreText = document.querySelector('.header-score')
	headerScoreText.textContent = `Ваш результат: ${userScore} из ${test.length}`
}
function procentOtvet() {
    const skala = document.querySelector('.shkala');
    const procent = document.querySelector('.procent');
    let skorost = 35;
    let nachalo = -1;
 	let konec = Math.round((userScore / test.length) * 100);
    let timer = setInterval(() => {
    nachalo++
    procent.textContent = `${nachalo}%`
    skala.style.background = gradient(nachalo)
    if (nachalo == konec) {
			clearInterval(timer)
		}}, skorost);
}
function gradient(proverka) {
	const orange = 30
	const green = 65
	let color1
	if (proverka < orange) {
		color1 = '#ff0000'
	} else if (proverka < green) {
		color1 = '#ffa500'
	} else {
		color1 = '#01ff23'
	}
	return `conic-gradient(${color1} ${proverka * 3.6}deg, #f0f0f0aa 0deg)`
}
const conteiner = document.querySelector('.container');
const startBtn = document.querySelector('.startbtn');
const zConteiner = document.querySelector('.z-container');
startBtn.addEventListener('click', function () {
	nomerVopros++
	pokazatotvet(nomerVopros)
	questionNumb++
	questionCounter(questionNumb)
	processVal.style.width = `${(nomerVopros / test.length) * 100}%`
	nextBtn.classList.remove('active')
	conteiner.style.transform = 'translate(0, 0)'
	zConteiner.style.transform = 'translate(calc(100% + 600px), 0) scale(0)'
})