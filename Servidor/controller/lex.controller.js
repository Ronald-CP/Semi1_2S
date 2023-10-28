const AWS = require('aws-sdk')
const aws_keys = require('../helpers/aws_keys')

// Configurar las credenciales y la región de AWS
AWS.config.update(aws_keys.lex)

// Crear una instancia del cliente de Amazon Lex
const lexRuntime = new AWS.LexRuntimeV2(aws_keys.lex)

var init = async (req, res) => {
  const params = {
    botAliasId: 'TSTALIASID', // Se encuentra en Bot -> Implementar -> Alias
    botId: 'O82B28PLUG', // ID del boot.
    localeId: 'es_419',
    sessionId: req.body.session, // Sesión del bot para continuar flujo de conversación.
    text: req.body.input, // Texto que se envía al bot
  }
  try {
    lexRuntime.recognizeText(params, function (err, data) {
      // Método que reconoce el texto que mandamos y nos da respuesta.
      if (err) {
        console.log(err)
        res.json({ mensaje: 'Error al reconocer' })
      } else {
        res.json({ data: data.messages })
      }
    })
  } catch (err) {
    let mensaje = { message: 'ha ocurrido un error', success: false }
    console.error(err)
    res.status(500).json(mensaje)
  }
}

module.exports = {
  init,
}
