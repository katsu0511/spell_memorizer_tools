const chapter = '"0000000001"';
let mp3 = '0001-0040';
const btn = document.getElementById('make');
btn.addEventListener('click', function() {
  const start = document.getElementById('start').value == '' ? null : Number(document.getElementById('start').value);
  const end = document.getElementById('end').value == '' ? null : Number(document.getElementById('end').value);
  let num = document.getElementById('num').value == '' ? null : Number(document.getElementById('num').value);
  if (start != null && end != null && num != null) {
    let text = '';
    let count = 0;
    for (let i = start; i <= end; i++) {
      count++;
      num++;
      const padding = 10 - String(num).length;
      let number = '';
      for (let n = 0; n < padding; n++) {
        number += '0';
      }
      number += num;
      text += `INSERT INTO WDTB (WORDCD,CPTRCD,WORDNU,WRDSPL,WRDSND) VALUES ("${number}",${chapter},${i},"aaaaaa","${mp3}.mp3");\n`;
      if (count == 40) {
        const num = mp3.split('-')[0];
        const newNum = Number(num) + count;
        mp3 = `${newNum}-${newNum + count - 1}`;
        count = 0;
      }
    }

    const blob = new Blob([text],{type:"text/plain"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sql.txt';
    link.click();
  }
});
