BIPBOP JS
==========================================

[![Build Status](https://travis-ci.org/bipbop/jquery.bipbop.svg)](https://travis-ci.org/bipbop/jquery.bipbop)

[BIPBOP](https://www.bipbop.com.br/) é um Web Service onde você pode sincronizar informações de seu software com outros portais da internet. Oferecemos diversas ferramentas para consulta de CEP, CPF, CNPJ, influência social de uma pessoa na internet, geolocalização e poder aquisitivo.

Através do BIPBOP JS você pode fazer consultas via AJAX usando a API BIPBOP. É a forma mais simples de poder:

- Validar a existência e formatação de um CPF/CNPJ.
- Acessar qualquer API do BIPBOP.
- Melhorar a usabilidade do seu software, poupando o usuário de digitar o nome completo diversas vezes.

## TL;DR 

Cole o código abaixo no HTML da sua aplicação:

```HTML
<script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
<script src="//irql.bipbop.com.br/js/jquery.bipbop.min.js"></script>
```

## Configuração

Instale o [jQuery](https://jquery.com/) ou copie o código abaixo no HTML da sua aplicação.
```HTML
<script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
```

Instale o BIPBOP JS ou copie o código abaixo no HTML da sua aplicação.
```HTML
<script src="//irql.bipbop.com.br/js/jquery.bipbop.min.js"></script>
```

## Exemplos de uso

### Busca por CEP

No exemplo abaixo, efetuamos uma busca pelos dados do CEP `01002020`. O BIPBOP JS retorna as informações `logradouro`, `bairro`, `cidade`, `uf` e `cep`.

```HTML
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <title>Buscando informações a partir do CEP</title>
  <script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
  <script src="//irql.bipbop.com.br/js/jquery.bipbop.min.js"></script>
  <script>
    $(document).bipbop("SELECT FROM 'BIPBOPJS'.'CEP'", BIPBOP_FREE, {
      data: {
        "cep": "01002020"
      },
        
      success: function (ret) {
        $("#local #logradouro").text($(ret).find("body logradouro").text());
        $("#local #bairro").text($(ret).find("body bairro").text());
        $("#local #cidade").text($(ret).find("body cidade").text());
        $("#local #uf").text($(ret).find("body uf").text());
        $("#local #cep").text($(ret).find("body cep").text());
      }
    });
  </script>
</head>
<body>
  <div id="local">
    Logradouro: <span id="logradouro">N/A</span>
    Bairro: <span id="bairro">N/A</span>
    Cidade: <span id="cidade">N/A</span>
    UF: <span id="uf">N/A</span>
    CEP: <span id="cep">N/A</span>
  </div>
</body>
</html>
```

### Busca do nome por CPF/CPNJ

No exemplo abaixo, efetuamos uma busca pelos dados do CPNJ `06990590000123`. O BIPBOP JS retorna a razão social ou o nome completo.

```HTML
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <title>Buscando informações a partir do CPF/CNPJ</title>
  <script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
  <script src="//irql.bipbop.com.br/js/jquery.bipbop.min.js"></script>
  <script>
    $(document).bipbop("SELECT FROM 'BIPBOPJS'.'CPFCNPJ'", BIPBOP_FREE, {
      data: {
        "documento": "06990590000123"
      },
      
      success: function (ret) {
        $("#bio #nome").text($(ret).find("body nome").text());
      }
    });
  </script>
</head>
<body>
  <div id="bio">
    Nome: <span id="nome">N/A</span>
  </div>
</body>
</html>
```

### Desabilitando o loader BIPBOP

```HTML
<script type="text/javascript">
  $.bipbopDefaults.automaticLoader = false;
</script>
```

## Mais informações

 - [Documentação completa BIPBOP JS](https://api.bipbop.com.br/documentation/)