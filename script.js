class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario');
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener('submit', (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.isValide();
    const senhasValidas = this.senhasValidas();

    if (camposValidos && senhasValidas) {
      alert('formulario enviado');
      this.formulario.submit();
    }
  }

  senhasValidas() {
    let valid = true;

    const senha = this.formulario.querySelector('.senha');
    const repetirSenha = this.formulario.querySelector('.repetir-senha');

    if (senha.value !== repetirSenha.value) {
      valid = false;
      this.criaErro(senha, 'Campos senha e repetir senha precisa ser iguais');
      this.criaErro(
        repetirSenha,
        'Campos senha e repetir senha precisa ser iguais'
      );
    }

    if (senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres.');
    }

    return valid;
  }

  isValide() {
    let valid = true;

    for (let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for (let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.innerText;

      if (!campo.value) {
        this.criaErro(campo, `Campo "${label}" não pode estar em branco.`);
        valid = false;
      }

      if (campo.classList.contains('cpf')) {
        if (!this.validaCPF()) valid = false;
      }

      if (campo.classList.contains('usuario')) {
        if (!this.validaUsuario(campo)) valid = false;
      }
    }
  }

  validaUsuario() {
    const usuario = campo.value;
    let valid = true;
    if (usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, 'usuario precisa ter entre 3 e 12 carateres');
      valid = false;
    }

    if (!usuario.match(/[a-zA-Z0-9]/g)) {
      this.criaErro(
        campo,
        'Nome de usuario precisa conter apenas letras e/ou  numeros'
      );
      valid = false;
    }

    return true;
  }

  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value);
    if (!cpf.valida()) {
      this.criaErro(campo, 'CPF inválido!');
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
