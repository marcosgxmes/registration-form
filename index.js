
//VALIDAR FORMULARIO USANDO CLASS

class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');

        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.validCamps();
    const senhaValidas = this.ValidPasswords();

    if(camposValidos && senhaValidas) {
        alert('Formulário enviado com sucesso.')
        // enviar formulario para backend ->  this.formulario.submit();
     }
    }

    ValidPasswords() {
        let valid = true;

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');

        if(senha.value !== repetirSenha.value) {
            valid = false;
            this.criaErro(senha, 'Os campos senha não coincidem.');
            this.criaErro(repetirSenha, 'Os campos senha não coincidem.');
        }

        if(senha.value.length < 6 || senha.value.lenght > 12) {
            valid = false;
            this.criaErro(senha, 'Senha precisa ter entre 6 e 12 caracteres.')
        }

        return valid;
    }

    validCamps() {
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerHTML;
            if(!campo.value) {
                this.criaErro(campo, `O campo ${label} não pode estar vazio.`)
                valid = false;
            }

            if(campo.classList.contains("cpf")) {
                if(!this.validaCPF(campo)) valid = false;
            }

            if(campo.classList.contains("usuario")) {
                if(!this.validaUsuario(campo)) valid = false;
            }
 
        }

        return valid;
    }

    validaUsuario(campo) {
        const usuario = campo.value;
        let valid = true;

        if(usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo, 'Usuario precisa ter entre 3 e 12 caracteres.')
            valid = false;
        }

        if(!usuario.match(/[a-zA-Z0-9/]+$/g)) {
            this.criaErro(campo, 'Utilize apenas letras ou números.')
            valid = false;
        }

        return true;
    }

    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value);

        
        if(!cpf.valida()) {
            this.criaErro(campo, 'CPF inválido.');
            return false;
        }

        return true;
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario();

