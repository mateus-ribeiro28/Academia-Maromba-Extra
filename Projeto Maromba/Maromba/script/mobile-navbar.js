class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() { 
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
);
mobileNavbar.init();
  
   /* Calculadora IMC */
   function calculoImc() {
    var alt = document.querySelector('.altura')
    var pes = document.querySelector('.peso')
    
    var alt = Number (alt.value)
    var pes = Number (pes.value)
    var altq = alt * alt

    var imc =  pes / altq *10000
    
    var imcc = imc.toFixed(1)
        

    seu_imc.innerHTML = `Seu indice de massa corporal é ${imcc}`

  }

   /* FIM - Calculadora IMC */ 


   class Validator{
    constructor(){
        this.validations = [
        'data-required',
        'data-min-length',
        'data-email-validate',
        'data-only-letters',
        ]
    }

// iniciar a vaidação de todos os campos
validate(form){

    // resgata todas as validações
    let currentValidations = document.querySelectorAll('form .error-validation');

    if(currentValidations.length > 0){
        this.cleanValidations(currentValidations);
    }

    // pegar os inputs
    let inputs = form.getElementsByTagName('input');

    // transformo HTMLCollection -> array
    let inputsArray = [...inputs];


    // loop nos inputs e validação mediante ao que for encontrado
    inputsArray.forEach(function(input){

        //loop em todas as validações existentes
        for(let i = 0; this.validations.length > i; i++) {
            // verifica se a validação atual existe no input
            if(input.getAttribute(this.validations[i])  != null){
                
                // limpando a string para virar um método
                let method = this.validations[i].replace('data-', '').replace('-', '');

                // valor do input
                let value = input.getAttribute(this.validations[i]);

                //invocar o método
                this[method](input, value);
            }
        }
    }, this);

}


// verifica se o input tem um número mínimo de caracteres
minlength(input, minValue){
    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

    if(inputLength < minValue){
        this.printMessage(input, errorMessage);
    }
}

//valida emails
emailvalidate(input){
    // email@email.com -> email@email.com.br
    let re = /\S+@\S+\.\S+/;

    let email = input.value;
    
    let errorMessage = `Insira um e-mail no padrão maromba@email.com`;

    if(!re.test(email)){
        this.printMessage(input, errorMessage);
    }
}

// valida se o campo tem apenas letras
onlyletters(input){

    let re = /^[A-Za-z]+$/;

    let inputValue = input.value;

    let errorMessage = `Este campo não aceita números nem caracteres especiais`;

    if(!re.test(inputValue)){
        this.printMessage(input, errorMessage);
    }
}

// método para imprimir mensagem de erro na tela
printMessage(input, msg){

    // quantidade de erros
    let errosQty = input.parentNode.querySelector('.error-validation');

    if(errosQty === null){
          let template = document.querySelector('.error-validation').cloneNode(true);

    template.textContent = msg;

    let inputParent = input.parentNode;

    template.classList.remove('template');

    inputParent.appendChild(template);
    }

  
}

// verifica se o input é requerido
required(input){
    let inputValue = input.value;

    if(inputValue === ``){
        let errorMessage = `Este campo é obrigatório`;

        this.printMessage(input, errorMessage);
    }
}

// limpa as validações da tela
cleanValidations(validations){
    validations.forEach(el => el.remove());
}

}


let form = document.getElementById("register-form");
let submit = document.getElementById("submit");

let validator = new Validator();

//evento que faz a validação 

submit.addEventListener('click', function(e){

    e.preventDefault();

    validator.validate(form);

});


