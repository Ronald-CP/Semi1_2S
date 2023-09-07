var Router = require('express')
const {
  detectarCara,
  detectarTexto,
  detectarFamoso,
  detectarEtiquetas,
  compararFotos,
  detectarEquipo,
} = require('../controller/rekognition.controller')

const router = Router()

router.post('/detectarCara', detectarCara)
router.post('/detectarTexto', detectarTexto)
router.post('/detectarFamoso', detectarFamoso)
router.post('/detectarEtiquetas', detectarEtiquetas)
router.post('/compararFotos', compararFotos)
router.post('/detectarEquipo', detectarEquipo)

module.exports = router
