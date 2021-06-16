var maxField = 10;
  var number = 1;
  var maxFieldData = 5;
  var numberData = 1;
  var addButton = $('.add_button');
  var addButtonData = $('.add_button_data');
  var wrapper = $('#funcionarios');
  var wrapperData = $('#data');
  var fieldHTML = `
    <tr>
        <td> <input name="nome[]"></td>
        <td> <input name="RG[]"></td>
        <td> <input name="CPF[]">
          <a href="javascript:void(0);" class="remove_button"><img src="https://www.shareicon.net/data/16x16/2015/09/22/104937_delete_512x512.png"/></a>
        </td>
    </tr>
  `;
  var fieldHTMLData =`<tr>              <td>Data</td>
            <th><input name="date[]" type="date">
            <a href="javascript:void(0);" class="remove_buttonData"><img src="https://www.shareicon.net/data/16x16/2015/09/22/104937_delete_512x512.png"/></a></th>
        </tr>`;

  $(addButton).click(function(){
    if(number < maxField) { 
      number++; 
      $(wrapper).append(fieldHTML); 
    }
  });

  $(wrapper).on('click', '.remove_button', function(e){
    e.preventDefault();
    $(this).parent('td').parent('tr').remove(); //Remove field html
    number--;
  });

//Botão ADD data

  $(addButtonData).click(function(){
    if(numberData < maxFieldData) { 
      numberData++; 
      $(wrapperData).append(fieldHTMLData); 
    }
  });

  $(wrapperData).on('click', '.remove_buttonData', function(e){
    e.preventDefault();
    $(this).parent('th').parent('tr').remove(); //Remove field html
    numberData--;
  });

// fim do botao add data

$('#gerarPDF').click(function() { 
  var nome = []; 
  var rg = []; 
  var cpf = [];  
  
  $('input[name^="nome"]').each(function(count) {
    nome.push($(this).val());
  });
  $('input[name^="RG"]').each(function(count) {
    rg.push($(this).val());
  });
  $('input[name^="CPF"]').each(function(count) {
    cpf.push($(this).val());
  });
  for (i=0; i<nome.length; i++)
   gerarPDF(nome[i], rg[i], cpf[i])

  
   // gerarPDF($(this).val())
})



function gerarPDF (nome, rg, cpf){
  var doc = new jsPDF({
  orientation: 'landscape',
  unit: 'cm',
  format: 'a4',
});
  var frase = ""
  frase = montaFrase(nome, rg, cpf)
doc.setFontSize(18);
doc.setFont("Century Gothic");
doc.text('CERTIFICA QUE', 7, 5,{ 
align: 'center',
maxWidth: 20,
baseline: 'midle'
});

doc.setFontSize(36);
doc.setFont("Original Surfer");
doc.text(nome ,15, 7, 'center');

doc.setFontSize(18);
doc.setFont("Century Gothic");
doc.text(frase, 15, 9,{ 
align: 'center',
maxWidth: 20,
})

doc.setFontSize(14,5);
doc.setFont("Original Surfer");
doc.text('______________________' ,5, 17, 'center');

doc.setFontSize(14,5);
doc.setFont("Original Surfer");
doc.text('Felipe Matthiesen Bonoto' ,5, 17.8, 'center');

doc.setFontSize(14,5);
doc.setFont("Original Surfer");
doc.text('______________________' ,25, 17, 'center');

doc.setFontSize(14,5);
doc.setFont("Original Surfer");
doc.text(nome ,25, 17.8, 'center');

doc.setFontSize(14,5);
doc.setFont("Original Surfer");
doc.text("RG: " + rg ,25, 18.5, 'center');
  
  doc.save(nome + '.pdf')
}

function montaFrase(nome, rg, cpf){
   var curso = document.querySelector("#cursos")
   
   // objetos dos cursos
   var NR10 = {
    name: "NR10",
    nomeTec: "SEGURANÇA EM INSTALAÇÕES E SERVIÇOS EM ELETRICIDADE",
    formacao: '40 (Quarenta)',
    Reciclagem: 16
}
   var NR11 = {
    name: "NR11",
    nomeTec: "TRANSPORTE, MOVIMENTAÇÃO, ARMAZENAGEM E MANUSEIO DE MATERIAIS",
    formacao: '8 (Oito)',
    Reciclagem: 8
}
   var NR18 = {
    name: "NR18",
    nomeTec: "NR18",
    formacao: '6 (Seis)',
    Reciclagem: 6
}
   var NR20 = {
    name: "NR20",
    nomeTec: "SEGURANÇA E SAÚDE NO TRABALHO COM INFLAMÁVEIS E COMBUSTÍVEIS",
    formacao: '4 (Quatro)',
    Reciclagem: 4
}
   var NR12 = {
    name: "NR12",
    nomeTec: "SEGURANÇA NO TRABALHO EM MÁQUINAS E EQUIPAMENTOS",
    formacao: '4 (Quatro)',
    Reciclagem: 4
}
   var NR33 = {
    name: "NR33",
    nomeTec: "SEGURANÇA E SAÚDE NOS TRABALHOS EM ESPAÇOS CONFINADOS",
    formacao: '16 (Dezesseis)',
    Reciclagem: 8
}
   var NR34 = {
    name: "NR34",
    nomeTec: "NR34",
    formacao: '12 (Doze)',
    Reciclagem: 4
}
   var NR35 = {
    name: "NR18",
    nomeTec: "TRABALHO EM ALTURA",
    formacao: '8 (Oito)',
    Reciclagem: 8
}
   var SEP = {
    name: "SEP",
    nomeTec: "SISTEMA ELÉTRICO DE POTÊNCIA",
    formacao: '40 (Quarenta)',
    Reciclagem: 16
}
   var supNR33 = {
    name: "Sup NR33",
    nomeTec: "SEGURANÇA E SAÚDE NOS TRABALHOS EM ESPAÇOS CONFINADOS",
    formacao: '40 (Quarenta)',
    Reciclagem: 40
}
   
   var cursoObj = [NR10, NR11, NR18, NR20, NR12, NR33, NR34, NR35, SEP, supNR33]
   
   for(i = 0; cursoObj.length > i; i++){
     console.log(cursoObj[i].name)
     if (cursoObj[i].name = curso.value){
            console.log(cursoObj[i].nameTec)
        var frase = 'Portador do RG '+ rg + ', concluiu com aproveitamento o curso de formação de ' + cursoObj[i].name +' ' + cursoObj[i].nomeTec +' com carga horária de ' + cursoObj[i].formacao + ' horas, conforme programa no verso. '

     }
   }
  return frase   
}