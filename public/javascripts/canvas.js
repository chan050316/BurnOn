const canvas1 = document.querySelector("#startIconJS");
const cvs1 = canvas1.getContext("2d");

cvs1.fillStyle = "#f5f5f5";

cvs1.beginPath();
cvs1.moveTo(4, 1);
cvs1.lineTo(20, 10);
cvs1.lineTo(4, 19);
cvs1.lineTo(4, 0);
cvs1.fill();

const canvas2 = document.querySelector("#endIconJS");
const cvs2 = canvas2.getContext("2d");

cvs2.fillStyle = "#f5f5f5";

cvs2.beginPath();
cvs2.moveTo(2, 2);
cvs2.lineTo(18, 2);
cvs2.lineTo(18, 18);
cvs2.lineTo(2, 18);
cvs2.lineTo(2, 2);
cvs2.fill();

const canvas3 = document.querySelector("#stopIconJS");
const cvs3 = canvas3.getContext("2d");

cvs3.fillStyle = "#f5f5f5";

cvs3.beginPath();
cvs3.moveTo(4, 2);
cvs3.lineTo(8, 2);
cvs3.lineTo(8, 18);
cvs3.lineTo(4, 18);
cvs3.lineTo(4, 2);

cvs3.moveTo(12, 2);
cvs3.lineTo(16, 2);
cvs3.lineTo(16, 18);
cvs3.lineTo(12, 18);
cvs3.lineTo(12, 2);
cvs3.fill();
